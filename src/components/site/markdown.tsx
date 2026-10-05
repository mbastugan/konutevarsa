function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\n+/);
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="font-serif text-2xl font-semibold">
              {inline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-4 font-serif text-3xl font-semibold">
              {inline(block.slice(3))}
            </h2>
          );
        }
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="space-y-2 border-l-2 border-accent pl-4 text-base">
              {lines.map((line) => (
                <li key={line}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{inline(block.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}
