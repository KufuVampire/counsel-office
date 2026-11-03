// MOCK: Все статьи и материалы носят исключительно информационный характер
import type { Post } from '../types';
import { post1 } from './posts/post-1';
import { post2 } from './posts/post-2';
import { post3 } from './posts/post-3';
import { post4 } from './posts/post-4';

export const POSTS: readonly Post[] = [post1, post2, post3, post4];
