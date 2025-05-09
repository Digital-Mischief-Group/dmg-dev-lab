/**
 * Utility functions for the AI Agent Sandbox
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for combining and merging tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format a timestamp to a readable date string
 */
export function formatTimestamp(timestamp: number): string {
	return new Date(timestamp).toLocaleString(undefined, {
		year: "2-digit",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

/**
 * Truncate a string to a maximum length with ellipsis
 */
export function truncateString(str: string, maxLength: number): string {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength - 3) + "...";
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
	return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Estimate token count from string
 * This is a very simple estimation (not accurate for all models)
 */
export function estimateTokenCount(text: string): number {
	// A simple approximation: 1 token ≈ 4 characters
	return Math.ceil(text.length / 4);
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;

	return function (...args: Parameters<T>) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
}

/**
 * Throttle a function
 */
export function throttle<T extends (...args: any[]) => any>(
	fn: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let inThrottle = false;

	return function (...args: Parameters<T>) {
		if (!inThrottle) {
			fn(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error("Failed to copy text:", error);
		return false;
	}
}

/**
 * Check if the user's device is a mobile device
 */
export function isMobileDevice(): boolean {
	return (
		typeof window !== "undefined" &&
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		)
	);
}

// Utility functions

/**
 * Format JSON string for display
 */
export function formatJSONString(str: string, indent = 2) {
	try {
		const obj = JSON.parse(str);
		// Special handling for response text to preserve formatting
		if (obj.answer || obj.text || obj.response) {
			const mainText = obj.answer || obj.text || obj.response;
			// Keep the main text as is, but format the rest
			const rest = { ...obj };
			delete rest.answer;
			delete rest.text;
			delete rest.response;
			return (
				mainText +
				(Object.keys(rest).length > 0
					? "\n\n" + JSON.stringify(rest, null, indent)
					: "")
			);
		}
		return JSON.stringify(obj, null, indent);
	} catch {
		return str;
	}
}

/**
 * Format content for markdown display
 */
export function formatMarkdownContent(content: any): string {
	if (content == null) return "";
	if (typeof content === "string") return content;
	try {
		return JSON.stringify(content, null, 2);
	} catch {
		return String(content);
	}
}

/**
 * Extract display text from history item
 */
export const getDisplayTextFromHistory = (
	parsedItem: Record<string, any>,
): string => {
	const values = Object.values(parsedItem);
	for (const value of values) {
		if (typeof value === "string" && value.trim()) {
			return value;
		}
	}
	return "Empty input";
};

/**
 * Format display text with truncation
 */
export const formatDisplayText = (text: string): string => {
	return text.length > 50 ? `${text.slice(0, 50)}...` : text;
};
