import Anthropic from "@anthropic-ai/sdk";

export async function countTokens() {
    const client = new Anthropic({
        baseURL: process.env.CLAUDE_BASE_URL,
        apiKey: process.env.CLAUDE_API_KEY,
    });

    const text = 'Hello, how are you doing today?';
    const count = await client.messages.countTokens({
        model: 'claude-haiku-4-5',
        messages: [
            { role: 'user', content: text }
        ],
    });
    console.log(`Input text: "${text}"`);
    console.log(`Token count: ${count.input_tokens}`);
}
