export class InvalidBlogIndexError extends Error {
  constructor(message: string, route: string) {
    super(`${route} has invalid item. "${message}"`);
  }
}
