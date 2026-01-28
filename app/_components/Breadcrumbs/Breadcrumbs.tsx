import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (items.length <= 1) return null;
  console.log("Breadcrumbs items:", items);
  return (
    <nav
      className="flex items-center gap-2 text-sm pb-4 mb-4"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.path && index !== items.length - 1 ? (
              <>
                <Link
                  href={item.path}
                  className="text-primary hover:text-primary-focus hover:underline transition-colors font-medium"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-base-content/40 flex-shrink-0" />
                )}
              </>
            ) : (
              <>
                <span className="text-base-content/60 font-medium">
                  {item.label}
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
