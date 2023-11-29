# JournalGPT

Your AI journal take notes on the go with your voice and translate them into action items.

# TODOs

## v0.5

- [x] Add recording audio on the frontend
- [x] Record mp3 on the frontend and save it to ByteScale
- [x] Add whisper v3 endpoint through Fal that will take an mp3 and return the transcript
- [ ] Switch from ByteScale to Convex File storage
- [ ] Display the transcript in the frontend
- [ ] Add GPT-4 Turbo call to format notes into bullet points + add action items

## v1

- [ ] Add auth with Clerk through Convex
- [ ] Add Convex DB to store recording info of users
- [ ] Implement frontend: Main recording page

## v1.5

- [ ] Switch to Replicate for whisper endpoint (https://replicate.com/vaibhavs10/incredibly-fast-whisper)
- [ ] Implement frontend: dashboard
- [ ] Implement frontend: todo list
- [ ] Make sure the transcript gets streamed into the frontend
- [ ] Add Convex vector search for searching

## v2 (stretch)

- [ ] Email reminders through Resend powered by Convex cron jobs
- [ ] Convex scheduled functions to send initial email to user that says "welcome"
- [ ] Add a mind map visualization?
