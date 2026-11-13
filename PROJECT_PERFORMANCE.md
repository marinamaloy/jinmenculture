# IP and Ghost performance changes — 13 November 2026

Scope: ip.html, en/ip.html, ghost.html, en/ghost.html. Original image masters, business copy, project status, financial examples, contact behavior, metadata and tracking setup retained.

- Same four font families; Noto subsets isolated by page, language and family. Public DOM and fixed UI only. Nonblocking font CSS with swap and noscript fallback. See FONT_SUBSETS.md.
- Ghost Bilibili iframe is absent initially. A keyboard-operable poster button creates the same player only after activation. Direct Bilibili link remains available with or without JavaScript. The prior audit transferred 3,392,460 video bytes; the new facade does not load that player before activation.
- Lossless transparent Ghost logo: 900x485 PNG 314802 bytes -> 240x129 WebP 33284 bytes. Original retained.
- IP hero: 189906 -> 111834 bytes, same 1537x1023 dimensions; Ghost project card: 77112 -> 66976; It Is Watching: 257582 -> 137498; FOUR404: 117122 -> 88394. New files in images/optimized; originals retained. Trailer poster derived from existing stage photograph, 81792 bytes.
- Footer QR retains original source/quality, 811x803 dimensions; native lazy loading and async decoding.
- Main landmarks, sequential feature/team/footer headings, visible phone text included in accessible labels, readable warm-neutral brand/source labels, undistorted brand logo, empty alt on decorative Ghost backdrop. CSS edits scoped to these pages. Feature/team typography selectors follow their new heading levels.

Validation: static metadata/JSON-LD comparison unchanged, one main and H1 on each page; no iframe markup on either Ghost page; eight Noto subsets derived from real DOM; six asset blobs uploaded. Responsive preview and live checks recorded after execution.

## Completed preview checks
Chrome at 375, 768 and 1440 CSS pixels, all four routes (12 combinations): no horizontal overflow, one main/H1, loaded hero/logo assets, warm brand contrast, semantic heading sequences. First screens, IP cards, Ghost poster and responsive layouts visually inspected. The test restores device metrics after screenshots because this Chrome build resets emulation.

axe-core 4.10.3 WCAG 2 A/AA and 2.1 AA: zero reported violations on all four pages (22–23 passing rules); image/background contrast requires manual review, so this is not a full accessibility certification. Phone names contain visible labels. Footer QR absent from initial resource requests, then loaded at the footer at its original 811x803 dimensions on all routes. The test connection required extended waits for that original 237KB JPEG.

Both Ghost routes: no iframe or Bilibili/hdslb/bilivideo requests initially, including after scrolling the page. Native Enter activation creates exactly one iframe with the original BV1kXcczfE48 player URL and moves focus to it. Poster disappears; direct Bilibili fallback remains. This checks player loading/keyboard behavior, not third-party video availability in every region.

HTML public-text normalization: unchanged except the new play/fallback labels. Metadata, canonical/hreflang and JSON-LD identical. Analytics blocked during browser QA; forms not submitted. Noto modern-mobile file sums: IP CN 185188 bytes, EN 38420; Ghost CN 216812, EN 37900. No new Lighthouse score or LCP result is claimed.
