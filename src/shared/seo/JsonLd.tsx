export interface JsonLdProps {
  readonly data: Record<string, unknown> | readonly Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  // Экранируем '<' в '\u003c' для защиты от инъекций внутри script тега
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />;
}
