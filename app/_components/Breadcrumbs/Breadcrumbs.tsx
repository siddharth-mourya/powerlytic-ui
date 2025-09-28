import Link from "next/link";
import React from "react";

interface Breadcrumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (items.length <= 1) return null;
  return (
    <div className="breadcrumbs text-sm p-4 ">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.path && index !== items.length - 1 ? (
              <Link href={item.path} className="text-blue-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
