import type { iPieceGroupPermutation, iPatternConfiguration } from "../tsc/interfaces";
import type { PieceIdGroupTuple, PieceMap, Piece3Tuple, PieceGroupSidesTuple } from "../tsc/types";
import dec2bin from "../utils/dec2bin";
import PatternConfiguration from "./PatternConfiguration";

/** This class represents a permutation of an id group e.g. [1,2,3] and [3,2,1] would be different permutations */
export default class PieceGroupPermutation implements iPieceGroupPermutation {
  readonly pieceIdGroup: PieceIdGroupTuple;
  readonly availablePieces: PieceMap;
  readonly id: string;
  readonly layout: Piece3Tuple;
  readonly patterns: iPatternConfiguration[];

  constructor(pieceIdGroup: PieceIdGroupTuple, availablePieces: PieceMap) {
    this.pieceIdGroup = pieceIdGroup;
    this.availablePieces = availablePieces;
    this.id = pieceIdGroup.toString();
    this.layout = this.pieceIdGroup.map((pieceId) => availablePieces.get(pieceId)!) as Piece3Tuple;
    this.patterns = this.getPatterns();
  }

  /**
   * Returns possible patterns that can be made by flipping the pieces in the group
   * @returns {iPatternConfiguration[]} Array of possible patterns
   */
  private getPatterns(): iPatternConfiguration[] {
    const accumulated: iPatternConfiguration[] = [];

    // for the current permutation, loop through all the possible configurations from flipping (ie same as counting to 7 in binary)
    for (let flipConfig = 0; flipConfig < 8; flipConfig++) {
      // get binary value of current config
      const binaryFlipConfig: string = dec2bin(flipConfig);

      // convert config string to an array of numbers
      const sidesConfigTuple: PieceGroupSidesTuple = [...binaryFlipConfig].map((char) =>
        parseInt(char),
      ) as PieceGroupSidesTuple;

      // define pattern config
      // const patternFlipped: iPatternConfiguration = new PatternConfiguration(this, sidesTuple);

      for (let rotationConfig = 0; rotationConfig < 8; rotationConfig++) {
        // get binary value of current config
        const binaryRotationConfig: string = dec2bin(rotationConfig);

        const rotationConfigTuple: [number, number, number] = [...binaryRotationConfig].map(
          (char) => parseInt(char),
        ) as [number, number, number];

        // rotate pieces as required

        // define pattern config with pieces flipped and rotated
        const patternFlippedAndRotated: iPatternConfiguration = new PatternConfiguration(
          this,
          sidesConfigTuple,
          rotationConfigTuple,
        );

        // save pattern in a collection for the current piece group permutation
        accumulated.push(patternFlippedAndRotated);
      }
    }

    return accumulated;
  }
}
