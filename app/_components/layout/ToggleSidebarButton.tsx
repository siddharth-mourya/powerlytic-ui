"use client";

import { PanelRightClose } from "lucide-react";

export default function ToggleSideBarButton({
  showButton,
  onToggleSidebar,
  Icon = PanelRightClose,
}: {
  showButton: boolean;
  onToggleSidebar: () => void;
  Icon?: React.ComponentType<{ size?: number }>;
}) {
  if (showButton) {
    return (
      <button
        className="btn p-0 btn-ghost btn-sm"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        {Icon && <Icon size={18} />}
      </button>
    );
  }
  return null;
}
