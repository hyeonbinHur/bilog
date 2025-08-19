import { handleError } from "@/src/helper/apiUtils";
import { claudeConfig, createClaudeClient } from "@/src/lib/claudeAIConfig";
import { NextRequest, NextResponse } from "next/server";

const anthropic = createClaudeClient();

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const msg = await anthropic.messages.create({
      model: claudeConfig.model,
      max_tokens: claudeConfig.maxTokens,
      system: claudeConfig.systemPrompt,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({ response: msg });
  } catch (error) {
    return handleError(error);
  }
}
