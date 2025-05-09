import { z } from "zod";

// Task status enum
export const TaskStatus = {
	QUEUED: "QUEUED",
	EXECUTING: "EXECUTING",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
	DELAYED: "DELAYED",
	CANCELED: "CANCELED",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

// Task types
export const TaskType = {
	CHAIN: "chain",
} as const;

export type TaskType = (typeof TaskType)[keyof typeof TaskType];

// Base task payload schema
export const taskPayloadSchema = z.object({
	name: z.string(),
	data: z
		.object({
			topic: z.string().optional(),
			output: z.any().optional(),
		})
		.optional(),
});

export type TaskPayload = z.infer<typeof taskPayloadSchema>;

// Task result schema
export const taskResultSchema = z.object({
	id: z.string(),
	status: z.enum([
		TaskStatus.QUEUED,
		TaskStatus.EXECUTING,
		TaskStatus.COMPLETED,
		TaskStatus.FAILED,
		TaskStatus.DELAYED,
		TaskStatus.CANCELED,
	]),
	payload: taskPayloadSchema,
	progress: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	completedAt: z.string().optional(),
	error: z
		.object({
			message: z.string(),
		})
		.optional(),
	attempts: z.number(),
});

export type TaskResult = z.infer<typeof taskResultSchema>;

// Task list response schema
export const taskListResponseSchema = z.object({
	tasks: z.array(taskResultSchema),
	total: z.number(),
	hasMore: z.boolean(),
});

export type TaskListResponse = z.infer<typeof taskListResponseSchema>;

// Task event schema for real-time updates
export const taskEventSchema = z.object({
	type: z.enum(["status", "progress", "error", "complete"]),
	taskId: z.string(),
	data: z.object({
		status: z
			.enum([
				TaskStatus.QUEUED,
				TaskStatus.EXECUTING,
				TaskStatus.COMPLETED,
				TaskStatus.FAILED,
				TaskStatus.DELAYED,
				TaskStatus.CANCELED,
			])
			.optional(),
		progress: z.number().min(0).max(100).optional(),
		error: z
			.object({
				message: z.string(),
			})
			.optional(),
		result: z.any().optional(),
	}),
	timestamp: z.string(),
});

export type TaskEvent = z.infer<typeof taskEventSchema>;

// Helper function to map run status to task status
export function mapRunStatusToTaskStatus(runStatus: string): TaskStatus {
	const statusMap: Record<string, TaskStatus> = {
		QUEUED: TaskStatus.QUEUED,
		EXECUTING: TaskStatus.EXECUTING,
		COMPLETED: TaskStatus.COMPLETED,
		FAILED: TaskStatus.FAILED,
		DELAYED: TaskStatus.DELAYED,
		CANCELED: TaskStatus.CANCELED,
	};

	return statusMap[runStatus] || TaskStatus.FAILED;
}
