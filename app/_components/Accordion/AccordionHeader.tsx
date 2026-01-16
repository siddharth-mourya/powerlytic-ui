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
    <summary className="flex cursor-pointer items-center justify-between rounded-md bg-gray-50 px-4 py-3 hover:bg-gray-100 transition">
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </div>
      <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" />
    </summary>
  );
}
