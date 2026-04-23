import articlesData from "@/content/articles.json";

type ArticleRecord = {
  slug: string;
  title: string;
  snippet: string;
  content: string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  labels: string[];
  metaTitle?: string;
  metaDescription?: string;
};

export type Article = ArticleRecord & {
  date: string;
  updatedDate: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function buildMetaTitle(article: ArticleRecord) {
  if (article.metaTitle) return article.metaTitle;

  const primaryLabel = article.labels[0];

  if (primaryLabel === "Cricket") {
    return `${article.title} | Cricket News, Playing XI & Preview | YoSinTV`;
  }

  if (primaryLabel === "Football") {
    return `${article.title} | Football Preview, Team News & Analysis | YoSinTV`;
  }

  return `${article.title} | YoSinTV`;
}

function buildMetaDescription(article: ArticleRecord) {
  if (article.metaDescription) return article.metaDescription;

  return `${article.snippet} Read the latest ${article.labels.join(", ").toLowerCase()} coverage on YoSinTV.`;
}

export const articles: Article[] = (articlesData as ArticleRecord[]).map((article) => ({
  ...article,
  updatedAt: article.updatedAt ?? article.publishedAt,
  date: formatDate(article.publishedAt),
  updatedDate: formatDate(article.updatedAt ?? article.publishedAt),
  path: `/articles/${article.slug}`,
  metaTitle: buildMetaTitle(article),
  metaDescription: buildMetaDescription(article),
}));

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
