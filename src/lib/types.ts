import type { ReactNode } from "react";

export type Platform = {
  id: string;
  name: string;
  color: string;
  docsUrl: string;
  logo: string;
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

export type TaskBlock = {
  platform: Platform;
  node: ReactNode;
};

export type TaskSection = {
  task: Task;
  blocks: TaskBlock[];
};

export type CategorySection = {
  category: Category;
  taskSections: TaskSection[];
};
