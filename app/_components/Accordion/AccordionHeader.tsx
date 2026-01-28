// components/ui/AccordionHeader.tsx
import { ChevronDown } from "lucide-react";

export function AccordionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-base-200 px-5 py-3.5 hover:bg-base-300 transition-colors group marker:content-none">
      <div className="flex-1">
        <div className="font-bold text-base text-base-content">{title}</div>
        {subtitle && (
          <div className="text-xs text-base-content/60 mt-0.5">{subtitle}</div>
        )}
      </div>
      <ChevronDown className="h-5 w-5 text-base-content/60 transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
    </summary>
  );
}
