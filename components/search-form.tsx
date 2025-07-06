import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("relative w-full max-w-sm", className)} {...props}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className="pl-10 h-9 w-full bg-background focus-visible:ring-1"
        />
      </div>
    </form>
  );
}
