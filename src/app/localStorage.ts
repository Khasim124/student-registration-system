export function loadState<T>(key = "student-reg-state"): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown as T) : undefined;
  } catch (err) {
    JSON.stringify(err);
    return undefined;
  }
}

export function saveState<T>(state: T, key = "student-reg-state"): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    JSON.stringify(err);
  }
}
