import fs from "fs";
import path from "path";
import type { Category, Task, Snippet, TaskWithSnippets } from "./types";
import { platforms } from "./platforms";

const CONTENT_DIR = path.join(process.cwd(), "content");

function parseDir(dirName: string): { order: number; slug: string } {
  const [orderStr, ...rest] = dirName.split("-");
  return {
    order: parseInt(orderStr, 10),
    slug: rest.join("-"),
  };
}

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getLanguageFromFilename(filename: string): string {
  const ext = filename.split(".").pop() ?? "";
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
  };
  return map[ext] ?? "typescript";
}

export function getCategories(): Category[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => fs.statSync(path.join(CONTENT_DIR, n)).isDirectory())
    .map((dirName) => {
      const { order, slug } = parseDir(dirName);
      return { slug, label: slugToLabel(slug), order };
    })
    .sort((a, b) => a.order - b.order);
}

export function getTasks(categorySlug: string): Task[] {
  const categoryDir = fs
    .readdirSync(CONTENT_DIR)
    .find((n) => n.endsWith(`-${categorySlug}`));

  if (!categoryDir) return [];

  const categoryPath = path.join(CONTENT_DIR, categoryDir);

  return fs
    .readdirSync(categoryPath)
    .filter((n) => fs.statSync(path.join(categoryPath, n)).isDirectory())
    .map((dirName) => {
      const { order, slug } = parseDir(dirName);
      return { slug, label: slugToLabel(slug), categorySlug, order };
    })
    .sort((a, b) => a.order - b.order);
}

export function getSnippets(categorySlug: string, taskSlug: string): Snippet[] {
  const categoryDir = fs
    .readdirSync(CONTENT_DIR)
    .find((n) => n.endsWith(`-${categorySlug}`));

  if (!categoryDir) return [];

  const taskDir = fs
    .readdirSync(path.join(CONTENT_DIR, categoryDir))
    .find((n) => n.endsWith(`-${taskSlug}`));

  if (!taskDir) return [];

  const taskPath = path.join(CONTENT_DIR, categoryDir, taskDir);
  const snippets: Snippet[] = [];

  for (const platformId of fs.readdirSync(taskPath)) {
    const platformPath = path.join(taskPath, platformId);
    if (!fs.statSync(platformPath).isDirectory()) continue;

    for (const filename of fs.readdirSync(platformPath)) {
      const code = fs.readFileSync(path.join(platformPath, filename), "utf-8");
      snippets.push({
        platformId,
        filename,
        code,
        language: getLanguageFromFilename(filename),
      });
    }
  }

  return snippets.sort((a, b) => {
    const aIndex = platforms.findIndex((p) => p.id === a.platformId);
    const bIndex = platforms.findIndex((p) => p.id === b.platformId);
    return aIndex - bIndex;
  });
}

export function getTaskWithSnippets(
  categorySlug: string,
  taskSlug: string,
): TaskWithSnippets | null {
  const tasks = getTasks(categorySlug);
  const task = tasks.find((t) => t.slug === taskSlug);
  if (!task) return null;
  return { ...task, snippets: getSnippets(categorySlug, taskSlug) };
}
