import styled from "@emotion/styled";
import React from "react";
import Pattern from "./Pattern";
import type { GeneralSolution } from "@casse-tete-solver/common/src/types";

interface iProps {
  solution: GeneralSolution;
}
const SolutionContainer = styled.div`
  width: 100%;
  height: 250px;
  border: 1px solid grey;
  font-size: 0.5em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  position: relative;
`;

export default function Solution({ solution }: iProps) {
  return (
    <SolutionContainer>
      {solution.layers.map((layer) => {
        return <Pattern key={layer.id} layer={layer}></Pattern>;
      })}
    </SolutionContainer>
  );
}
