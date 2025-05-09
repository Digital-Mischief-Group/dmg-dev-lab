import { task, logger } from "@trigger.dev/sdk/v3";
import {
	searchStoriesByTopic,
	fetchComments,
	type HNStory,
	type HNComment,
} from "../lib/data-sources/hacker-news";

// Chain task result type
export interface ChainTaskResult {
	topic: string;
	stories: Array<{
		story: HNStory;
		stats: {
			score: number;
			commentCount: number;
			age: number; // in hours
		};
		topComments: HNComment[];
		summary: {
			popularity: "high" | "medium" | "low";
			engagement: "high" | "medium" | "low";
			ageCategory: "new" | "recent" | "old";
		};
	}>;
	topicSummary: {
		totalStories: number;
		avgScore: number;
		avgComments: number;
		trending: boolean;
	};
}

// Create a chain task that processes stories by topic
export const chainTask = task({
	id: "story-chain-task",
	run: async (payload: { topic: string }, { ctx }) => {
		logger.log("Starting topic chain analysis", { topic: payload.topic });

		// Step 1: Search for stories by topic
		logger.log("Step 1: Searching stories");
		const stories = await searchStoriesByTopic(payload.topic);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate work

		// Step 2: Process each story
		logger.log("Step 2: Processing stories");
		const processedStories = await Promise.all(
			stories.map(async (story) => {
				// Fetch comments for the story
				const comments = await fetchComments(story.id);
				await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate work

				// Calculate stats
				const stats = {
					score: story.score,
					commentCount: story.descendants,
					age: (Date.now() / 1000 - story.time) / 3600, // Convert to hours
				};

				// Generate summary
				const summary = {
					popularity:
						story.score > 100 ? "high" : story.score > 50 ? "medium" : "low",
					engagement:
						story.descendants > 50
							? "high"
							: story.descendants > 20
								? "medium"
								: "low",
					ageCategory:
						stats.age < 24 ? "new" : stats.age < 72 ? "recent" : "old",
				} as const;

				return {
					story,
					stats,
					topComments: comments,
					summary,
				};
			}),
		);

		// Step 3: Generate topic summary
		logger.log("Step 3: Generating topic summary");
		const topicSummary = {
			totalStories: processedStories.length,
			avgScore: Math.round(
				processedStories.reduce((sum, item) => sum + item.stats.score, 0) /
					processedStories.length,
			),
			avgComments: Math.round(
				processedStories.reduce(
					(sum, item) => sum + item.stats.commentCount,
					0,
				) / processedStories.length,
			),
			trending: processedStories.some(
				(item) =>
					item.summary.popularity === "high" &&
					item.summary.ageCategory === "new",
			),
		};

		logger.log("Chain completed", {
			topic: payload.topic,
			storiesFound: processedStories.length,
		});

		return {
			topic: payload.topic,
			stories: processedStories,
			topicSummary,
		};
	},
});
