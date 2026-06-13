import { getCategories, getTasks } from "./content";
import type { Category, Task } from "./types";

export type NavItem = Category & {
  tasks: Task[];
};

export function getNav(): NavItem[] {
  const categories = getCategories();
  return categories.map((cat) => ({
    ...cat,
    tasks: getTasks(cat.slug),
  }));
}
