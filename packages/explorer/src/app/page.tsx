import SolverView from "../components/SolverView";
import { SolverKey } from "@casse-tete-solver/common/src/constants";

export default async function Home() {
  const solvers = await getAllSolversData([SolverKey.OOP, SolverKey.Functional]);

  return (
    <main>
      {solvers.map(({ key, solutions: solutions }, i) => {
        return <SolverView key={key} title={key} solutions={solutions} />;
      })}
    </main>
  );
}

async function getAllSolversData(keys: SolverKey[]) {
  return Promise.all(keys.map(getSolverDataByKey));
}

async function getSolverDataByKey(key: SolverKey) {
  return {
    key,
    solutions: await import("../../public/solutions/" + key + ".json").then((m) => m.default),
  };
}
