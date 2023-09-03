export interface Item {
  name: string;
  children?: Item[];
  metadata?: Metadata
}

export interface SearchItem {
  path: string
  tags: string | string[]
  keywords: string | string[]
  date: string | string[]
  watched: string | string[]
}

export interface Metadata {
	[name: string]: string | string[]
}

export enum MetadataContentArray {
	'tags',
	'keywords'
}

