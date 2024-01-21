import type { Number3Tuple, SidePatternTuple, iPiece } from "@casse-tete-solver/common/src/types";
import type {
  iPatternConfiguration,
  iPieceGroupUnique,
  iPatternEvaluator,
  iPieceGroup,
  iPieceGroupPermutation,
  iSolution,
  iPieceGroupPatternEvaluation,
} from "./interfaces";

/* eslint-disable @typescript-eslint/no-unused-vars */
export type Piece3Tuple = [iPiece, iPiece, iPiece];

/** Tuple representing 3x3 pattern produced by putting 3 pieces together */
export type PatternMatrixTuple = [SidePatternTuple, SidePatternTuple, SidePatternTuple];

export type PieceGroupSidesTuple = Number3Tuple;

/** Tuple of 3 numbers representing 3 ids of pieces in a group */
export type PieceIdGroupTuple = Number3Tuple;

export type PatternConfiguration2Tuple = [iPatternConfiguration, iPatternConfiguration];

/**
 * Map of pieces
 * @key id of piece
 * @value Piece object
 */
export type PieceMap = Map<number, iPiece>;

/**
 * Map of all possible groups of 3 piece id groups possible
 * @key value as a string
 * @value PieceIdGroup tuple of ids in a group of 3, sorted in ascending order
 */
export type PieceIdGroupMap = Map<string, PieceIdGroupTuple>;

/**
 * Map with piece group strings as keys and an array of permutations
 * @key base PieceIdGroup (sorted in ascending order) as a string
 * @value array of possible PieceIdGroup permutations of the base sorted PieceIdGroup
 */
export type PieceIdGroupsMap = Map<string, PieceIdGroupTuple[]>;

/**
 * Map of piece group permutations and their corresponding possible patterns
 * @key PieceIdGroup array as a string
 * @value Array of pieceGroupPatterns
 */
export type PatternConfigurationsArrayMap = Map<string, iPatternConfiguration[]>;

export type PatternConfigurationMap = Map<string, iPatternConfiguration>;
export type PieceGroupUniqueMap = Map<string, iPieceGroupUnique>;
export type PatternEvaluationsMap = Map<string, iPatternEvaluator[]>;
export type PatternComparisonsMap = Map<string, string[]>;
export type PieceGroupMap = Map<string, iPieceGroup>;
export type PieceGroupPermutationMap = Map<string, iPieceGroupPermutation>;

export type SolutionMap = Map<string, iSolution>;

/** Map used to cache any comparisons already made */
export type SolutionsArrayMap = Map<string, iSolution[]>;
export type PieceIdGroupArrayMap = Map<string, PieceIdGroupTuple[]>;

export type PieceGroupPatternEvaluationMap = Map<string, iPieceGroupPatternEvaluation>;
