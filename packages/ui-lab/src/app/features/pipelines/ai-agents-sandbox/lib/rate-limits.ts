import { LRUCache } from "lru-cache";

// Configuration
export const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
export const MAX_REQUESTS_PER_WINDOW = 10;

interface RateLimitInfo {
	count: number;
	resetTime: number;
}

const cache = new LRUCache<string, RateLimitInfo>({
	max: 500, // Maximum number of users to track
	ttl: RATE_LIMIT_WINDOW, // Time to live
});

/**
 * Check if a user has exceeded their rate limit
 * @param identifier User identifier (e.g. IP address, user ID)
 * @returns Object with limit information
 */
export function checkRateLimit(identifier: string): {
	success: boolean;
	limit: number;
	remaining: number;
	resetTime: number;
} {
	const now = Date.now();
	const resetTime = now + RATE_LIMIT_WINDOW;

	// Get the current rate limit info, or create a new one
	const rateInfo = cache.get(identifier) || {
		count: 0,
		resetTime,
	};

	// Check if the rate limit window has reset
	if (now > rateInfo.resetTime) {
		rateInfo.count = 0;
		rateInfo.resetTime = resetTime;
	}

	// Increment the count
	rateInfo.count += 1;
	cache.set(identifier, rateInfo);

	return {
		success: rateInfo.count <= MAX_REQUESTS_PER_WINDOW,
		limit: MAX_REQUESTS_PER_WINDOW,
		remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - rateInfo.count),
		resetTime: rateInfo.resetTime,
	};
}

/**
 * Wait until rate limit is available
 * @param identifier User identifier
 * @param maxWaitMs Maximum time to wait in milliseconds
 * @returns Promise that resolves when rate limit is available
 */
export async function waitForRateLimit(
	identifier: string,
	maxWaitMs = 5000,
): Promise<boolean> {
	const start = Date.now();
	let rateLimitInfo = checkRateLimit(identifier);

	// If under the limit, return immediately
	if (rateLimitInfo.success) {
		return true;
	}

	// Wait until the rate limit resets or timeout
	while (!rateLimitInfo.success) {
		// Check if we've exceeded the maximum wait time
		if (Date.now() - start > maxWaitMs) {
			return false;
		}

		// Wait until reset time
		const timeToReset = Math.max(100, rateLimitInfo.resetTime - Date.now());
		await new Promise((resolve) => setTimeout(resolve, timeToReset));

		// Check again
		rateLimitInfo = checkRateLimit(identifier);
	}

	return true;
}
