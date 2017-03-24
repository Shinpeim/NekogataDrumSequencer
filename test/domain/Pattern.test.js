import assert from 'assert';
import Pattern from '../../src/js/domain/Pattern'

describe('Pattern', () => {
    let pattern;
    beforeEach(() => {
        pattern = new Pattern();
    });


    describe('constroctor()', () => {
        it('should have 4 tracks', () => {
            const tracks = ["BD", "SD", "HH", "RS"];
            assert.deepEqual(tracks, pattern.tracks);
        });

        it('should be selecting BD track', ()=>{
            assert.equal("BD", pattern.selectedTrack);
        });

        it('should have BD track with initial notes', ()=>{
            const initialBDNotes = [
                true, false, false, false,
                false, false, false, false,
                true, false, false, false,
                false, false, false, false
            ];

            assert.deepEqual(initialBDNotes, pattern.scores["BD"].notes)
        });

        it('should have SD track with initial notes', ()=>{
            const initialBDNotes = [
                false, false, false, false,
                true, false, false, false,
                false, false, false, false,
                true, false, false, false
            ];

            assert.deepEqual(initialBDNotes, pattern.scores["SD"].notes)
        });

        it('should have HH track with initial notes', () => {
             const initialBDNotes = [
                 true, false, true, false,
                 true, false, true, false,
                 true, false, true, false,
                 true, false, true, false
            ];

            assert.deepEqual(initialBDNotes, pattern.scores["HH"].notes)
        });

        it('should have RS track with initial notes', () => {
             const initialBDNotes = [
                 false, false, false, false,
                 false, false, false, false,
                 false, false, false, false,
                 false, false, false, false
            ];

            assert.deepEqual(initialBDNotes, pattern.scores["RS"].notes)
        });
    });

    describe('selectTrack()', () => {
        it('should be able to select track', () => {
            pattern.selectTrack("SD");

            assert.equal("SD", pattern.selectedTrack);
            assert.equal(pattern.scores["SD"], pattern.selectedScore)
        });
    });
});
