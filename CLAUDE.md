# The Customer Lens

Static site. Plain HTML, no build step, no framework. Netlify deploys from `main`.

## Live site

**https://thecustomerlens.com**

An article published at `articles/<slug>.html` is live at
`https://thecustomerlens.com/articles/<slug>.html`.

## Linking rule

**Always link to the live website URL.** Whenever an article is referenced anywhere
outside this repo — a Todoist task, a calendar entry, an email, a message, a summary —
use the `https://thecustomerlens.com/...` URL.

For a live article, never hand over a GitHub link, a raw file path, or a `file://` path
as the way to read it.

If the article is not merged to `main` yet, it is not live. Say so, and link the file on
its branch on GitHub instead:
`https://github.com/fabio-dot-ai/thecustomerlens/blob/<branch>/articles/<slug>.html`

## Layout

- `index.html` — article cards. Cards sort themselves by the date in `.blog-meta`,
  so a new card can go anywhere in the source; put it at the top.
- `articles/<slug>.html` — one self-contained file per article, CSS inlined in `<head>`.
  Copy the most recent article as the template.
- `images/<slug>.jpg` — one hero per article, JPG, roughly 2:1.

## Conventions

- Read time in `.article-meta` and on the index card, at ~210 words per minute.
- A series article carries `Agentic AI — Part N` in `.article-meta` and ends with a
  `.back-link` pointing at the next part.
- When a new part ships, update the previous part's `.back-link` to point at it.
- Name the actor every time. In customer service "agent" and "supervisor" are human job
  titles, so an AI is always "AI agent", "AI supervisor", "AI model" or "the AI", and a
  human is "human", "human agent" or a named role such as "human exception owner".
  Never a bare "agent" or "supervisor".

## Netlify

`netlify.toml` scopes the `Content-Type` header to `/*.html`. Do not widen it back to
`/*`: that overrides the type on every asset and breaks anything the browser does not
byte-sniff (SVG, CSS, fonts, JSON, XML).
