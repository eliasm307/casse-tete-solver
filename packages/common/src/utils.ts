import fs from "fs-extra";

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function isTruthy<T>(x: T | undefined | null): x is T {
  return !!x;
}

export async function saveJsonToFile(data: unknown, outputFilePath: string) {
  await fs
    .ensureFile(outputFilePath) // ensure file path exists
    .then(() => fs.writeJSON(outputFilePath, data, { spaces: 2 })) // write JSON to file path
    .then(() => console.log(__filename, `File: "${outputFilePath}" created successfully`)) // log success
    .catch((error) =>
      console.error(__filename, `ERROR creating File: "${outputFilePath}"`, { error }),
    );
}
