"use server";

import { revalidatePath } from "next/cache";
import { runs } from "@trigger.dev/sdk/v3";
import { cookies } from "next/headers";
import {
	generatePublicAccessToken,
	generateListPublicAccessToken,
	generateTaskToken,
} from "./auth";
import type { TaskPayload, TaskResult, TaskListResponse } from "./schema";
import { mapRunStatusToTaskStatus } from "./schema";

export async function createTask(payload: TaskPayload): Promise<TaskResult> {
	try {
		console.log("Creating task with payload:", payload);

		// Generate task token with proper permissions
		const taskToken = await generateTaskToken();
		const cookieStore = await cookies();
		cookieStore.set({
			name: "publicAccessToken",
			value: taskToken,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		// Create the task
		const replayResult = await runs.replay(payload.name);
		console.log("Task created successfully:", replayResult);

		// Poll for the full run details with a shorter timeout
		const result = await runs.poll(replayResult.id, { pollIntervalMs: 1000 });
		console.log("Full run details:", result);

		// Generate and set public access token for the new run
		console.log("Generating public access token for run:", result.id);
		const publicAccessToken = await generatePublicAccessToken(result.id);
		cookieStore.set({
			name: "publicAccessToken",
			value: publicAccessToken,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		console.log("Public access token set in cookies");

		return {
			id: result.id,
			status: mapRunStatusToTaskStatus(result.status),
			payload: {
				name: result.taskIdentifier || "",
				data: result.output || {},
			},
			progress: 0,
			createdAt: result.createdAt.toISOString(),
			updatedAt: result.updatedAt.toISOString(),
			completedAt: result.finishedAt?.toISOString(),
			attempts: result.attemptCount,
			error: result.error ? { message: result.error.message } : undefined,
		};
	} catch (error) {
		console.error("Error creating task:", error);
		throw new Error(
			error instanceof Error ? error.message : "Failed to create task",
		);
	}
}

export async function listTasks(filters: {
	limit?: number;
	offset?: number;
}): Promise<TaskListResponse> {
	try {
		const { limit = 10 } = filters;

		// Generate public access token for listing runs
		const publicAccessToken = await generateListPublicAccessToken();
		const cookieStore = await cookies();
		cookieStore.set({
			name: "listPublicAccessToken",
			value: publicAccessToken,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		const page = await runs.list({ limit });

		// Map the basic run info
		const tasks = page.data.map((run) => ({
			id: run.id,
			status: mapRunStatusToTaskStatus(run.status),
			payload: {
				name: run.taskIdentifier || "",
				data: {},
			},
			progress: 0,
			createdAt: run.createdAt.toISOString(),
			updatedAt: run.updatedAt.toISOString(),
			completedAt: run.finishedAt?.toISOString(),
			attempts: 0,
			error: undefined,
		}));

		return {
			tasks,
			total: tasks.length,
			hasMore: Boolean(page.pagination.next),
		};
	} catch (error) {
		console.error("Error listing tasks:", error);
		throw new Error("Failed to list tasks");
	}
}

export async function getTask(id: string): Promise<TaskResult> {
	try {
		// Generate public access token for this specific run
		const publicAccessToken = await generatePublicAccessToken(id);
		const cookieStore = await cookies();
		cookieStore.set({
			name: "publicAccessToken",
			value: publicAccessToken,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		// Poll with a shorter interval
		const result = await runs.poll(id, { pollIntervalMs: 1000 });
		return {
			id: result.id,
			status: mapRunStatusToTaskStatus(result.status),
			payload: {
				name: result.taskIdentifier || "",
				data: result.output || {},
			},
			progress: 0,
			createdAt: result.createdAt.toISOString(),
			updatedAt: result.updatedAt.toISOString(),
			completedAt: result.finishedAt?.toISOString(),
			attempts: result.attemptCount,
			error: result.error ? { message: result.error.message } : undefined,
		};
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : "Failed to get task details",
		);
	}
}
