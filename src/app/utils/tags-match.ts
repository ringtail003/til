export function tagsMatch(tags: string[], matches: string[]): boolean {
  const _matches = matches.map((tag) => tag.toLowerCase());
  const _tags = tags.map((tag) => tag.toLowerCase());

  return _matches.every((match) => _tags.includes(match));
}
