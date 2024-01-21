import App from "../components/App";
import { SolverKey } from "@casse-tete-solver/common/src/constants";

export default async function Home() {
  const solvers = await getAllSolverSolutions([SolverKey.OOP, SolverKey.Functional]);

  return (
    <main>
      {solvers.map(({ key, solutions: solutions }, i) => {
        return <App key={key} title={key} solutions={solutions} />;
      })}
    </main>
  );
}

async function getAllSolverSolutions(keys: SolverKey[]) {
  return Promise.all(keys.map(getSolutionsByKey));
}

async function getSolutionsByKey(key: SolverKey) {
  return {
    key,
    solutions: await import("../../public/solutions/" + key + ".json").then((m) => m.default),
  };
}
