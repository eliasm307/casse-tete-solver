export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function isTruthy<T>(x: T | undefined | null): x is T {
  return !!x;
}
