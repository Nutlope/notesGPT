<a href="https://usenotesgpt.com/">
  <img alt="NotesGPT – AI-powered voice note taking in seconds." src="/public/images/og-image.png">
  <h1 align="center">notesGPT</h1>
</a>

<p align="center">
  Generate action items from your notes in seconds. Powered by Convex, Together.ai, and Replicate.
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
- [Together Inference](https://www.together.ai/) for the LLM (Mixtral)
- [Together Embeddings](https://www.together.ai/) for the embeddings for search
- [Convex File Storage](https://docs.convex.dev/file-storage) for storing voice notes
- [Convex Vector search](https://docs.convex.dev/vector-search) for vector search
- [Replicate](https://replicate.com/) for Whisper transcriptions
- [Clerk](https://clerk.dev/) for user authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Deploy Your Own

You can deploy this template by setting up the following services and adding their environment variables:

- Set up [Convex](https://convex.dev)
- Set up [Together](https://www.together.ai/)
- Set up [Replicate](https://replicate.com)
- Set up [Clerk](https://clerk.dev)

See the .example.env for a list of all the required environment variables.

## Current tasks - v1

- [x] Buy a domain and setup Clerk production environment
- [x] Troubleshoot why Clerk isn't working properly anymore
- [x] Migrate from GPT-4 to Mixtral on Together with JSON mode
- [x] Migrate from OpenAI embeddings to Together AI embeddings
- [ ] Merge Jaime's PR and make sure auth is working
- [ ] Verify that you can easily clone the repo and everything works smoothly, add tracking links as well – need to add instructions to set env vars on Convex as well?
- [ ] Finalize the blog post to be sent in my newsletter
- [ ] Launch on Twitter on Monday

## Future tasks

- [ ] Whisper transcripts can get queued on Replicate. If that happens, show a message to the user
- [ ] Make text/images in the landing page smaller to account for multiple screen sizes
- [ ] Prompt engineer the summary a little more to be more useful than what's currently displaying
- [ ] Add a Notion integration to be able to get the transcript + summary + action items on there
- [ ] UI updates to make it look a little nicer based on Youssef's redesign
- [ ] Be able to edit action items after the fact and set a due date for them
- [ ] Account for layout shift on the dashboard page when refreshing – show a loading state on profile pic + content?
- [ ] Make action items animate out + make checkbox rounded + add a little check icon on hover
