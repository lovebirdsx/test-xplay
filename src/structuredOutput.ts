import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import { z } from "zod";

const ArticleSummarySchema = z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
})

export async function structuredOutput() {
    const client = new Anthropic({
        baseURL: process.env.CLAUDE_BASE_URL,
        apiKey: process.env.CLAUDE_API_KEY,
    });

    const res = await client.messages.parse({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [
            {
                role: 'user',
                content: '用三句话介绍claude code',
            }
        ],
        output_config: {
            format: zodOutputFormat(ArticleSummarySchema),
        }
    });

    console.log('Structured response from Anthropic API:');
    console.log(res.parsed_output);
}
