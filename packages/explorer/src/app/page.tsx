import SolverView from "../components/SolverView";
import { SolverKey } from "@casse-tete-solver/common/src/constants";

export default async function Home() {
  const solvers = await getAllSolversData([SolverKey.Functional, SolverKey.OOP]);
  console.log("solvers", solvers);
  return (
    <main>
      {solvers.map(({ key, solutions: solutions }) => {
        return <SolverView key={key} title={key} solutions={solutions} />;
      })}
    </main>
  );
}

async function getAllSolversData(keys: SolverKey[]) {
  return Promise.all(keys.map(getSolverDataByKey));
}

async function getSolverDataByKey(key: SolverKey) {
  const solutions = await import(`../../public/solutions/${key}.json`).then((m) => m.default);
  console.log(key, "solutions", solutions);
  return {
    key,
    solutions,
  };
}
