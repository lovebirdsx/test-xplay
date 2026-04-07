import Anthropic from "@anthropic-ai/sdk";

export async function simpleQuery() {
    const client = new Anthropic({
        baseURL: process.env.CLAUDE_BASE_URL,
        apiKey: process.env.CLAUDE_API_KEY,
    });

    const res = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [
            {role: 'user', content: '请用3句话解释什么是RAG'}
        ],
    });

    const text = res.content.filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('');

    console.log('Response from Anthropic API:');
    console.log(text);
}
