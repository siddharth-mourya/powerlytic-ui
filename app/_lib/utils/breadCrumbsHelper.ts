import { IBreadcrumb } from "../constants/breadcrumbs";

export const replaceBreadcumbPlaceholders = (
  breadcrumbItems: IBreadcrumb["items"],
  replacements: Record<string, string>,
) => {
  const keys = Object.keys(replacements);
  return breadcrumbItems.map((item) => {
    const newItem = { ...item };
    keys.forEach((key) => {
      if (newItem.path.includes(`{{${key}}}`)) {
        newItem.path = newItem.path.replace(`{{${key}}}`, replacements[key]);
      }
    });
    return newItem;
  });
};
