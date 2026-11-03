import { Prose } from '@/shared/ui/Prose';
import type { ContentBlock } from '../types';

export interface PostContentProps {
  readonly content: readonly ContentBlock[];
  readonly className?: string;
}

export function PostContent({ content, className }: PostContentProps) {
  return (
    <Prose className={className}>
      {content.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={idx}>{block.text}</p>;
          case 'heading':
            return block.level === 3 ? (
              <h3 key={idx}>{block.text}</h3>
            ) : (
              <h2 key={idx}>{block.text}</h2>
            );
          case 'list':
            return (
              <ul key={idx}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote key={idx}>
                <p>{block.text}</p>
                {block.caption && (
                  <cite className="block not-italic text-caption text-fg-subtle mt-2">
                    — {block.caption}
                  </cite>
                )}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </Prose>
  );
}
