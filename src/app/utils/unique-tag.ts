export function uniqueTag(tags: string[]): string[] {
  const array: string[] = [];

  tags.forEach((tag) => {
    if (!array.find((v) => v.toLowerCase() === tag.toLowerCase())) {
      array.push(tag);
    }
  });

  return array;
}
