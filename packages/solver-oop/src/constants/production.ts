import { AVAILABLE_PIECES_ARRAY } from "@casse-tete-solver/common/src/constants";
import TypeFactory from "../classes/TypeFactory";

export const AVAILABLE_PIECES_MAP: PieceMap = TypeFactory.newPiecesMap();

// add available pieces to map
AVAILABLE_PIECES_ARRAY.forEach((piece) => AVAILABLE_PIECES_MAP.set(piece.id, piece));
