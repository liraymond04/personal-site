import { createClient } from '@supabase/supabase-js'
import { db } from "$lib/db";
import { and, eq } from "drizzle-orm";
import { postsTable as post } from "$lib/db/schema";
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
import path from 'path';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getPost = (repoUrl: string, filePath: string) => {
	return db
		.select({
			title: post.title,
			tags: post.tags,
			keywords: post.keywords,
			mediaFiles: post.mediaFiles,
			layout: post.layout,
			content: post.content
		})
		.from(post)
		.where(
			and(
				eq(post.repoUrl, repoUrl),
				eq(post.filePath, filePath)
			)
		)
}

export const getAllPostsFromRepo = (repoUrl: string) => {
	return db
		.select({
			title: post.title,
			filePath: post.filePath,
			tags: post.tags,
			keywords: post.keywords,
		})
		.from(post)
		.where(
			eq(post.repoUrl, repoUrl)
		)
}

export const getAllPosts = () => {
	return db
		.select()
		.from(post)
}

export const getMediaFilesFromPost = (repoUrl: string, filePath: string) => {
	return db
		.select({
			media_files: post.mediaFiles,
		})
		.from(post)
		.where(
			and(
				eq(post.repoUrl, repoUrl),
				eq(post.filePath, filePath)
			)
		)
}

function isPathInString(input: string, path: string): boolean {
	const cleanedPath = path.startsWith('./') ? path.slice(2) : path;
	const regex = new RegExp(`(?:^|[^a-zA-Z0-9-_])${cleanedPath}(?:$|[^a-zA-Z0-9-_])`);
	return regex.test(input);
}

function replacePath(input: string, oldPath: string, newPath: string): string {
    const regex = new RegExp(`(?<!\\[)(?:\\.\\/)?${oldPath}(?!\\])`, 'g');
    return input.replace(regex, (match) => {
        const cleanedMatch = match.startsWith('./') ? match.slice(2) : match;
        return newPath + cleanedMatch.slice(oldPath.length);
    });
}

export const replaceRemoteImagePaths = async (content: string, repoUrl: string, filePath: string) => {
	const result = await getMediaFilesFromPost(repoUrl, filePath);
	const mediaFiles = result[0]?.media_files;

	if (!mediaFiles) {
		return content;
	}

	let finalContent = content;

	const cwd = path.dirname(filePath);
	mediaFiles.forEach((file: string) => {
		const rel = path.relative(cwd, file);

		if (isPathInString(finalContent, rel)) {
			const { data } = supabase
				.storage
				.from('files')
				.getPublicUrl(path.join(repoUrl, file))

			if (data?.publicUrl) {
				finalContent = replacePath(finalContent, rel, data.publicUrl);
			}
		}
	});

	return finalContent;
}
