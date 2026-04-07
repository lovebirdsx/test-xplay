import Anthropic from "@anthropic-ai/sdk";

export async function streamQuery() {
    const client = new Anthropic({
        baseURL: process.env.CLAUDE_BASE_URL,
        apiKey: process.env.CLAUDE_API_KEY,
    });

    const res = client.messages.stream({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [
            {role: 'user', content: '请用3句话解释什么是RAG'}
        ],
    });

    console.log('Streaming response from Anthropic API:');

    for await (const chunk of res) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            process.stdout.write(chunk.delta.text);
        }
    }

    const finalMessage = await res.finalMessage();
    console.log('\n\n stop reason:', finalMessage.stop_reason);
}
