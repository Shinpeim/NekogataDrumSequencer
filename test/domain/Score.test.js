import assert from 'assert';
import Score from '../../src/js/domain/Score'

describe('Score', () => {
    let score;
    beforeEach(() => {
        const notes = [
            true, false, true, false, true, false, true, false,
            true, false, true, false, true, false, true, false
        ];

        score = new Score(notes);
    });

    describe('constroctor()', () => {
        it('should have notes passed to constructor', () => {
            const expected = [
                true, false, true, false, true, false, true, false,
                true, false, true, false, true, false, true, false
            ];

            assert.deepEqual(expected, score.notes);
        });
    });

    describe('#toggleNote()', () => {
        it('should toggle note of index', () => {
            score.toggleNote(0);
            assert.equal(false, score.notes[0]);

            score.toggleNote(1);
            assert.equal(true, score.notes[1]);
        });
    });
});
