import Replicate from "replicate";

const replicate = new Replicate({
	auth: "***REMOVED***",
});

var input = {
	top_k: 0,
	top_p: 0.95,
	prompt: "",
	max_tokens: 512,
	temperature: 0.7,
	length_penalty: 1,
	max_new_tokens: 512,
	stop_sequences: "<|end_of_text|>,<|eot_id|>",
	prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYes or no. Does the following contain reference to politics or religion.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
	presence_penalty: 0,
	log_performance_metrics: false
};

export async function isTweetPolitical (tweetText) {
	input.prompt = tweetText
	for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
		let result;
		result = event.toString().trim().replace(/[^a-zA-Z ]/g, "");
		// console.log("Tweet text", tweetText, "is", result)
		return result.toUpperCase().includes("YES");
	}
}

