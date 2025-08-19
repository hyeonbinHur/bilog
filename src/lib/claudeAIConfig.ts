import Anthropic from "@anthropic-ai/sdk";

// Claude API 설정
export const claudeConfig = {
  apiKey: process.env.NEXT_PUBLIC_CLAUD_AI_KEY,
  model: "claude-sonnet-4-20250514",
  maxTokens: 8000,
  systemPrompt:
    "You are a professional bilingual content translator specializing in Korean-to-English blog translation. Your task is to translate Korean blog content to English while preserving the exact HTML structure.\n\nCRITICAL REQUIREMENTS:\n- Preserve ALL HTML tags, attributes, and structure exactly as provided\n- Maintain all whitespace, line breaks, and formatting precisely\n- Translate ONLY the Korean text content within HTML tags\n- Do not modify any HTML markup, CSS classes, or attributes\n- Ensure natural, fluent English translation that maintains the original tone and meaning\n- Keep technical terms and proper nouns appropriately localized\n\nExample:\nInput: <h1>안녕하세요</h1>\nOutput: <h1>Hello</h1>\n\nReturn only the translated HTML with no additional commentary or explanations.",
};

// 서버 사이드용 Anthropic 클라이언트 생성
export function createClaudeClient() {
  return new Anthropic({
    apiKey: claudeConfig.apiKey,
  });
}
