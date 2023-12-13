# NotesGPT

Your AI journal take notes on the go with your voice and translate them into action items.

# TODOs

## v0.5 - basics

- [x] Add recording audio on the frontend
- [x] Record mp3 on the frontend and save it to ByteScale
- [x] Add whisper v3 endpoint through Fal that will take an mp3 and return the transcript
- [x] Switch from ByteScale to Convex File storage
- [x] Working version of recording audio, uploading it to Convex, and returning the transcript

## v0.7 - frontend

- [x] Implement frontend: dashboard
- [x] Implement frontend: todo list
- [x] Implement frontend: Main recording page
- [x] Implement frontend: Landing Page
- [x] Clean up code

## v1 - backend + polish

- [x] Display the transcript in the frontend
- [x] Switch to Replicate for whisper endpoint (https://replicate.com/vaibhavs10/incredibly-fast-whisper)
- [x] Add GPT-4 Turbo call to format notes into bullet points + add action items
- [x] Add auth with Clerk through Convex
- [x] Troubleshoot auth not working
- [x] Integrate frontend + backend
- [x] Edit styles on the dashboard page to make sense

## v1.5 - the convex way

- [x] Move the OpenAI and Replicate call to Convex actions
- [x] Add Convex DB to store transcripts + user action items
- [x] Change frontend to use the Convex functions and state and not the API endpoints
- [x] Navigate to new route with the note ID when it's created
- [x] Finalize the quick-check page while fetching from the DB
- [x] Keep going over dyanmic route starting line 134 to cleanup then move mobile and desktop into separate components
- [ ] Finalize the action items page while fetching from DB
- [ ] Make action items work when you click them they should be deleted and animate out
  - [ ] Also move action items to their own table in the schema
- [ ] Add dropdown to profile header where folks can sign in and sign out.
- [ ] Implement the dashboard deleting notes

## v1.7 - cleanup

- [ ] Add architecture diagram to the README
- [ ] Add how it works section to landing page and decrease font for everything
- [ ] Add appropriate loading and error states
- [ ] Make sure it works well on mobile + desktop
- [ ] Add Convex vector search for searching

## v2 (stretch)

- [ ] Make the due date on the tasks editable
- [ ] Make sure the transcript gets streamed into the frontend
- [ ] Email reminders through Resend powered by Convex cron jobs
- [ ] Convex scheduled functions to send initial email to user that says "welcome"
- [ ] Add a mind map visualization?
