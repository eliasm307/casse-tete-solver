import type { Number3Tuple } from "@casse-tete-solver/common/src/types";
import styled from "@emotion/styled";
import React from "react";

interface iProps {
  pieceSurface: Number3Tuple;
}

/* https://cssanimation.rocks/spheres/ */
const SlotNub = styled.div`
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    height: 35px;
    width: 35px;
    padding: 0;
    margin: 0;
    background: radial-gradient(circle at 40% 10%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  }
`;
const SlotHole = styled.div`
  &::after {
    content: "";
    display: block;
    position: absolute;
    height: 35px;
    width: 35px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 50%;
  }
`;
const SlotBlank = styled.div``;

const Piece = styled.div`
  display: grid;
  border: 2px solid black;
  height: auto;
  background-color: brown;
`;

const SlotContainer = styled.div`
  position: relative;
`;

const renderSlot: any = (slotValue: number) => {
  switch (slotValue) {
    case -1:
      return <SlotHole />;
    case 0:
      return <SlotBlank />;
    case 1:
      return <SlotNub />;
    default:
      return new Error(`Unknown slot value`);
  }
};

export default function PieceSurface({ pieceSurface }: iProps) {
  return (
    <Piece>
      {pieceSurface.map((slotValue) => (
        <SlotContainer key={slotValue}>{renderSlot(slotValue)}</SlotContainer>
      ))}
    </Piece>
  );
}
