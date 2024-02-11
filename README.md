<a href="https://notesgpt.vercel.app/">
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
- [Convex File Storage](https://vercel.com/storage/blob) for storing voice notes
- [Convex Vector search](https://vercel.com/storage/blob) for vector search
- [Replicate](https://replicate.com/) for Whisper transcriptions
- [Clerk](https://clerk.dev/) for user authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Deploy Your Own

You can deploy this template to any provider such as Vercel, Netlify, Render, or Railway by setting up the following services and adding their environment variables:

- Set up [Convex](https://convex.dev)
- Set up [Together](https://www.together.ai/)
- Set up [Replicate](https://replicate.com)
- Set up [Clerk](https://clerk.dev)

See the .example.env for a list of all the required environment variables.

## Current tasks - v1

- [ ] Review Jaime's improvements and merge them
- [ ] Migrate from GPT-4 to Mixtral on Together
- [ ] Migrate from OpenAI embeddings to Together AI embeddings
- [ ] Buy a domain and setup Clerk production environment
- [ ] Finalize the blog post to be sent in my newsletter
- [ ] Verify that you can easily clone the repo and everything works smoothly, add tracking links as well

## Future tasks

- [ ] Prompt engineer the summary a little more to be more useful
- [ ] Nice to have: UI updates to make it look nicer
- [ ] Be able to edit action items
- [ ] Add a Notion integration
- [ ] Layout shift on the dashboard page when refreshing – show a loading state on profile pic + content?
- [ ] Make action items animate out + make checkbox rounded + add a little check icon on hover
- [ ] Could do a better job of setting up breakpoints for 14inch macs, decrease text size a bit
- [ ] Convex scheduled functions to send initial email to user that says "welcome"
- [ ] Add a "how it works" section to the landing page to show how to use it
- [ ] Add a due date for the action items + make this editable
