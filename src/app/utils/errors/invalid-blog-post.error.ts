export class InvalidBlogPostError extends Error {
  constructor(message: string) {
    super(`Invalid blog post. "${message}"`);
  }
}
