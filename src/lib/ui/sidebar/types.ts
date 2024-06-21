import type Fuse from 'fuse.js';

export interface Item {
  name: string
  children?: Item[]
  metadata?: Metadata
  github_remote?: {
    owner: string
    repo: string
    commit_sha: string
    page_format?: boolean;
  }
}

export interface SearchItem {
  path: string
  tags?: string | string[]
  keywords?: string | string[]
  date?: string | string[]
  watched?: string | string[]
}

export interface GithubSearchItem extends SearchItem {
  github_owner: string;
  github_repo: string;
  github_commit_sha?: string;
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

