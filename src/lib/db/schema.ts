import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	tags: text('tags').array(),
	keywords: text('keywords').array(),
	mediaFiles: text('media_files').array(),
	layout: text('layout'), // default assume 'project-post'
	repoUrl: text('repo_url').notNull(),
	filePath: text('file_path').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date()),
}).enableRLS();

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
