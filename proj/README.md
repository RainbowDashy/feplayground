# About

This is a simple tieba, built with next.js.

# How to use

To run this app,

First setup your mongoDB.

Create `.env.local`and set environment variables as shown in `.env.local.example`.

Create the following collections:`post`, `posts`, `reply_cnt`

Insert `{_id: 0, reply_cnt: 0}` in `reply_cnt`

Then, run the following commands

``` bash
npm i
npm run build
npm run start
```

We're all done.

# Online demo

An online demo can be found [here](https://simple-tieba.vercel.app)

