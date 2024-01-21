import perm from "array-permutation";

import PieceGroupPermutation from "./PieceGroupPermutation";
import type {
  iPieceGroupUnique,
  iPieceGroupPermutation,
  iPatternConfiguration,
} from "../tsc/interfaces";
import type { PieceIdGroupTuple, PieceMap, Piece3Tuple } from "../tsc/types";

export default class PieceGroupUnique implements iPieceGroupUnique {
  id: string;

  pieceIdGroup: PieceIdGroupTuple;

  availablePieces: PieceMap;

  layout: Piece3Tuple;

  permutations: iPieceGroupPermutation[];

  oppositePieceIdGroup: PieceIdGroupTuple;

  patterns: iPatternConfiguration[];

  constructor(pieceIdGroup: PieceIdGroupTuple, availablePieces: PieceMap) {
    this.pieceIdGroup = pieceIdGroup;
    this.availablePieces = availablePieces;
    this.id = pieceIdGroup.toString();
    this.layout = this.getLayout();
    this.permutations = this.getPermutations();
    this.oppositePieceIdGroup = this.getOppositePieceIdGroup();
    this.patterns = this.getPatterns();
  }

  getLayout(): Piece3Tuple {
    return this.pieceIdGroup.map((pieceId) => this.availablePieces.get(pieceId)!) as Piece3Tuple;
  }

  getOppositePieceIdGroup(): PieceIdGroupTuple {
    // get available ids
    const ids: number[] = Array.from(this.availablePieces.keys());

    // put available ids in a set
    const idSet: Set<number> = new Set<number>(ids);

    // remove ids used by this group from the set
    this.pieceIdGroup.forEach((id) => idSet.delete(id));

    // return remaining ids in set
    return Array.from(idSet.values()) as PieceIdGroupTuple;
  }

  private getPermutations(): iPieceGroupPermutation[] {
    const pieceGroupPermutations: iPieceGroupPermutation[] = [];

    // get id group permeations
    let pieceIdGroupPermutation: PieceIdGroupTuple;
    for (pieceIdGroupPermutation of perm(this.pieceIdGroup) as PieceIdGroupTuple[]) {
      // create a pieceGroupPermutation object from each id permutation array
      pieceGroupPermutations.push(
        new PieceGroupPermutation(pieceIdGroupPermutation, this.availablePieces),
      );
    }

    // console.log(__filename, { pieceIdGroup: this.pieceIdGroup, pieceGroupPermutations });

    return pieceGroupPermutations;
  }

  getPatterns(): iPatternConfiguration[] {
    // get the patterns for each permutation of this group and add return them as one array
    const patternMap = this.permutations.reduce((acc, pieceGroup) => {
      // acc.push(...pieceGroup.patterns);

      // do not add duplicates
      pieceGroup.patterns.forEach((pattern) => {
        if (!acc.has(pattern.id)) {
          acc.set(pattern.id, pattern);
        } else {
          // console.warn( __filename, "Pattern ID has already been saved", {id:pattern.id, acc})
        }
      });

      return acc;
    }, new Map<string, iPatternConfiguration>());

    return Array.from(patternMap.values());
  }
}
