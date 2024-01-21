import styled from "@emotion/styled";
import React from "react";
import PieceSurface from "./Piece";
import type { SolutionLayer } from "@casse-tete-solver/common/src/types";

interface iProps {
  layer: SolutionLayer;
}

interface iPatternContainer {
  children: React.ReactNode;
  angle: number;
}

const PatternContainer = styled("div")`
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  justify-content: center;
  font-size: 0.5em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(3, 40px); */
  transform: ${({ angle }: iPatternContainer) => `translate(-50%, -50%) rotate(${-angle}deg)`};
  gap: 0px 0px;
`;

export default function Pattern({ layer }: iProps) {
  return (
    <div style={{ position: "relative", padding: "auto" }}>
      <PatternContainer angle={layer.rotationDegrees}>
        {layer.pieces.map((pieceSurface) => (
          <PieceSurface key={pieceSurface.join("")} pieceSurface={pieceSurface} />
        ))}
      </PatternContainer>
    </div>
  );
}
