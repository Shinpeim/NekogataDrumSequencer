import assert from 'assert';
import Sequencer from '../../src/js/domain/Sequencer'
import Player from '../../src/js/domain/Player'
import sinon from 'sinon'

describe('Player', () => {
    let player;
    let ticker;
    beforeEach(() => {
        ticker =  {
            start(){},
            stop(){},
        };
        const sequencer = new Sequencer();

        const sound = {
            setup(){return Promise.resolve();}
        };
        const sounds = {
            "BD": sound,
            "SD": sound,
            "HH": sound,
            "RS": sound
        };
        player = new Player(ticker, sequencer, sounds);
    });

    describe('constructor()', () => {
        it('should not be initialized', () => {
            assert(! player.isSoundsInited);
        });
        it('should be playing', () => {
            assert(! player.playingState);
        });
        it('should have a playingNoteIndex as null', () => {
            assert.equal(null,  player.playingNoteIndex);
        });
        it('should have a bpm as 120', () => {
            assert.equal(120,  player.bpm);
        });
    });

    describe('togglePlayingState', () => {
        describe('when sounds not initialized', () => {
            it('should not start playing', () => {
                player.togglePlayingState();
                assert.equal(false, player.playingState);
            });
        });

        describe('when started', ()=>{
            it('should become playing', () => {
                return player.initSounds().then(() => {
                    const mock = sinon.mock(ticker)
                    mock.expects("start").withArgs(player.bpm).once();
                    player.togglePlayingState();
                    assert.equal(true, player.playingState);
                    mock.verify()
                });
            });
        });

        describe('when stopped', ()=>{
            it('should become stopped', () => {
                return player.initSounds().then(() => {
                    const mock = sinon.mock(ticker);
                    mock.expects("start").withArgs(player.bpm).once();
                    mock.expects("stop").once();

                    player.togglePlayingState();
                    player.togglePlayingState();
                    assert.equal(false, player.playingState);
                    mock.verify()
                });
            });
        });
    });
});
