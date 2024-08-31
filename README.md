# Text Category Classifier API using Cloudflare Workers and LLM

This project implements an HTTP API endpoint hosted on Cloudflare Workers that uses a Large Language Model (LLM) to determine if a given piece of text belongs to a specific category. The LLM inference is powered by Replicate.com.

## Features

- Hosted on Cloudflare Workers for scalability and low-latency
- Uses `itty-router` for efficient request routing
- Integrates with Replicate.com for LLM-based text classification
- Provides a simple API endpoint for text category checking

## Usage

1. Clone this repository or use it as a template for your Cloudflare Worker project.

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up your Replicate API token as an environment variable:
   ```sh
   export REPLICATE_API_TOKEN=your_api_token_here
   ```
   You can also add this to your `.env` file or set it in your Cloudflare Workers dashboard.

4. Update the `wrangler.toml` file with your Cloudflare account ID and other necessary configuration.

5. Test your worker locally:
   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Deploy your worker to Cloudflare:
   ```sh
   npm run deploy
   # or
   yarn deploy
   # or
   pnpm deploy
   ```

## API Endpoint

The main API endpoint is:

`POST /v2/classify`

Request body:

```
{
    "tweetText": "A quick brown fox jumps over the lazy dog.",
    "selectedOptions": ["kids", "adult", "wildlife"]
}
```


