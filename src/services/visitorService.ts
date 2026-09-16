const VISIT_COUNT_KEY = "visit-count";

export function incrementVisitCount(): number {
  const stored = localStorage.getItem(VISIT_COUNT_KEY);
  const total = stored ? parseInt(stored, 10) + 1 : 1;
  localStorage.setItem(VISIT_COUNT_KEY, String(total));
  return total;
}
