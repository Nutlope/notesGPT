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
- [Together Inference](https://togetherai.link) for the LLM (Mixtral)
- [Together Embeddings](https://togetherai.link) for the embeddings for search
- [Convex File Storage](https://docs.convex.dev/file-storage) for storing voice notes
- [Convex Vector search](https://docs.convex.dev/vector-search) for vector search
- [Replicate](https://replicate.com/) for Whisper transcriptions
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
5. Make a [Together](https://togetherai.link) account to get your [API key](https://api.together.xyz/settings/api-keys).
6. Make a [Replicate](https://replicate.com) account to get your [API key](https://replicate.com/account/api-tokens).
7. Save your environment variables in Convex [as `REPLICATE_API_KEY` and `TOGETHER_API_KEY`](https://dashboard.convex.dev/deployment/settings/environment-variables?var=REPLICATE_API_KEY&var=TOGETHER_API_KEY).

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
