# CSS and logo delivery

13 November 2026: pages serve css/style.min.css; css/style.css remains the editable source. scripts/minify-css.mjs regenerates the minified file with Node built-ins (no dependencies): `node scripts/minify-css.mjs`. The minifier removes comments and redundant whitespace outside quoted strings, retaining rule order, all declarations, selector relationships and whitespace inside calc()/var() values. When style.css changes, regenerate style.min.css and update its version query in all 18 CN/EN pages. Do not hand-edit only the generated file.

The original images/jinmen-logo.png remains available for metadata and as the master. Header/footer img tags and the JS navigation fallback use images/optimized/jinmen-logo-nav.webp, a 91x128 lossless WebP derived from the original using Lanczos downsampling. CSS display sizes and original aspect ratio are unchanged, and transparency is preserved. The navigation displays the asset at up to 40x56 CSS pixels, leaving over 2x resolution. Favicon requests use a separate transparent 32x32 PNG, avoiding a full-size logo request just for the tab icon.

Measured logo sizes: original PNG 12132 bytes, navigation WebP 4812 bytes, favicon PNG 1861 bytes. Original fonts, content, forms, metadata, analytics and cache policy remain unchanged. Main JS differs only in the fallback navigation logo URL. Main JS and stylesheet query versions are updated so returning clients can request the new resources when they receive new HTML. Existing cached HTML may still reference the previous assets; this change does not purge browser caches.

Browser validation and transfer measurements are recorded in SEO_PLAN.md. No PageSpeed score improvement is promised.
