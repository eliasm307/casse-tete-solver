import styled from "@emotion/styled";
import * as React from "react";
import { GeneralSolution } from "@casse-tete-solver/common/src/types";
import Solution from "./Solution";

interface iPageProps {
  children?: React.ReactNode;
  solutionGroup: GeneralSolution[];
  pageNo: number;
  pageCount: number;
}

const PageHeader = styled.h2`
  font-size: 1em;
`;

const SolutionGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0px;
`;

export default function SolutionPage({ solutionGroup, pageNo, pageCount }: iPageProps) {
  return (
    <>
      <PageHeader>{`Solutions Casse Tete (${pageNo} / ${pageCount})`}</PageHeader>

      <SolutionGrid>
        {solutionGroup.map((solution) => (
          <Solution key={solution.id} solution={solution} />
        ))}
      </SolutionGrid>
    </>
  );
}
