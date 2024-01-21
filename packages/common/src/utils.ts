import fs from "fs/promises";
import path from "path";

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function isTruthy<T>(x: T | undefined | null): x is T {
  return !!x;
}

async function ensurePathExists(filePath: string) {
  const dirname = path.dirname(filePath);
  try {
    await fs.mkdir(dirname, { recursive: true });
    await fs.writeFile(filePath, "");
  } catch (error) {
    console.error("Error creating file path:", error);
  }
}

export async function saveJsonToFile(data: unknown, outputFilePath: string) {
  await ensurePathExists(outputFilePath) // ensure file path exists
    .then(() => fs.writeFile(outputFilePath, JSON.stringify(data, null, 2))) // write JSON to file path
    .then(() => console.log(__filename, `File: "${outputFilePath}" created successfully`)) // log success
    .catch((error) =>
      console.error(__filename, `ERROR creating File: "${outputFilePath}"`, { error }),
    );
}
