export class InvalidBlogPostError extends Error {
  constructor(message: string, route: string) {
    super(`${route} has invalid item. "${message}"`);
  }
}
