export interface Item {
  name: string;
  children?: Item[];
  metadata?: Metadata
}

export interface Metadata {
	[name: string]: string | string[]
}

export enum MetadataContentArray {
	'tags',
	'keywords'
}

