import { MetadataContentArray, type Metadata } from "./ui/sidebar/types"

const isMetadataContentArray = (key: string): boolean => {
	return Object.values(MetadataContentArray).includes(key)
}

export const parseMetadata = (markdownContent: string) => {
	const metadata: Metadata = {}
	const start_metadata = markdownContent.indexOf('---')
	if (start_metadata === 0) {
		const end_metadata = markdownContent.indexOf('---', 1)
		if (start_metadata !== end_metadata) {
			const metadata_string = markdownContent.substring(start_metadata + 3, end_metadata)
			metadata_string.split('\n').forEach((i) => {
				if (i === '') return;
				const content = i.split(':')
				const key = content[0]
				let val: string | string[] = content[1].charAt(0) === ' ' ? content[1].substring(1) : content[1]
				if (isMetadataContentArray(key)) val = val.split(/,\s*/)
				metadata[key] = val
			})
		}
		markdownContent = markdownContent.substring(end_metadata + 3)
	}
	return metadata
}
