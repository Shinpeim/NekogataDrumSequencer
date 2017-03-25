# NekogataDrumSequencer

## これはなに？

しんぺい a.k.a. 猫型蓄音機が、MVVMとCleanArchitectureの解説のために作ったでもアプリケーションです。「状態をたくさんもつ」ものとして、ドラムシーケンサーを実装しました。デモを[GithubPages](https://shinpeim.github.io/NekogataDrumSequencer/build/)で公開しています。

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

![./image_for_readme/00.png](./image_for_readme/00.png)

このドキュメントでは、実際このリポジトリで開発されているアプリケーションの実装例を通じて、「それぞれのレイヤーがそれぞれをどのように呼び出したり依存したりするルールにするときれいにこれらの層が分離できるのか」について見ていきます。

## MVVMの文脈から見る、ViewModelとModelの関係

以下執筆中


## License

MIT
