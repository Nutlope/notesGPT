<a href="https://usenotesgpt.com/">
  <img alt="NotesGPT – AI-powered voice note taking in seconds." src="/public/images/og-image.png">
  <h1 align="center">notesGPT</h1>
</a>

<p align="center">
  Generate action items from your notes in seconds. Powered by Convex, Together.ai, and Whisper.
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#future-tasks"><strong>Future Tasks</strong></a>
</p>
<br/>

## Tech Stack

- [Convex](https://convex.dev/) for the database and cloud functions
- Next.js [App Router](https://nextjs.org/docs/app) for the framework
- [Together Inference](https://togetherai.link/?utm_source=notesGPT&utm_medium=referral&utm_campaign=example-app) for the LLM (Mixtral) and for Whisper transcriptions
- [Together Embeddings](https://togetherai.link/?utm_source=notesGPT&utm_medium=referral&utm_campaign=example-app) for the embeddings for search
- [Convex File Storage](https://docs.convex.dev/file-storage) for storing voice notes
- [Convex Vector search](https://docs.convex.dev/vector-search) for vector search
- [Clerk](https://clerk.dev/) for user authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Deploy Your Own

You can deploy this template by setting up the following services and adding their environment variables:

1. Run `npm install` to install dependencies.
2. Run `npm run dev`. It will prompt you to log into [Convex](https://convex.dev) and create a project.
3. It will then ask you to supply the `CLERK_ISSUER_URL`. To do this:
   1. Make a [Clerk](https://clerk.dev) account.
   2. Copy both the `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` [API keys](https://dashboard.clerk.com/last-active?path=api-keys) into `.env.local`.
   3. Do steps 1-3 [here](https://docs.convex.dev/auth/clerk) and copy the Issuer URL.
      It should look something like `https://some-animal-123.clerk.accounts.dev`.
   4. Add `CLERK_ISSUER_URL` to your [Convex Environment Variables](https://dashboard.convex.dev/deployment/settings/environment-variables?var=CLERK_ISSUER_URL)
      (deep link also available in your terminal). Paste the Issuer URL as the value and click "Save".
4. Now your frontend and backend should be running and you should be able to log in but not record.
5. Make a [Together](https://togetherai.link/?utm_source=notesGPT&utm_medium=referral&utm_campaign=example-app) account to get your [API key](https://api.together.xyz/settings/api-keys).
6. Save your environment variables in Convex [`TOGETHER_API_KEY`](https://dashboard.convex.dev/deployment/settings/environment-variables?var=TOGETHER_API_KEY).

## Using a different LLM provider (LiteLLM / OpenAI-compatible gateway)

notesGPT talks to Together AI over the OpenAI wire format, so you can point the
chat + embedding calls at any OpenAI-compatible endpoint - including a
[LiteLLM](https://docs.litellm.ai/docs/simple_proxy) proxy, which lets you route
to 100+ providers (OpenAI, Anthropic, Azure, Bedrock, Gemini, ...) behind a
single URL. Together AI stays the default; these variables are all optional:

| Variable              | Default                                   | Description                                                                                                                         |
| --------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `LLM_BASE_URL`        | `https://api.together.xyz/v1`             | OpenAI-compatible base URL (e.g. your LiteLLM proxy)                                                                                |
| `LLM_API_KEY`         | falls back to `TOGETHER_API_KEY`          | API key / LiteLLM virtual key for the endpoint                                                                                      |
| `LLM_CHAT_MODEL`      | `Qwen/Qwen2.5-7B-Instruct-Turbo`          | Model used for title/summary/action-item extraction                                                                                 |
| `LLM_EMBEDDING_MODEL` | `intfloat/multilingual-e5-large-instruct` | Model used for search embeddings                                                                                                    |
| `LLM_INSTRUCTOR_MODE` | `JSON_SCHEMA`                             | How Instructor coerces structured JSON. Together supports `JSON_SCHEMA`; for OpenAI/Azure/Anthropic/etc. behind a proxy use `TOOLS` |

> Note: Together AI's native `JSON_SCHEMA` mode sends a `response_format.schema`
> field that other providers reject. When you point `LLM_BASE_URL` at a LiteLLM
> proxy fronting OpenAI, Azure, Anthropic, etc., set `LLM_INSTRUCTOR_MODE=TOOLS`
> so structured extraction goes through cross-provider tool calling.

Example - run a LiteLLM proxy that fronts OpenAI + Anthropic, then set
`LLM_BASE_URL=http://localhost:4000`, `LLM_API_KEY=sk-litellm-...`, and pick the
model aliases you configured:

```yaml
# litellm.config.yaml
model_list:
  - model_name: chat
    litellm_params:
      model: openai/gpt-4o-mini
      api_key: os.environ/OPENAI_API_KEY
  - model_name: embed
    litellm_params:
      model: openai/text-embedding-3-small
      api_key: os.environ/OPENAI_API_KEY
```

```bash
pip install "litellm[proxy]"
litellm --config litellm.config.yaml   # serves an OpenAI-compatible API on :4000
```

Then set `LLM_CHAT_MODEL=chat` and `LLM_EMBEDDING_MODEL=embed`. Transcription
still uses Together's Whisper endpoint (`TOGETHER_API_KEY`).

## Future tasks:

- [ ] Keep recording for future playback and display it on the page somewhere
- [ ] Animate the purple microphone to be in sync with your voice
- [ ] Store completed action items for the future instead of fully deleting them
- [ ] Make text/images in the landing page smaller to account for multiple screen sizes.
- [ ] Make the search experience a little smoother overall by searching automatically on entering text
- [ ] Be able to have this as a PWA if there's an easy step to do that
- [ ] Prompt engineer the summary a little more to be more useful than what's currently displaying
- [ ] Add a Notion integration to be able to get the transcript + summary + action items on there
- [ ] UI updates to make it look a little nicer based on Youssef's redesign
- [ ] Be able to edit action items after the fact and set a due date for them
- [ ] Account for layout shift on the dashboard page when refreshing – show a loading state on content?
- [ ] Make action items animate out + make checkbox rounded + add a little check icon on hover
- [ ] Migrate to incredibly fast whisper
