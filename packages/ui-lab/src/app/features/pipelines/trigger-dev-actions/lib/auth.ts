import { auth } from "@trigger.dev/sdk/v3";
import { cookies } from "next/headers";

// Helper function to generate a public access token for a specific run
export async function generatePublicAccessToken(
	runId: string,
): Promise<string> {
	try {
		const token = await auth.createPublicToken({
			scopes: {
				read: {
					runs: [runId],
				},
			},
			expirationTime: "15m",
		});
		return token;
	} catch (error) {
		throw new Error(
			error instanceof Error
				? error.message
				: "Failed to generate public access token",
		);
	}
}

// Helper function to get the public access token from cookies
export async function getPublicAccessToken(): Promise<string | undefined> {
	const cookieStore = await cookies();
	return cookieStore.get("publicAccessToken")?.value;
}

// Helper function to create cookie options
function createCookieOptions() {
	return {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 15 * 60, // 15 minutes in seconds
		path: "/",
	};
}

// Helper function to create a response with the public access token cookie
export function createResponseWithToken(token: string): Response {
	const response = new Response();
	response.headers.set(
		"Set-Cookie",
		`publicAccessToken=${token}; ${Object.entries(createCookieOptions())
			.map(([key, value]) => `${key}=${value}`)
			.join("; ")}`,
	);
	return response;
}

// Helper function to clear the public access token cookie
export async function clearPublicAccessToken() {
	const cookieStore = await cookies();
	cookieStore.delete("publicAccessToken");
}

// Generate a public access token for listing runs
export async function generateListPublicAccessToken() {
	return auth.createPublicToken({
		scopes: {
			read: {
				tasks: ["story-chain-task"],
			},
		},
		expirationTime: "15m",
	});
}

// Generate a task token for creating tasks
export async function generateTaskToken() {
	try {
		console.log("Auth: Generating task token with scopes:", [
			"story-chain-task",
		]);
		const token = await auth.createTriggerPublicToken(["story-chain-task"], {
			expirationTime: "1h",
			multipleUse: true,
		});
		console.log("Auth: Task token generated successfully");
		return token;
	} catch (error) {
		console.error("Auth: Error generating task token:", error);
		throw error;
	}
}
