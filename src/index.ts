import { pieces } from './constants/constants';
import getPossiblePieceGroups from './utils/getPossiblePieceGroups';

// for the pieces available, find all possible ways to split the 6 pieces into 2 groups of 3 pieces
// make sure groups are not repeated ie a group with pieces 1,2,3 is the same as a group with pieces 3,2,1
// Put these in a map and use the ids of the pieces to generate unique keys
const pieceGroups: PieceGroups = getPossiblePieceGroups(pieces);

// For each group of 3 pieces, get all the permutations for the 3 available positions, and save these to the group object
const pieceGroupPermutations: PieceGroupPermutations = getPieceGroupPermutations(pieceGroups);

// For each permutation of the 3 positions, create all the possible patterns/surfaces by flipping the pieces, or all combinations of flipping the pieces, save these to the permutations object. Possible permutations for flips can be found by counting from 0 to 7 in 3 bit binary where 0 is side 0 and 1 is side 1 ie flipped, https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
const pieceGroupPatterns = getPieceGroupPatterns(pieceGroupPermutations);

const getPieceGroupPatterns = pieceGroups => {
	// For each pattern object, assign the ids of the pieces it uses, so the patterns can be tracked when a solution is found. Ie for each combination, flatten all the resulting possible patterns and include information on the configuration to build the pattern.

	// get remainder piece groups
	const pieceGroupsWithRemainderGroups = getPieceGroupRemainders(pieceGroups);
};

// For each unique group of 3 pieces , get its remainder group then loop through all the possible patterns to see if there's a mirrored map, ie can 2 patterns be merged together such that none of the slots are greater than 0 ie mirror remainder pattern matrix and add it to primary pattern matrix and sheet if any elements are greater that 0 (if greater than 0 this means there is a nub which doesn't have a corresponding hole so the patterns don't fit
const compatiblePatterns = getCompatiblePatterns(pieceGroupPatterns);
