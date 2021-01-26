import combinations from 'combinations';

import PieceGroupUnique from './PieceGroupUnique';
import TypeFactory from './TypeFactory';

export default class SolverFacade implements iSolverFacade {
	availablePieces: PiecesMap;
	uniquePieceGroups: PieceGroupUniqueMap;
	pieceIdGroups: PieceIdGroupsMap;

	constructor(availablePieces: PiecesMap) {
		this.availablePieces = availablePieces;
		this.pieceIdGroups = this.getPossiblePieceGroups();
		this.uniquePieceGroups = TypeFactory.newPieceGroupMap();
		this.pieceIdGroups.forEach((idGroup, id) =>
			this.uniquePieceGroups.set(id, new PieceGroupUnique(idGroup, availablePieces))
		);
	}
	getPossiblePieceGroups(): PieceIdGroupsMap {
		// extract piece ids into a simple array
		const pieceIDs: number[] = [...this.availablePieces].map((_, id) => id);

		// produce the possible combinations of the available ids, in groups of 3, in the correct type (PieceIdGroup)
		const combinationTuples: PieceIdGroupTuple[] = combinations(pieceIDs, 3, 3)
			.filter((pieceIDGroup: number[]) => pieceIDGroup.length === 3) // make sure id groups are 3 items long
			.map(pieceIDGroup => pieceIDGroup as PieceIdGroupTuple); // map id groups to tuple type

		// generate an id for each combination
		const combinationsWithIds: Array<[string, PieceIdGroupTuple]> = combinationTuples.map(pieceIDGroup => [
			pieceIDGroup.toString(),
			pieceIDGroup as PieceIdGroupTuple,
		]);

		// put the combinations in a map and use id as key
		const pieceIDGroups: PieceIdGroupsMap = TypeFactory.newPieceIdGroupsMap(combinationsWithIds); 

		// return piece groups, with piece ids
		return pieceIDGroups;
	}

	solve(): iPatternConfiguration[] {
		throw new Error('Method not implemented.');
	}
}
