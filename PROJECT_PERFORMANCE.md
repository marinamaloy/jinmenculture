# IP and Ghost performance changes — 13 November 2026

Scope: ip.html, en/ip.html, ghost.html, en/ghost.html. Original image masters, business copy, project status, financial examples, contact behavior, metadata and tracking setup retained.

- Same four font families; Noto subsets isolated by page, language and family. Public DOM and fixed UI only. Nonblocking font CSS with swap and noscript fallback. See FONT_SUBSETS.md.
- Ghost Bilibili iframe is absent initially. A keyboard-operable poster button creates the same player only after activation. Direct Bilibili link remains available with or without JavaScript. The prior audit transferred 3,392,460 video bytes; the new facade does not load that player before activation.
- Lossless transparent Ghost logo: 900x485 PNG 314802 bytes -> 240x129 WebP 33284 bytes. Original retained.
- IP hero: 189906 -> 111834 bytes, same 1537x1023 dimensions; Ghost project card: 77112 -> 66976; It Is Watching: 257582 -> 137498; FOUR404: 117122 -> 88394. New files in images/optimized; originals retained. Trailer poster derived from existing stage photograph, 81792 bytes.
- Footer QR retains original source/quality, 811x803 dimensions; native lazy loading and async decoding.
- Main landmarks, sequential feature/team/footer headings, visible phone text included in accessible labels, readable warm-neutral brand/source labels, undistorted brand logo, empty alt on decorative Ghost backdrop. CSS edits scoped to these pages. Feature/team typography selectors follow their new heading levels.

Validation: static metadata/JSON-LD comparison unchanged, one main and H1 on each page; no iframe markup on either Ghost page; eight Noto subsets derived from real DOM; six asset blobs uploaded. Responsive preview and live checks recorded after execution.
