import assert from 'assert';
import Sequencer from '../../src/js/domain/Sequencer'
import Pattern from '../../src/js/domain/Pattern'

describe('Sequencer', () => {
    let sequencer;
    beforeEach(() => {
        sequencer = new Sequencer();
    });

    describe('constructor()', () => {
        it('should have 4 patterns', () => {
            assert.deepEqual(["1", "2", "3", "4"], sequencer.patternIds);
            assert(sequencer.patterns["1"] instanceof Pattern);
            assert(sequencer.patterns["2"] instanceof Pattern);
            assert(sequencer.patterns["3"] instanceof Pattern);
            assert(sequencer.patterns["4"] instanceof Pattern);
        });
    });

    describe('selectPattern', () => {
        it('should be able to select pattern', () => {
            sequencer.selectPattern("2");
            assert.equal(sequencer.patterns["2"], sequencer.selectedPattern);
        });
    });
});
