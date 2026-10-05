import { cn } from "@/lib/cn";

export function Photo({
  src,
  alt,
  priority = false,
  ratio = "aspect-[3/2]",
}: {
  src: string | null;
  alt: string;
  priority?: boolean;
  ratio?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-line", ratio)}>
      <img
        src={src || "/editorial/bosphorus.jpg"}
        alt={alt}
        width={1400}
        height={933}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
      />
    </div>
  );
}
