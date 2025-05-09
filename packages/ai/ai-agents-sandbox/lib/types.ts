/**
 * Agent Types
 */

export interface Message {
	id: string;
	role: "user" | "assistant" | "system";
	content: string;
	timestamp: number;
}

export interface AgentType {
	id: string;
	name: string;
	description?: string;
	icon?: string;
	resultTabs?: (
		| "response"
		| "steps"
		| "classification"
		| "tools"
		| "iterations"
	)[];
	outputSchema?: any;
	params?: {
		maxTokens?: number;
		temperature?: number;
		topP?: number;
		frequencyPenalty?: number;
		presencePenalty?: number;
	};
}

export interface AgentConfig {
	model: string;
	temperature: number;
	maxTokens: number;
	topP: number;
	streamResponse: boolean;
}

export interface AgentResponse {
	id: string;
	message: Message;
	usage: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
	created: number;
}

export interface AgentError {
	code: string;
	message: string;
	type: "rate_limit" | "invalid_request" | "server_error" | "auth_error";
}

/**
 * API Types
 */

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: {
		message: string;
		code?: string;
	};
}

export interface PaginatedResponse<T> {
	data: T[];
	nextCursor?: string;
	totalCount: number;
}

/**
 * UI States
 */

export type InputStatus = "idle" | "loading" | "error" | "success";

export type Theme = "light" | "dark" | "system";

export interface UserPreferences {
	theme: Theme;
	fontSize: "small" | "medium" | "large";
	soundEnabled: boolean;
	autoScroll: boolean;
}
