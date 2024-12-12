import type Fuse from 'fuse.js';

export interface Item {
  name: string
  children?: Item[]
  metadata?: Metadata
}

export interface SearchItem {
  path: string
  tags?: string | string[]
  keywords?: string | string[]
  date?: string | string[]
  watched?: string | string[]
}

export interface Search {
  val: string;
  path: boolean;
  tags: boolean;
  keywords: boolean;
  function: 'and' | 'or';
  fuse: Fuse<SearchItem>;
}


export interface Metadata {
  [name: string]: string | string[]
}

export enum MetadataContentArray {
  'tags',
  'keywords'
}

