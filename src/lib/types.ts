export type Platform = {
  id: string;
  name: string;
  color: string;
  docsUrl: string;
};

export type Category = {
  slug: string;
  label: string;
  order: number;
};

export type Task = {
  slug: string;
  label: string;
  categorySlug: string;
  order: number;
};

export type Snippet = {
  platformId: string;
  filename: string;
  code: string;
  language: string;
};

export type TaskWithSnippets = Task & {
  snippets: Snippet[];
};
