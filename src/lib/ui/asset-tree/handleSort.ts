import type { Search, SearchItem } from "../sidebar/types";

function intersect<T>(a: T[], b: T[]) {
  return a.filter(Set.prototype.has, new Set(b));
}

function union<T>(a: T[], b: T[]) {
  return [...new Set([...a, ...b])];
}

function resolve(results: SearchItem[][], additional: Search[]): SearchItem[] {
  let result = results[0];

  for (let i = 0; i < results.length; i++) {
    if (additional[i].val === '') continue;
    if (additional[i].function === 'and') {
      result = intersect(result, results[i]);
    } else if (additional[i].function === 'or') {
      result = union(result, results[i]);
    }
  }

  return result;
}

export function handleSort(items: SearchItem[], additional: Search[]) {
	const results = additional.map((item) => item.fuse.search(item.val).map((i) => i.item));

  return additional.reduce((total, i) => total + (i.val !== '' ? 1 : 0), 0) !== 0
			? resolve(results, additional)
			: items
}
