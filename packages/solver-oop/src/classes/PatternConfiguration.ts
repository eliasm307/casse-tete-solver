import type { Number3Tuple } from "@casse-tete-solver/common/src/types";
import type { iPatternConfiguration, iPieceGroupPermutation } from "../tsc/interfaces";
import type { PatternMatrixTuple, PieceGroupSidesTuple } from "../tsc/types";
import { getPatternMatrix } from "../utils/pieceGroupUtils";
import TypeFactory from "./TypeFactory";

export default class PatternConfiguration implements iPatternConfiguration {
  id: string;

  matrix: PatternMatrixTuple;

  matrixMirrored: PatternMatrixTuple;

  pieceGroupId: string;

  pieceSides: PieceGroupSidesTuple;

  pieceRotations: PieceGroupSidesTuple;
  // private pieceGroup: iPieceGroup;

  constructor(
    pieceGroup: iPieceGroupPermutation,
    pieceSides: Number3Tuple,
    pieceRotations: Number3Tuple,
  ) {
    this.pieceSides = pieceSides;
    this.pieceRotations = pieceRotations;
    this.pieceGroupId = pieceGroup.id;
    // this.pieceGroup = pieceGroup;
    this.matrix = getPatternMatrix(pieceGroup.layout, this.pieceSides, this.pieceRotations);

    this.matrixMirrored = this.getMatrixMirrored();
    this.id = `[pieceGroupId:"${
      this.pieceGroupId
    }"//pieceSides:"${this.pieceSides.toString()}"//pieceRotations:"${this.pieceRotations.toString()}"]`;
  }

  private getMatrixMirrored(): PatternMatrixTuple {
    return this.matrix.reduce((accumulator: PatternMatrixTuple, sidePattern, i) => {
      accumulator[this.matrix.length - i - 1] = sidePattern;
      return accumulator;
    }, TypeFactory.newPatternMatrixTuple());
  }
}
