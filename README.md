![alt text](https://media.giphy.com/media/03i0CuQE4z1gXCkCCC/giphy.gif)

We submitted this project to SFHacks.

Devpost: https://devpost.com/software/work-space

Live website: http://amazingwork.space

Pitch demo: (coming soon)

Remote working conditions have become commonplace in today’s workplace. And with this kind of shift, it is more urgent than ever for organizations to leverage the best online collaboration tools to keep their teams productive and on the same page at all times. However, online collaboration has its own drawbacks, to jump in and out for endless tabs in your browser with different apps installed is tiring, we called it "Lost in the cloud".

## What it does

![alt text](https://i.imgur.com/0aFxpCM.jpg)

**Work.space** is a one-stop solution for that hassle. We simulate the real world's workspace and allow you to become more productive by providing you with all the necessary tools needed. We believe that collaboration and transparency are two key components of the modern workplace experience. That's why we built Work.space, this could be an alternative to making virtual spaces more interactive, effective, and at the same time more accessible for everyone of all ages.


## Key Features

Core features:
- Collaboration room for you and your group
- Collaborative whiteboarding - ideate in real-time
- Collaborative browser - real-time browsing with your groups
- Collaborative notes - real-time writing in notes with your groups
- Live Chat - obviously, to chat with each other
- Video and Audio Chat - for synchronous communication within your groups

Others:
- Online Presence Indicators for your group
- User Accounts with OAuth
- Secure Authentication - Through MFA with Mobile
- Pomodoro Timer - to remind you when to take breaks and when to come back
- Room timer - so you know whether you're being productive or not

## How we built it
- NextJS, React Frontend
- NodeJS, Express Backend
- Socket.IO for all our collab features, online presence, sharing, and carrying webrtc signal payloads
- WebRTC for Video and Audio calls
- Notivize for reminders and for our OTP Auth to signup your phone number
- Firebase for our authentication
- Firestore for our chat and user accounts

## Challenges we ran into
- CORS, We hate it and it hates us so it makes development hard
- Websockets + React, Re-render can cause client reconnect spam
- WebRTC, Brokering can be unreliable
- Google App Engine, Sometimes it takes forever to deploy

## Accomplishments that we're proud of
- To ship this fully functional product within a short amount of time is a big accomplishment for us. Hopefully, we can also use this platform for our future meetings. We really want a central collaborative space for everyone :)

## What we learned
- Learned a lot with websockets and WebRTC
- First time trying Google App Engine

## What's next for Work.space
- Fix and polish up the rest of it
