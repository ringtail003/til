export function splitTag(tagsString: string): string[] {
  if (!tagsString) {
    return [];
  }

  return tagsString.split(' ').filter((v) => !!v);
}
