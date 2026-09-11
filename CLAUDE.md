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

Never hand over a GitHub blob link, a raw file path, or a `file://` path as the way to
read an article. Those are for editing, not reading. If the article is not merged to
`main` yet, say that it is not live yet rather than substituting a source link.

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

## Netlify

`netlify.toml` scopes the `Content-Type` header to `/*.html`. Do not widen it back to
`/*`: that overrides the type on every asset and breaks anything the browser does not
byte-sniff (SVG, CSS, fonts, JSON, XML).
