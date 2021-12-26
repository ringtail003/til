export function splitTag(tagsString: string): string[] {
  if (!tagsString) {
    return [];
  }

  return tagsString
    .split(',')
    .map((v) => v.trim())
    .filter((v) => !!v);
}
