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
export async function checkRateLimit(identifier: string): Promise<{
	success: boolean;
	limit: number;
	remaining: number;
	resetTime: number;
}> {
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
