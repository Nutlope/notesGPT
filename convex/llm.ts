import OpenAI from 'openai';

// Central LLM provider configuration.
//
// By default notesGPT talks to Together AI, but every value below can be
// overridden through environment variables. Because the client speaks the
// OpenAI wire format, pointing `LLM_BASE_URL` at a LiteLLM proxy (or any other
// OpenAI-compatible gateway) lets you route the chat + embedding calls through
// 100+ providers (OpenAI, Anthropic, Azure, Bedrock, Gemini, ...) without
// touching application code. See https://docs.litellm.ai/docs/simple_proxy.
//
// Together AI stays the default, so existing deployments keep working with only
// `TOGETHER_API_KEY` set.

export const llmBaseURL =
  process.env.LLM_BASE_URL ?? 'https://api.together.xyz/v1';

export const llmApiKey =
  process.env.LLM_API_KEY ?? process.env.TOGETHER_API_KEY ?? 'undefined';

export const chatModel =
  process.env.LLM_CHAT_MODEL ?? 'Qwen/Qwen2.5-7B-Instruct-Turbo';

export const embeddingModel =
  process.env.LLM_EMBEDDING_MODEL ?? 'intfloat/multilingual-e5-large-instruct';

// Structured-output strategy Instructor uses to coerce JSON out of the model.
// Together AI supports its native `JSON_SCHEMA` mode (the default), but most
// other providers reached through a LiteLLM proxy (OpenAI, Azure, Anthropic,
// ...) reject Together's `response_format.schema` field. For those, set
// `LLM_INSTRUCTOR_MODE=TOOLS`, which drives structured output through
// cross-provider tool/function calling. Valid values: FUNCTIONS, TOOLS, JSON,
// MD_JSON, JSON_SCHEMA.
export type InstructorMode =
  'FUNCTIONS' | 'TOOLS' | 'JSON' | 'MD_JSON' | 'JSON_SCHEMA';

export const instructorMode = (process.env.LLM_INSTRUCTOR_MODE ??
  'JSON_SCHEMA') as InstructorMode;

// OpenAI-compatible client aimed at the configured provider (Together AI by
// default, a LiteLLM proxy when `LLM_BASE_URL` is set).
export function createLLMClient() {
  return new OpenAI({
    apiKey: llmApiKey,
    baseURL: llmBaseURL,
  });
}
