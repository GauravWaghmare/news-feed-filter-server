import { Router } from 'itty-router';
import { isTweetPolitical } from './replicate_client';

// Create a new router
const router = Router();

// Handle preflight OPTIONS request
router.options('*', () => {
	const headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return new Response(null, { headers });
});

// Helper function to add CORS headers to a response
const addCorsHeaders = (response) => {
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return response;
};

/*
Endpoint to proxy to replicate
 */
router.post('/classify', async request => {
	// Create a base object with some fields.
	try {
		const { tweetText } = await request.json()

		if (!tweetText) {
			let response = new Response(JSON.stringify({ error: 'Missing tweetText' }), { status: 400 })
			return addCorsHeaders(response)
		}

		// Handle the tweetText (e.g., call your isTweetPolitical function)
		// For now, just return the tweetText in the response
		const isPolitical = await isTweetPolitical(tweetText)
		let response = new Response(JSON.stringify({ tweetText, isPolitical }), { status: 200 })
		return addCorsHeaders(response)
	} catch (error) {
		let response = new Response(JSON.stringify({ error: error.message }), { status: 500 })
		return addCorsHeaders(response)
	}
})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};
