import { TriangleAlert } from "lucide-react";
import React from "react";

type ErrorProps = {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function Error({
  title = "An error occurred",
  message,
  actionLabel,
  onAction,
}: ErrorProps) {
  const handleAction = () => {
    if (onAction) {
      onAction();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleAction();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <TriangleAlert
        className="w-16 h-16 text-red-500 mb-4"
        aria-hidden="true"
      />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-lg text-gray-600 mb-6">{message}</p>
      {actionLabel && onAction && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleAction}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label={actionLabel}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
