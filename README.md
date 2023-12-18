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
- [x] Move action items to their own table in the schema
- [x] Finalize the action items page while fetching from DB
- [x] Make action items work when you click them they should be deleted
- [x] Deploy to Vercel and make sure it works well
- [x] Add profile picture to the top right
- [x] Add the right links to homepage
- [x] Implement the dashboard fetching all notes + ability to delete notes

## v2 - polish & UX

- [x] Add OG image and any neccesary OG data
- [x] Add dropdown to profile header where folks can sign in and sign out
- [x] Add technologies used in the footer
- [x] Cleanup code, double check each screen, verify it looks good on desktop + mobile
  - [x] Homepage
  - [x] Dashboard
  - [x] Record
  - [x] Action Items
  - [x] Recording
- [x] Fix mobile action items to look well
- [x] Action items: Make it so that folks can only mark tasks done through the checkbox + add a toast to make it more obvious that a task has been marked done
- [x] Add loading state to the recording page, transcript
- [x] Make sure you can cross out action items from the recording screen as well
- [x] Make sure all images are used and delete the ones that aren't from the repo
- [x] Uninstall unused dependencies
- [x] Account for large transcript by simply having a scroll button
- [x] Test whole site on a smaller desktop and make sure it works well
- [x] Test whole site on my actual phone and make sure it works well

## Future potential tasks

- [ ] Add Convex vector search for searching through transcripts
- [ ] Layout shift on the dashboard page when refreshing – show a loading state on profile pic + content?
- [ ] Make action items animate out + make checkbox rounded + add a little check icon on hover
- [ ] Could do a better job of setting up breakpoints for 14inch macs, decrease text size a bit
- [ ] Convex scheduled functions to send initial email to user that says "welcome"
- [ ] Add a "how it works" section to the landing page to show how to use it
- [ ] Prompt engineer the summary a little more to be more useful
- [ ] Add a due date for the action items + make this editable
- [ ] Make sure the transcript gets streamed into the frontend
