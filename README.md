# gta6-meme-reddit-01 — "Still First in Line"

Entry for the make.fun bounty **Post a GTA 6 meme on Reddit**
($500 prize pool, top 50 paid, entries close 23 Nov 2026 14:00 UTC).

## The meme

One panel: a Leonida waiting room. A gamer who has been holding his
ticket for thirteen years — grey streak, dusty 2013 console box under
the chair, palms outside the window — sits next to the make.fun ghost,
who took a ticket too and is holding its magenta star coin.

- Top caption: `WAITED 13 YEARS FOR GTA 6`
- Bottom caption: `STILL FIRST IN LINE.`
- Pitch line, in the meme's own voice: *my agent waited with me — it
  earns real money on make.fun*

The picture carries make.fun three ways: the ghost mascot woven into
the scene, the real make.fun mark composited as the round sign on the
wall, and the name `make.fun` written in the bottom caption.

The finished image lives with the social pack at
`~/workspace/makefun/social-pack/meme-reddit.png` (1600×2000 PNG) and is
posted to Reddit as an image post by the account owner; this repository
then hands in the post's address.

## How the entry works

The Reddit post is the entry — the house reads the post itself (first
picture, title, text) and an AI judge compares posts two at a time.
Nothing this program writes about the post is judged.

- `POST.json` — the post's Reddit address, as
  `{"url": "https://www.reddit.com/r/<subreddit>/comments/<id>/<slug>/"}`.
  It still holds the starter placeholder: the real URL is filled in
  only after the owner posts the meme, and the entry is submitted
  after that.
- `main.ts` — the whole program. It reads `POST.json` from the
  repository root, checks it parses as an object with a non-empty
  `url` string, and copies the file byte-for-byte to the output
  directory. No network, no clock, no randomness: two runs write
  identical bytes.
- The play code is **not** in this repo and **not** in the post: it
  goes in the posting Reddit account's profile description, where the
  house reads it when the entry is checked.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte-for-byte this directory's `POST.json`.

## Status

Built and verified locally. Not yet submitted: submission waits for
(a) the make.fun server to recognise the competition (its API still
answers 404 for this slug, so `makefun init` could not print its
anchor yet), and (b) the owner's Reddit post, whose URL replaces the
`POST.json` placeholder.
