# NekogataDrumSequencer

## これはなに？

しんぺい a.k.a. 猫型蓄音機が、MVVMとCleanArchitectureの解説のために作ったデモアプリケーションです。「状態をたくさんもつ」ものとして、ドラムシーケンサーを実装しました。デモを[GithubPages](https://shinpeim.github.io/NekogataDrumSequencer/build/)で公開しています。

## MVVM と DDD-like Layered Architecture

MVVMパターンは、GUIのアーキテクチャパターンの一種で、PresentationとDomainの分離（PDS）を目的としたパターンです。MVVMパターンを採用することによって、プラットフォーム依存なUIの定義とイベントへの反応をViewとViewModelに書き、その他すべてをModelに書くことによって、「複雑だしプラットフォーム依存でテストしにくいUIのコード」と「アプリケーションの挙動をモデリングしたコード」を分離することができます。

その一方で、MVVMは「モデルはこう設計しましょう」ということについては指針をくれません。これは、言い方を変えれば、MVVMを採用したからといってアプリケーション全体の設計が決まるわけではなく、MVVMは「プレゼンテーションとその他をどうやって分けるか」について指針をくれるだけ、ということです。

一方、Layered Architectureは、その名のとおり、「アプリケーション全体を層に分けて設計しましょうね」という指針です。DDDの文脈では、よく「プレゼンテーション」「アプリケーション」「ドメイン」「インフラストラクチャ」の層に分けることによって「ドメイン知識」をドメイン層に分離する、という方針が取られることが多いようです。これをここでは「DDD-like Layered Architecture」と呼びましょう。

このあたりの話について、さらに知りたいひとは手前味噌ですが是非わたしの以下の発表を参考にしてください。

- see [「あの日見たM V WhateverのModelを僕たちはまだ知らない」実況中継](http://techblog.reraku.co.jp/entry/2016/12/13/080000)
- see [実況中継シリーズ Vue.jsで実現するMVVMパターン Fluxアーキテクチャとの距離](http://techblog.reraku.co.jp/entry/2016/07/06/070529)

さて、PDS、MVVM、DDD-like Layered Architectureというみっつの概念が出てきました。すべて、「アプリケーションをどのように分割するか」についての指針ですが、文脈が異なります。

PDSは「プレゼンテーションとその他を分けましょう」という指針です。

MVVMは、「実際にプレゼンテーションとその他を分けるときにはこういうふうにやるといいよ」という指針をくれます。

DDD-like Layered Architectureは、この「その他」の部分をさらに細かく「Application」「Domain」「Infrastructure」に分け、「アプリケーション全体はこうやって分けるといいよ」という指針をくれます。

これらの関係を図に表すと、下図のようになります。

図１：PDSとMVVMとDDD-like Layered Architectureの関係
![PDSとMVVMとDDD-like Layered Architectureの関係](./image_for_readme/00.png)

このドキュメントでは、実際このリポジトリで開発されているアプリケーションの実装例を通じて、「それぞれのレイヤーがそれぞれをどのように呼び出したり依存したりするルールにするときれいにこれらの層が分離できるのか」について見ていきます。

## MVVMの文脈から見る、ViewModelの責務

MVVMにおいて、（PDSの文脈における）PresentationとDomainとのやりとりを実現してくれるのはViewModelです。ViewModelは、みっつの責務を持つことでPresentationとDomainを仲介します。

- Viewの描画のために必要なデータの保持
- Viewからのイベントに応じて、Modelのvoidなメソッドを呼び出す
- モデルの変化イベントに応じて、モデルの値を読み出して自身のデータを更新する

では、ここで実際に、ViewとViewModelの実装を見に行ってみましょう。今回のアプリケーションならば、`/presentation/vue_components`にかかれているものがViewとViewModelになります。ここでは[コントロールパネルのコンポーネント](https://github.com/Shinpeim/NekogataDrumSequencer/blob/development/src/js/presentation/vue_components/ControlPanel.vue)を見てみましょう。このコンポーネントでは、デモアプリの「再生ボタンとかbpmスライダーがある部分」のViewとViewModelが定義されています。

図２：再生ボタンとかbpmスライダーがある部分
![再生ボタンとかbpmスライダーがある部分](./image_for_readme/01.png)

### Viewの描画のために必要なデータの保持という責務

まずは、Viewの描画のために必要なデータの保持という責務について見ていきましょう。scriptの中身に、`data`というメソッドと`computed`というプロパティがあります（Vue.jsが定義してくれてるやつですね）が、Vue.jsにおいてはこれらがまさに「Viewのためのデータの保持」の役割です。

```
        data(){
            return {
                bpm: this.usecase.player.bpm,
                selectedPatternId: this.usecase.sequencer.selectedPatternId,
                playingState: this.usecase.player.playingState,
                isSoundsInited: this.usecase.player.isSoundsInited
            }
        },

        computed:{
            playButtonIcon(){
                if (this.playingState) {
                    return 'stop';
                } else {
                    return 'play_arrow';
                }
            }
        }
```

まずは`data`を見てみましょう。たとえば、bpmスライダーの位置や、「現在のBPM」を描画するためには、現在設定されているbpmがいくつなのかという情報が必要になりますし、ラジオボタンのどれが選択されているかを描画するためには、今どのパターンが選択されているかという情報が必要になります。同じように、ボタンに再生マークを出すか停止マークを出すかを決めるためには、現在再生中なのか再生中でないのかという情報が必要になります。これらの情報を、`data`で返すオブジェクトのプロパティとして定義しています。

また、このアプリケーションはmaterializeというcssフレームワークを利用していますが、materializeでは再生マークを出すためには`play_arrow`という文字列が、停止マークを出すためには`stop`という文字列が必要になります。どちらの文字列をViewに渡すべきかというのは、`playingState`が決定すれば自動的に決定しますね、こういったデータについては、`computed`というプロパティに定義してあげるといいでしょう。

ここで定義されたプロパティは、`template`のなかでVue.jsが用意してくれたディレクティブなどから読み出すことができます。Vue.jsの詳しい使いかたについて説明し始めると長くなってしまうので（とはいえ学習コストの低いフレームワークではあります）、詳しくは[Vue.jsの公式のドキュメント](https://vuejs.org/)を当たってください。

### Viewからのイベントに応じて、Modelのvoidなメソッドを呼び出す責務

次に、Viewからのイベントに応じて、Modelのvoidなメソッドを呼び出す責務について見ていきます。`methods`というプロパティがその責務を実現しています。

```
        methods: {
            setBpm(){
                const bpm = document.getElementById("bpm-slider").value;
                this.usecase.setBpm(bpm);
            },

            setPatternId() {
                this.usecase.selectPattern(this.selectedPatternId);
            },

            togglePlayingState(){
                this.usecase.togglePlayingState();
            }
        }
```

bpmスライダーのViewは

```
<input type="range" id="bpm-slider" min="10" max="240" :value="bpm" @input="setBpm"/>
```

と定義されていますが、ユーザがスライダーを変化させると、HTML上に定義されている`@input="setBpm"`イベントが発火し、`methods`プロパティ内に定義されている`setBpm`メソッドが呼び出されます。ここが、「Viewからのイベントに応じ」の部分です。`setBpm`メソッドの中身を見てみると、DOMから「現在選択されているbpm」を読み出し、`this.usecase`のメソッドを呼び出しています。`this.usecase`について、詳しくは後述しますが、ViewModelが保持している、「Model層の窓口」だと思ってください。ここが「Modelのvoidなメソッドを呼び出す」の部分です。

### モデルの変化イベントに応じて、モデルの値を読み出して自身のデータを更新する責務について

最後に、モデルの変化イベントに応じて、モデルの値を読み出して自身のデータを更新するという責務について見ていきましょう。

さきほど、「Viewからのイベントに応じて、Modelのvoidなメソッドを呼び出す」責務について見ました。しかし、当たりまえですが、voidなメソッドには返り値がありません。これでは、「ViewModel -> Model」のコミュニケーションはできますが、「Model -> ViewModel」のコミュニケーションができませんね。

MVVMアーキテクチャでは、ModelからViewModelへのコミュニケーションは「Modelが変化したよ」というイベントを通知する形で行います。ViewModelは、そのイベントを受け取ったら、Modelの内容を読み取って、自身のデータに書き戻します。それを行っているのが`created`プロパティです。

```
       created(){
            this.subscriptions.push(
                // (1)
                this.usecase.selectedPatternChanged.subscribe(() => {
                    this.selectedPatternId = this.usecase.sequencer.selectedPatternId;
                })
            );

            this.subscriptions.push(
                this.usecase.playingStateChanged.subscribe(() => {
                    this.playingState = this.usecase.player.playingState;
                })
            );

            this.subscriptions.push(
                this.usecase.bpmChanged.subscribe(() => {
                    this.bpm= this.usecase.player.bpm;
                })
            );

            this.subscriptions.push(
                this.usecase.isSoundsInitedChanged.subscribe(() => {
                    console.debug(this.usecase.player);
                    this.isSoundsInited = this.usecase.player.isSoundsInited;
                })
            );
        },
```

まずは

```
this.usecase.selectedPatternChanged.subscribe(() => {
    this.selectedPatternId = this.usecase.sequencer.selectedPatternId;
})
```

の部分を見てください。「Modelの窓口」に当たる`usecase`が、`selectedPatternChanged`というプロパティを持っています。Modelが保持している「今どのパターンが選択されているか」という情報が変化したときに、このプロパティはイベントを発火させます（というか、Model層にそういう処理が書かれています）。

で、このプロパティに対して、`subscribe`することで、リスナーを登録しています。リスナーの中身は、`this.selectedPatternId = this.usecase.sequencer.selectedPatternId;`となっており、「モデルの値を読み出してきて、自身のデータ（`data`プロパティで定義したやつです）に書き戻していますね。ViewModelのデータがこうして更新されると、Vue.jsの「データバインド」の仕組みで、画面が書き換わる、というわけです。

`this.subscriptions`とかは、`Base.js`で定義されてるやつで、ここに登録しておいたリスナーはコンポーネントが破棄されるときに勝手に`unscribe`してくれるようになっています。

`created`はコンポーネントが作られたときに呼ばれるhookですが、コンポーネントが作られたときに「Modelが変化したっていうイベントを受け取ったらその内容を自分に書き戻す」というリスナーを登録しているわけですね。

### ViewModelの責務まとめ

さて、これで、

- Viewの描画のために必要なデータの保持
- Viewからのイベントに応じて、Modelのvoidなメソッドを呼び出す
- モデルの変化イベントに応じて、モデルの値を読み出して自身のデータを更新する

というViewModelのみっつの責務を確認できました。

重要ななのは、Modelのメソッド呼び出しがvoidであることと、Modelからの変更通知はイベントを通じて行う、という部分です。

これによって、モデルのメソッド呼び出しという「更新系」の窓口、モデルの状態読み出しという「参照系」の窓口が分離されます。この分離を行うことで、PDSの文脈における「Presentation」と「Domain」を疎結合に保つことに成功しているのが、MVVMアーキテクチャである、と考えてください。

## DDD-like Layered Architectureで複雑なモデルと非同期処理に立ち向かう

さて、MVVMパターンを利用することによって、(PDSという文脈における)プレゼンテーション層とドメイン層の分離に成功しました。ここからは、PDSの文脈におけるドメイン層をさらに詳しく見ていきます。PDSの文脈における「ドメイン層」は、MVVMの文脈においてはモデル層に相当しますが、DDD-like Architectureにも「ドメイン層」という言葉が出てきて混乱のもとなので、ここから先は(PDS)における「ドメイン層」のことを「モデル層」と呼称します。

さて、DDD-like Layered Architectureでは、モデル層を「Application」「Domain」「Infrastructure」の層に分離します。そして、勘所は、ドメイン層にあります。

### ドメイン層

ドメインレイヤーは、問題領域の「ユビキタス言語」を表現するようにモデリングします。ユビキタス言語については今回深入りしませんが、関わるひとたちみんなが同じように持つように調整されたマインドモデルに名前をつけたものだと思ってください。

今回のアプリケーション（触ってないひとは触ってみてください）の概念を整理してみましょう。

- まず、「シーケンサー」と「プレイヤー」が存在します。
- シーケンサーは、ユーザが入力したドラムパターンを保持する役割を持ちます。
  - シーケンサーは、4つの「パターン」を持つことができます。
  - ユーザーは、シーケンサーから1つの「パターン」を選択します。
  - それぞれのパターンは、BD（バスドラム）、SD（スネアドラム）、HH（ハイハット）、RS（ライドシンバル）という4つの「トラック」を持ちます。
  - ユーザーは、シーケンサーから1つの「トラック」を選択します。
  - 各トラックは、「スコア」（日本語で言うと楽譜です）を持ちます。
  - スコアは、16個の「ノート」からなります。これが16分音符/16分休符に相当します。
  - ノートはオンとオフの状態を持ちます。オンのノートは音符、オフのノートは休符に相当します。
  - ユーザーは、選択されたパターンの選択されたトラックのノートに対して、オンとオフとトグルすることができます。
  - パターンの初期状態は、「1拍目3拍目の頭にBD」「2拍目4拍目の頭にSD」「8分音符刻みでHH」とします
- プレイヤーは、シーケンサーに保存されたドラムパターンを演奏する役割を持ちます。
  - プレイヤーは、再生中であるか停止中であるかという状態を持ちます
  - ユーザーは、プレイヤーの再生状態をトグルすることができます
  - プレイヤーは、BPMを持ちます。
  - ユーザーは、プレイヤーのBPMを変更することができます。
  - プレイヤーは、現在再生中の位置という情報を持ちます
  - プレイヤーが再生中のとき、BPMに応じたタイミングで、現在再生中の位置が次の位置に移動します。同時に、シーケンサーのその位置に保存された
  - プレイヤーは、トラックに応じた「BD」「SD」「HH」「RS」の音を出力できます。

このくらいでしょうか。

今回はひとりで作ったアプリケーションなので、とくにだれかとこの概念をすり合わせる必要がありませんが、DDDでは、本来はこの概念を関係者全員ですりあわせて、全員が「同じことば」で喋ることを目標とします（とはいえ、これはなかなかできることではない……）。

さて、こうして概念が整理されたら、これらを「そのまま」domain層にモデリングしていきます。今回のアプリケーションならば、domain層は`src/js/domain/`以下に書かれています。例としてまずはシーケンサーのコードをみてみましょう。

```javascript
class {
    get selectedPattern(){
        return this.patterns[this.selectedPatternId];
    }

    constructor(){
        this.patternIds = ["1", "2", "3", "4"];

        this.patterns = {};
        for (const id of this.patternIds) {
            this.patterns[id] = new Pattern();
        }

        this.selectedPatternId = this.patternIds[0];
    }

    selectPattern(id) {
        this.selectedPatternId = id;
        console.debug("pattern selected: " + this.selectedPatternId);
    }
```

- 4つのパターンを持ち、それを選択することができる

という概念が、そのまま愚直にコードに落とし込まれていて、わかりやすいですね（自画自賛）。

では、今度はパターンのコードとスコアのコードも見ます。

```javascript
// Pattern
class {
    get selectedScore(){
        return this.scores[this.selectedTrack];
    }

    constructor(){
        this.tracks = ["BD", "SD", "HH","RS"];
        const initialNotes = {
            "BD": [
                true, false, false, false, false, false, false, false,
                true, false, false, false, false, false, false, false
            ],
            "SD": [
                false, false, false, false, true, false, false, false,
                false, false, false, false, true, false, false, false
            ],
            "HH": [
                true, false, true, false, true, false, true, false,
                true, false, true, false, true, false, true, false
            ],

            "RS": [
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false
            ],
        };

        this.scores = {};
        for (const track of this.tracks) {
            this.scores[track] = new Score(initialNotes[track]);
        }

        this.selectedTrack = this.tracks[0];
    }

    selectTrack(track){
        this.selectedTrack = track;
        console.debug("track selected: " + track);
    }
}

// Score
class {
    constructor(initialNotes){
        this.notes = initialNotes;
    }

    toggleNote(index) {
        this.notes[index] = ! this.notes[index];
    }
}
```

これも、パターンの初期状態が愚直にかかれているし、4つのトラックをもつこと、それぞれのトラックがスコアを持つこと、スコアは16のノートを持つこと、ノートはトグル可能なことが愚直にコードに落とし込まれています（このあたりは、もっとまじめにやれば、Noteを値オブジェクトとしてモデリングするなど、さらにきれいにモデリング可能だと思いますが、今回はとりあえずこれで。今のところこれで十分にわかりやすいでしょう。さらに仕様が複雑化してきたらもっとまじめにやりましょう）。

このように、整理した概念「ユビキタス言語」を愚直にコードにモデリングしたものを「ドメインモデル」と呼びます。ドメイン層をこうして「みんなが使ってる言葉の通りに」モデリングすることで、ステークスホルダ全員が実際に書かれたコードをもとに議論したりできるし、チームメンバーもコードの理解をしやすくなります（というのが、DDDの目指す理想です。しかし、理想は理想です。現実は甘くない。けど、これは目指すに値する理想だと言えるでしょう）。

次に、「プレイヤー」の部分のdomainをまずは見てみましょう。プレイヤーは少し複雑なので、少しずつみていきます。まずはコンストラクタから見ていきましょう。

```javascript
    constructor(ticker, sequencer, sounds){
        this._sequencer = sequencer;
        this._sounds = sounds;
        this._ticker = ticker;

        this.isSoundsInited = false;
        this.playingState = false;
        this.playingNoteIndex = null;
        this.bpm = 120;
    }
```

プレイヤーがシーケンサーを保持するのはいいでしょう。シーケンサー内に保存されたパターンを知るためには、シーケンサーを保持する必要があるのは納得がいきますね。

soundsというのは、鳴らす音を表したオブジェクトです。BDだったら「ドッ！」って音だし、SDだったら「タン！」という音ですね。

また、tickerというのは、BPMに応じてイベントを発行してくれるタイマーです。tickerにbpmをセットして`start`すると、BPMが早ければそれに応じて早いタイミングでイベントを定期的に発行してくれます。tickerにセットしたBPMを遅くすれば、それに応じて遅いタイミングでイベントを定期的に発行してくれます。

`isSoundInited`については後ほど見ることにするので、今は捨て置いてください。`playingState`や`playingNoteIndex`や`bpm`は、ドメインモデルをモデリングしてきたときに出てきた概念なので、これはまあいいでしょう。続いて公開メソッド郡を見ていきます。

```javascript
    initSounds() {
        //snip
    }

    togglePlayingState(){
        if ( ! this.isSoundsInited ) {
            return;
        }
        if (this.playingState) {
            this._stop();
        } else {
            this._play();
        }
    }

    setBpm(bpm){
        this.bpm = bpm;
        this._ticker.bpm = bpm;
    }
```

`initSound`などの、SoundInitedまわりについては後述するので、今は無視しておいてください。

`togglePlayingState`と`setBpm`は、まさにユビキタス言語を整えるときに整理した概念をそのままモデリングしたものになっていますね。特筆すべきは`this._ticker.bpm = bpm`のところでしょうか。BPMが設定されたときには、タイマーのBPMも設定してやる必要があるのでここで設定しています。

では、`togglePlayingState`の中で使われている`_play()`と`_stop()`について見ていきましょう。

```javascript
    _play(){
        this.playingState = true;
        this._ticker.start(this.bpm, () => this._playNextSound());
    }

    _stop(){
        this.playingState = false;
        this._ticker.stop();
    }
```

まず、`playingState`を変化させているところはいいでしょう。

`play`したときには、タイマーを起動しないといけないですね。現在とbpmと、タイマーがイベント発行したときに叩かれるリスナーを登録します。

`stop`したときには、タイマーもストップしています。このタイマーは、stopしたあとに必ず一度だけイベントを発行させてから停止するようになっています。

さて、では、リスナーの中身を見てみましょう。

```
    _playNextSound(){
        if (this.playingState == false) {
            this.playingNoteIndex = null;
            return;
        }
        if (this.playingNoteIndex == null || this.playingNoteIndex == 15) {
            this.playingNoteIndex = 0;
        } else {
            this.playingNoteIndex += 1;
        }

        this._playSound()
    }

    _playSound(){
        const i = this.playingNoteIndex;
        for (const track of this._sequencer.selectedPattern.tracks) {
            if (this._sequencer.selectedPattern.scores[track].notes[i]) {
                this._sounds[track].play();
            }
        }

    }
```

まず、もし、すでにプレイヤーが停止済みだった場合は、「再生位置」を初期状態に戻しています。

さらに、再生位置が初期状態か、最後まで行っている場合は、再生位置を0にもどしていますし、そうでない場合は再生位置を1進めたあと、`_playSound`を叩いています。

`_playSound`では、シーケンサーの「選択されたパターン」の各トラックについて、もし再生位置にあるノートがオンであればそのトラックに当たるサウンドを再生しています。

### インフラストラクチャ層

ところで、この「サウンド」というのは、ちょっと厄介そうだと思いませんか？まず、ブラウザ上で音をだすためには、「WebAudio API」というブラウザ固有の技術を利用しなければなりません。こういう「ブラウザ固有の技術」というのは、「ユビキタス言語」に含まれるでしょうか？ユビキタス言語は、ステークスホルダ全員で作り上げるものです。ということは、ユビキタス言語に触るのはプログラマだけではありません。あくまで、ユビキタス言語上では「サウンドを再生する」というような表現になり、「WebAudioを利用して」というのはむしろ「プログラマ向けのローカルな言語」だと言っていいでしょう。

そういう「技術的な詳細」については、「インフラストラクチャ層」に書いていきましょう。

```
let context = null;

export default class {
    constructor(fileURL){
        this._fileURL = fileURL;
        this._buffer = null;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (context == null) {
                context = new AudioContext();
            }
            console.debug("audio context created");
        } catch (e) {
            throw new Error("can't create AudioContext");
        }

    }

    setup(){
        const request = new XMLHttpRequest();
        request.open('GET', this._fileURL , true);
        request.responseType = 'arraybuffer';

        return new Promise((resolve, reject) => {
            request.onload = () => {
                context.decodeAudioData(request.response, (buffer) => {
                    this._buffer = buffer;
                    resolve();
                }, (e) => {
                    reject(e);
                });
            };
            request.send();
        });
    }

    play(){
        console.debug("playing sound");
        const source = context.createBufferSource();
        source.buffer = this._buffer;
        source.connect(context.destination);
        source.start(0);
    }
}
```

ドメイン層のコードは、概念が愚直に書き下されていたため、非プログラマでもなんとなく読めるような雰囲気だったと思います。それに比べると、インフラストラクチャ層は、その技術についてきちんと理解してないとよくわからないようなコードになっていますね。こういった、技術的な詳細はドメイン層に持ち込まず、インフラストラクチャ層に押し込めることで、ドメイン層をピュアに、理解しやすくすることが、アプリケーションの本質的な部分をきれいに書くコツである、という知見がここにはあると言っていいでしょう。

さて、実は、今回のアプリケーションではBPMに応じてイベントを発行してくれる君であるところのtickerについてもBpmTickerという名前でインフラストラクチャ層で実装しています。というのも、タイマーイベントを発行するためには、プラットフォーム固有のAPIであるsetTimeoutやsetIntervalなどが必要になるでしょう。それはドメインの知識ではなく、インフラストラクチャの知識であるはずです。そのため、BpmTickerはインフラストラクチャに隠蔽し、ドメイン層からはそれを利用するだけにしてあります。

ここで、ドメイン層で放置していた`initeSound`系のメソッドやプロパティについて、再度見てみましょう。

```javascript
//Player.js
    constructor(ticker, sequencer, sounds){
        // snip
        this.isSoundsInited = false;
        // snip
    }

    initSounds() {
        const promises = [];
        for (const key in this._sounds) {
            promises.push(this._sounds[key].setup());
        }
        return Promise.all(promises).then(()=>{
            this.isSoundsInited = true;
        });
    }
    
    togglePlayingState(){
        if ( ! this.isSoundsInited ) {
            return;
        }
        // snip
    }

```

Soundというインフラストラクチャ層の技術的要請で、wavファイルを非同期で読み込む必要が出てきています。wavファイルを読み込みする前にもしもプレイヤーを再生してしまったら、読み込まれていない音は出ないか、あるいはアプリケーションがクラッシュしてしまうでしょう。そのため、プレイヤーは「もう音が準備できたよ」「音がまだ準備できてないよ」という状態を持つ必要が出てきてしまいました。このように、技術的制約から、アプリケーションの仕様が影響を受けることがあります。今回ならば、それが原因でユビキタス言語の中に

- 技術的制約から、プレイヤーは「音が準備できた」「できていない」の状態を持つ
- まだ音が準備できていないときは再生状態を変更できない

という新しい制約が生まれたと考えられるでしょう。なので、そのような技術的な制約がdomain層やユビキタス言語に漏れ出してしまいます。これは、ある程度はしょうがないことである、と考えるべきでしょう。そう考えた上で、なるべく技術的詳細はインフラストラクチャに隠蔽し、ほんとうに技術的にどうしようもなくて仕様に影響を与えるときには、「技術的な制約でこのような仕様になっている」というユビキタス言語を「仕方なしに」加える、ということは、あってもよいのではないか、というのがわたしの意見です。

### アプリケーション層

執筆中。ここがファサードになり、非同期やイベント発行のターミナルにもなる。


## DDD-like Layered Architectureに依存性逆転の法則を導入することで、テスタビリティの高い Clean Architecture が実現される

### Clean Architectureとはなにであってなにでないのか

執筆中

- Layered Architecture や その派生であるHexagonal Architectureなど、様々な似通ったアーキテクチャパターンの「これらって要するにこういうことだよね」ってのをまとめた「依存の方向性」についてのコンセプトである
- 具体的に「どういう層に分割すべき」を決めたアーキテクチャパターンではない
  - もとの記事でも、「べつに円は4つじゃなくていいしこのとおりじゃなくていい」って言ってる


### アプリケーション層とドメイン層

執筆中


### ドメイン層とインフラストラクチャ層

さて、インフラストラクチャ層とドメイン層を「どのように分けるか」については見てきました。せっかくレイヤーを分けたのですから、ここは是非レイヤー間を疎結合にしたいですね。MVVMの章でも、プレゼンテーションとドメインを分ける際に、お互いの呼び出し方のルールを決めることで、疎結合を実現していました。インフラストラクチャ層とドメイン層は、どのようなルールでコミュニケーションを取るべきでしょうか。

先に結論を言ってしまうと、

- ドメイン層はインフラストラクチャ層のメソッドをコールしてよい
- インフラストラクチャ層はドメイン層のメソッドをコールしてはいけない
- ドメイン層はインフラストラクチャ層に依存してはいけない
- インフラストラクチャ層はドメイン層に依存してよい

というルールになります。

よく読むと、「ん！？」って感じがしますよね。ドメイン層はインフラストラクチャ層に依存してはいけないのに、どうやってインフラストラクチャ層のメソッドをコールできるのでしょうか。

ここで重要になる概念が、「依存性逆転の法則(DIP)」というやつです。

ドメイン層は、処理を実現するためには、インフラストラクチャ層を利用する必要があります。しかし、愚直にインフラストラクチャ層を利用してしまうと、ドメインがインフラストラクチャに依存することになります。そこで、ドメイン層がインフラストラクチャ層を利用するときには、かならずDIを経由して利用することで、ここの依存を断ち切ります。そうすることで、ドメイン層とインフラストラクチャ層を疎結合に保つことができます。


DIがわからない、という人は、ちょっと話をすると長くなるので、これまた手前味噌で恐縮ですが、以下の記事などで「メソッドコールしてる対象への依存を引っぺがして、"依存してない"実装のメソッドをコールすることができる」ってことを理解してください。

[要するに DI って何なのという話](http://nekogata.hatenablog.com/entry/2014/02/13/073043)

また、このとき、「実装から考える」のではなく、「ドメイン層はどういうインターフェイスでインフラストラクチャ層を使いたいのか」から考えるべきです。そうすることで、ちょっとむずかしい言い方になりますが「抽象を定義しているはドメイン層」「インフラストラクチャ層が、その抽象に依存して、その実装を行う」という形になり、本当の意味でドメイン層がインフラストラクチャ層に依存せずに済むようになります。

さて、今回のアプリケーションでは、JavaScriptにはInterfaceという概念がないため、とくにInterfaceは定義せず、コンストラクタにオブジェクトを直接ぶっこんでDIを実現しています。

```
// presentation/vue_components/Application.vue

const usecase = new SequencerUsecase(ticker, sounds);

// usecase/SequencerUsecase.js
class {
    constructor(ticker, sounds){
        this.sequencer = new Sequencer();
        this.player = new Player(ticker, this.sequencer, sounds);
    }
    
    //snip
}
```

デファクトなDIコンテナがあるような言語だったらDIコンテナを使うなどの方法が考えられますね。

さて、こうして、ドメイン層とインフラストラクチャ層を分離すると、なにが嬉しいでしょうか。まず、せっかく技術的詳細から別の層にまとめたドメイン層のテストがとてもしやすくなります。アプリケーションのコアであるドメイン層は、プレゼンテーションにも、ユースケースにも、インフラストラクチャにもどこにも依存しません。そのため、ドメイン層はドメイン層のみでテストをすることができます。

また、アプリケーションのコアになる部分が、技術的な詳細やフレームワークに振り回されることなく、「ピュアなモデリング」を保つことができます。このため、見通しの良いコードとなります。

さて、DDD-like Layered Architectureは、「どのように層を分けるべきか」について語りましたが、DIPとMVVMを駆使することによって、各層の依存関係を整理は以下のように整理することができました。

1. MVVMによって整理された依存関係
  - プレゼンテーション層が[アプリケーション,ドメイン,インフラストラクチャ]層に依存する
  - [アプリケーション,ドメイン,インフラストラクチャ]層はプレゼンテーション層に依存しない
1. 自然に生まれる依存関係
  - アプリケーション層がドメイン層に依存する
  - ドメイン層はアプリケーション層に依存しない
1. DIPによって整理された依存関係
  - インフラストラクチャ層がドメイン層に依存する
  - ドメイン層はインフラストラクチャ層に依存しない

図にすると、下図のようになります。

![](./image_for_readme/02.png)

「外側」のコンポーネントは「内側」に依存していますが、「内側」のコンポーネントは一切「外側」に依存していない状態になっています。Clean Architectureのコンセプトに一致しています。

### まとめ

MVVMや、Layered Architecture、そしてCleanArchitectureについて、互いが排他的なものではなく、それらは相補的な関係にあることを見てきました。

まとめると、

- PDSは、プレゼンテーション層とその他を分けよう、という考え方である
- MVVMは、どうやってプレゼンテーション層とその他を分けるかの具体的な指針である
- Layered Architecuterは、「その他」の部分もたくさんの層に分けよう、という考え方である
  - DDDの文脈では、よく「プレゼンテーション」「アプリケーション」「ドメイン」「インフラストラクチャ」という分け方をする。これをこの記事ではDDD-like Layered Architectureと便宜的に呼んだ
- Layered Architecuterを採用した際、MVWなアーキテクチャ・パターンやDIPなどを利用して、「外側」のレイヤーが「内側」のレイヤーに依存する（逆は駄目）とするのが、CleanArchitectureのコンセプト。
  - CleanArchitectureは特定のレイヤーの分け方やレイヤー間の通信方法を定義していない

本記事は以上です。少しでもアーキテクチャ・パターンに対して整理された視座を提供できたとしたら、存外の喜びです。

[カンパ募集中です](http://amzn.asia/2wC88sD)


## License

MIT

## Copyright

Copyright 2017 Shinpei Maruyama