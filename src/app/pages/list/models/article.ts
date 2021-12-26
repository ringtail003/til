import { InvalidBlogPostError } from 'src/app/utils/errors/invalid-blog-post.error';
import { splitTag } from 'src/app/utils/split-tag';

export type Article = {
  route: string;
  title: string;
  updatedAt: Date;
  tags: string[];
};

export type ArticleLike = {
  route: string;
  title?: string;
  updatedAt?: Date;
  tags?: string;
};

export const create = (articleLike: ArticleLike): Article => {
  if (!articleLike.title) {
    throw new InvalidBlogPostError(`${articleLike.route} has not title.`);
  }

  if (!articleLike.updatedAt) {
    throw new InvalidBlogPostError(`${articleLike.route} has not updatedAt.`);
  }
  return {
    route: articleLike.route,
    title: articleLike.title,
    updatedAt: articleLike.updatedAt,
    tags: splitTag(articleLike.tags || ''),
  };
};
