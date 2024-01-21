"use client";

import styled from "@emotion/styled";
import React from "react";
import SolutionPage from "./SolutionPage";
import type { GeneralSolution } from "@casse-tete-solver/common/src/types";

const MainContainer = styled.header`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

/* https://stackoverflow.com/questions/16649943/css-to-set-a4-paper-size */
const Page = styled.div`
  width: 210mm;
  height: 297mm;
  padding: 5mm;
  margin: 10mm auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  @media print {
    & {
      margin: 0;
      page-break-after: always;
    }
  }
`;

type Props = {
  solutions: GeneralSolution[];
  title: string;
};

function App({ title, solutions }: Props) {
  const solutionGroups = groupSolutions(solutions);
  console.log("solutionGroups", solutionGroups);

  return (
    <MainContainer>
      <h2>{title}</h2>
      {solutionGroups.map((solutionGroup, i) => {
        const id = solutionGroup.map((s) => s.id).join("");
        return (
          <Page key={id}>
            <SolutionPage
              solutionGroup={solutionGroup}
              pageNo={i + 1}
              pageCount={solutionGroups.length}
            />
          </Page>
        );
      })}
    </MainContainer>
  );
}

function groupSolutions(solutions: GeneralSolution[]): GeneralSolution[][] {
  return solutions.reduce(
    (acc, solution) => {
      const lastGroupAdded = acc[acc.length - 1];

      if (lastGroupAdded.length < 4) {
        // add current solution to last group if it hasn't reached the limit
        acc[acc.length - 1].push(solution);
      } else {
        // create a new solution group if the last one reached the limit
        acc.push([solution]);
      }
      return acc;
    },
    [[]] as GeneralSolution[][],
  );
}

export default App;
