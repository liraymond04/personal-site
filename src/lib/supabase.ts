import { db } from "$lib/db";
import { and, eq } from "drizzle-orm";
import { postsTable as post } from "$lib/db/schema";

export const getPost = (repoUrl: string, filePath: string) => {
	return db
		.select({
			title: post.title,
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
