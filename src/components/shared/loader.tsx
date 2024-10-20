import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  title?: string;
}

export default function Loader({ className, title }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-64",
        className
      )}
    >
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
      {title && <p className="mt-4 text-sm text-gray-600">{title}</p>}
    </div>
  );
}
