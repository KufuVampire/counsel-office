export type BlockType = 'paragraph' | 'heading' | 'list' | 'quote';

export interface ParagraphBlock {
  readonly type: 'paragraph';
  readonly text: string;
}

export interface HeadingBlock {
  readonly type: 'heading';
  readonly level: 2 | 3;
  readonly text: string;
}

export interface ListBlock {
  readonly type: 'list';
  readonly items: readonly string[];
}

export interface QuoteBlock {
  readonly type: 'quote';
  readonly text: string;
  readonly caption?: string;
}

export type ContentBlock = ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock;

export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly practiceSlug?: string;
  readonly publishedAt: string;
  readonly updatedAt: string;
  readonly readingMinutes: number;
  readonly content: readonly ContentBlock[];
}
