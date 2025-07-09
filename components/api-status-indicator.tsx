"use client";

import { useApiStatus } from "@/hooks/use-api-status";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ApiStatusIndicator() {
  const { status } = useApiStatus();

  const statusStyles = {
    online: "bg-emerald-500",
    offline: "bg-red-500",
    loading: "bg-amber-500",
  };

  const statusMessages = {
    online: "API is online and responding",
    offline: "API is currently unreachable",
    loading: "Checking API connection...",
  };

  // Use a different animation based on status
  const pulseAnimation =
    status === "offline"
      ? "animate-pulse"
      : status === "loading"
      ? "animate-pulse"
      : "";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "size-2 rounded-full ml-1",
            statusStyles[status],
            pulseAnimation
          )}
          aria-label={statusMessages[status]}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{statusMessages[status]}</p>
      </TooltipContent>
    </Tooltip>
  );
}
