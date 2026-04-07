import Anthropic from "@anthropic-ai/sdk";

async function getWeather(city: string) {
    return `Weather in ${city}: 28°C, sunny.`;
}

export async function useTool() {
    const client = new Anthropic({
        baseURL: process.env.CLAUDE_BASE_URL,
        apiKey: process.env.CLAUDE_API_KEY,
    });

    const messages: Anthropic.MessageParam[] = [
        {
            role: 'user',
            content: 'What is the weather like in New York? Tell me whether I should bring an umbrella.'
        }
    ];

    const tools: Anthropic.ToolUnion[] = [
        {
            name: 'getWeather',
            description: 'Get the current weather for a city.',
            input_schema: {
                type: 'object',
                properties: {
                    city: { type: 'string' }
                },
                required: ['city']
            }
        }
    ];

    const first = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages,
        tools,
    });

    messages.push({
        role: 'assistant',
        content: first.content,
    });

    if (first.stop_reason === 'tool_use') {
        for (const block of first.content) {
            if (block.type === 'tool_use' && block.name === 'getWeather') {
                const result = await getWeather((block.input as { city: string }).city);
                messages.push({
                    role: 'user',
                    content: [
                        {
                            type: 'tool_result',
                            tool_use_id: block.id,
                            content: result,
                        }
                    ]
                });
            }
        }
    }

    const second = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages,
        tools,
    });

    console.log('Final assistant response:');
    console.log(second.content.filter(x => x.type === 'text').map(x => x.text).join(''));
}
