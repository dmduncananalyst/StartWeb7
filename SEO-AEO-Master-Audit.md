# StartWeb7 SEO + AEO Master Audit

Audit date: **October 15, 2026, America/Los_Angeles**. Project: `C:/Users/its old/OneDrive/Documents/GitHub/StartWeb7`. Verified primary domain: **https://startweb7.com/**. Business: website design and ongoing SEO + AEO management; contact describes a Los Angeles base and nationwide service.

## Scope, authorization and deliverables

The complete `Universal-SEO-AEO-Website-Audit-Codex (2).md` was read (the actual repository filename includes a space before `(2)`). This is an audit, with one explicit exception requested in the same user message: remove excess blank space in blog cards. That exception changed only `blog.html` and `blog-photo-fit.css`: automatic row sizing, no card stretching, and shorter listing excerpts for the three new articles. Photographs, titles, full article writing, dates, source links and navigation were preserved. All other findings below are **recommendations only**. No commit, push, publication, form submission, email, client outreach or live-site modification was performed.

The only new repository deliverables from this audit are:

- `SEO-AEO-Master-Audit.md` — this evidence-based report.
- `SEO-AEO-Page-Inventory.csv` — every document and verified live alias, with status and evidence.
- `SEO-AEO-Priority-Fix-List.csv` — ordered tasks, each with status `Not Started`.

The completed, separately authorized blog-space correction is recorded here rather than incorrectly entered as an unfinished audit task. Temporary scripts, browser profiles and analysis data were kept outside the repository. Pre-existing uncommitted article/sitemap work was retained.

## Coverage and methodology

**116 unique HTML documents, 230 real/document routes inventoried:** 116 canonical targets (including three local unpublished articles), 113 verified live extensionless aliases and `/index.html`. All 116 HTML files were parsed for metadata, heading hierarchy, complete body text structure, JSON-LD, anchors, fragments, images and asset references. Source navigation, the XML sitemap, HTML files, known hosting aliases and runtime links were reconciled. There are no framework-generated routes or package/build manifests in this static checkout; `CNAME` names startweb7.com, `UPLOAD-README.txt` identifies GitHub Pages, and the live Server header confirms GitHub.com.

All 116 canonical/local documents were loaded in installed Chrome at **1440×1000 and 390×1000** (232 page/viewport checks). These checks assessed DOM headings, page width, runtime links/fragment targets, JSON-LD, image boxes and JavaScript exceptions. Flagged headings and FAQ content received focused checks. Blog cards received additional 820px and 320px checks and screenshot review. This is automated layout coverage with focused visual inspection, not a manual visual/accessibility certification of every interaction. Chrome was unthrottled; third-party Google Analytics endpoints were blocked during QA to avoid polluting tracking.

Read-only live HTTP checks covered all 116 canonical targets, robots/sitemap/llms files, HTTPS/WWW/index/trailing-slash behavior and negative controls; 116 extensionless candidate paths were also probed. All 105 unique source-code outbound anchor URLs were checked. The external set includes utility compose/social URLs and is not a backlink dataset. 148 unique referenced raster images decoded and verified; SVGs were checked for file existence and rendered use, not raster decoding. 212 distinct directly referenced local assets resolved; linked CSS `url()` references also resolved.

Forms, payment/CRM/audit API calls, outbound email and job applications were not submitted. No authenticated Google Search Console, Google Business Profile, analytics account, backlink-provider export, field performance dataset or official schema-validator result was available. All sentences, historical claims, image rights and business assertions have not been independently fact-checked against original records. Content findings therefore distinguish observed structure/claims from items needing editorial or primary-source verification. Local browser loads do not establish production performance.

### Inventory by document type

| Type | Documents |
|---|---:|
| blog_article | 14 |
| blog_index | 1 |
| homepage | 1 |
| industry | 13 |
| page | 6 |
| resource_article | 61 |
| resource_index | 6 |
| service | 7 |
| service_area | 7 |

The 13 industry documents include the industry index plus 12 detailed industry pages. Seven service documents include the service index plus six offerings. Seven service-area documents include nationwide plus six city pages. Six resource indexes include the general hub and five categories. The six other pages are About, Careers, Contact, Instant Audit, Reviews and Support. There are no excluded HTML documents. Image/video files, scripts, CSS and instruction Markdown are assets or working documents, not indexable page routes. `REMOVED-BLOGS.txt` lists 13 intentionally removed historical article slugs; they are not current documents. One removed slug was checked live and returned a real 404. Incoming links to all removed slugs still need log/backlink evidence.

## Findings at a glance

- **No confirmed site-wide crawl/index blocker** in the tested source/live responses; no Critical issue is assigned. This does not assert that Google has indexed the site.
- **One orphaned article:** `angi-vs-thumbtack-pool-builders.html`.
- **Four FAQPage blocks describe invisible Q&As**, and **nine FAQPage blocks are empty**.
- **Six source URLs returned 404**; 22 other external URLs require normal-browser/account verification, not a broken-link verdict.
- **Five category og:url values identify the wrong page**; their actual canonicals are correct.
- **Three October 14 article Sources sections contain plain labels without links**.
- **Careers H1 clips on a phone**; no global horizontal-overflow or JavaScript-exception issue was observed.
- Performance opportunities include the **1,132,986-byte Services document**, six large PNG photographs, and retained hero videos. No performance score or CWV failure is claimed.

## Technical SEO, crawlability and indexing

All 116 local canonical targets are unique, absolute HTTPS URLs and match their source documents. Each has exactly one title, description and H1. There are no exact duplicate document titles, descriptions or normalized non-navigation body texts; aliases intentionally reuse a document. The XML sitemap parses, contains exactly 116 unique preferred URLs, has no missing local page or missing target file, and is referenced by `robots.txt`. The local/live robots file allows `/` to `User-agent: *`; no noindex, nosnippet or restrictive X-Robots-Tag was found in the tested canonical responses. Explicit index/follow directives exist on some pages; absence of an explicit index meta is not a defect.

The live site currently returns HTTP 200 for **113 canonical targets**. The three articles added locally on October 15 return HTTP 404 and are absent from the live 113-URL sitemap. The live Blog page does not yet list them. This is the expected result of the user’s publication hold, not an instruction to deploy or a new site defect. The local sitemap/listing are ready for an eventual approved release together.

Unpublished local targets:

- https://startweb7.com/how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html
- https://startweb7.com/how-email-newsletters-became-a-media-business-again.html
- https://startweb7.com/how-qr-codes-became-part-of-everyday-business.html

HTTP and both WWW variants redirect in one 301 hop to `https://startweb7.com/`; HTTPS works and the homepage advertises HSTS. `/index.html` returns 200 with a root canonical. All 113 live document extensionless variants also return 200 with the preferred canonical; the three unpublished variants return 404. These working aliases are listed separately in the inventory and are not treated as 113 duplicate-content errors. Source navigation uses `.html`/root targets. `/about/` returns 404, but no website link or sitemap entry requests that trailing-slash form; the arbitrary nonexistent-page control also returns 404. No redirect chain or soft-404 defect was observed in those probes. Google-selected canonicals remain unverified.

Source content and ordinary navigation links exist in HTML, so primary page understanding is not dependent on an empty JavaScript shell. Shared JavaScript adds footer/chat/menu behavior. Many `#homeContactChat` targets are absent in initial source but are created by `universal-nav-fix.js`; **all rendered fragment targets resolved**. They are not reported as broken anchors. Without JavaScript those CTA fragments would need a fallback; that is a progressive-enhancement opportunity rather than the observed live runtime failure. The isolated browser request for `/favicon.ico` on a page without a favicon declaration is a browser convenience request, not a missing editorial image or a page-indexing blocker. No pagination exists in the complete 14-card Blog listing.

## On-page SEO, content and AEO

Metadata is unique across documents; no artificial title-length cutoff was used. H2/H3 sequencing has no skipped heading levels in the parsed source. Brand-and-service context is present in titles/descriptions even where a visual H1 is a short slogan or package name. Category indexes and utility pages are intentionally shorter and were not classified as thin solely by word count. Service and industry pages explain the offering and have a contact/audit action. Resource articles generally provide an explanatory opening, descriptive subheadings and source attributions. Article links in the five Business Growth category indexes are ordinary HTML links.

The site distinguishes ads from unpaid results, local listings from websites, and AI mentions from guaranteed recommendations. That measured framing supports answer extraction. The main AEO weaknesses are unsupported FAQ statements in markup, inaccessible/stale source destinations and limited editorial links between related subjects. The 14 blog articles all link back to Blog but do not link relevant topics/services within their prose; 41 resource articles link only to Instant Audit outside global navigation. This is an improvement opportunity, not evidence those articles are all orphaned. The one actual orphan is identified separately.

Potential overlap exists in timing, SEO-versus-ads and AI-discovery clusters, but no query data was supplied to establish keyword cannibalization. Two legacy vendor-comparison filenames now serve broader industry articles; their current titles describe the content, so intended incoming query expectations need checking before any rewrite or redirect. Publication dates on all 14 visible blog pages match their BlogPosting datePublished values and none is future-dated relative to this audit. The three new articles retain the supplied paragraphs and headings; only their index-card excerpts were shortened under the new explicit request. General resource schema has modified dates; their historical truth cannot be inferred from filesystem timestamps alone.

Existing `llms.txt` accurately points to the main services, industries, nationwide, SEO/AEO explainers, About and Contact. Its presence does not prove AI inclusion and its omission of every page is not a technical error. Google’s [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says existing SEO foundations apply, with no special AI text file or special schema required. Whether Google AI Overviews, ChatGPT Search or Perplexity actually cite a page is unverified; no citation/ranking guarantee is made.

## Structured data

The following counts are **documents containing each type**, including nested entities, not counts of individual schema nodes or separate page types. BlogPosting appears on 15 documents because the Blog index also describes its 14 posts.

| Schema type | Documents containing type |
|---|---:|
| Answer | 4 |
| Article | 61 |
| Blog | 4 |
| BlogPosting | 15 |
| BreadcrumbList | 60 |
| City | 6 |
| CollectionPage | 7 |
| FAQPage | 13 |
| ImageObject | 14 |
| ItemList | 6 |
| ListItem | 66 |
| Organization | 104 |
| Question | 4 |
| Service | 26 |
| WebPage | 52 |
| WebSite | 14 |

All JSON-LD parses; that is syntax validation only. Relevant types already include Organization, WebSite, Service, Article/BlogPosting, BreadcrumbList and CollectionPage/ItemList. Unsupported FAQ blocks and empty FAQ entities are factual defects. No fabricated AggregateRating, Review or LocalBusiness street-address entity was added or recommended. The business’s Organization and service-area representation should not be replaced with six fictional local offices. Person entities should be added only for real identified authors.

The three October 14 BlogPosting objects omit author while most others use a StartWeb7 Organization author; that is an optional recommended-property enhancement. All 14 card photos match their article cover paths and corresponding schema images were inspected. Thirteen BlogPosting images use the exact cover path; the business-partner article uses an existing optimized crop of the same photograph, visually checked and not classified as a mismatch defect. No contradicted article date was observed. No additional microdata/RDFa attribute blocks were found in the source scan. Full Schema.org vocabulary validation, current supported search-feature eligibility and Google’s actual extraction still require validators/Search Console. [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require markup to represent visible content; [Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) supports truthful author metadata without making every recommended property a compulsory indexing condition.

## Local identity, trust and off-page evidence

Every source page uses the same tel destination, **+18189340444**. Contact/Organization details consistently identify StartWeb7 and desirae@startweb7.com; contact copy names a Los Angeles base and nationwide service. The six city pages contain different local-market descriptions, municipal sources and appointment language, rather than merely swapping city names in identical body text. These descriptions do not establish an actual storefront in every city. Real location eligibility, hours, public address policy, service areas, business-name consistency and appointment claims must be compared with owner records and GBP. No Google Maps review count, local rank or profile verification status was assumed. Existing testimonials were not independently authenticated.

Backlinks cannot be inferred from source links. There is **no verified referring-domain count, backlink count, authority score, competitor ranking or broken incoming-link total** in this audit. Reliable exports and logs are required. Actual client/portfolio evidence may support legitimate case studies or industry mentions after approval and permission; bulk paid/spam links and fabricated endorsements are not recommended. The 13 removed historical slugs should be checked against real incoming-link/traffic evidence before deciding whether any redirect is useful.

## Images, mobile use and performance

All source img elements have an alt attribute. Empty alts on decorative category/menu art were not automatically treated as errors. All 148 referenced raster images decoded with no verification failure; all 14 blog photographs match card-to-article paths. Some icon width/height attributes reserve intentionally different display slots from their square/native sources; object-fit styling/rendered appearance must be considered before treating those ratios as image corruption.

The full 232 desktop/mobile loads produced no document horizontal overflow or JavaScript exception. The Careers heading nevertheless extends outside its mobile container and viewport; this is a real clipped-text issue missed by a document-width-only test. Several desktop hero headings extend beyond their own text boxes but remain in the viewport; those decorative layouts were not automatically called failures. Support intentionally uses a 1×1 visually hidden H1 while showing a readable 24/7 SUPPORT hero heading; that accessible pattern was not reported as a missing H1. Keyboard/screen-reader auditing, interaction timing and all expanded/menu states were not exhaustively tested.

The approved blog correction removes `grid-auto-rows:1fr`, uses intrinsic rows and aligns cards to their content. All 14 Read more gaps measure **24px** at 1440px, 820px, 390px and 320px. The three new listing excerpts are short; full article text is untouched. Card photographs retain the original 3:2 display rule and all src/width/height attributes. Existing typography, border, radius, colors and navigation rules remain.

Performance risks are backed by source byte sizes, not invented scores. Services HTML is 1,132,986 bytes, the homepage HTML is 256,750 bytes, shared nav code is 140,599 bytes, and chat code is 39,096 bytes. Six PNG blog photos total 15,176,763 bytes. The largest referenced hero video is commercial-cleaning-hero.mp4 at 7,797,584 bytes. These are uncompressed on-disk/GET sizes and not a claim that every visit downloads all assets. Most blog cards are lazy loaded; a below-fold Wikipedia thumbnail still asks for eager/high priority. Browser QA did not supply real-user LCP/INP/CLS, lab PSI scores or an accessibility score. Font styling generally uses system Arial/Helvetica stacks; no need to invent a web-font defect. Profiling should establish which CSS/script/inline/media work actually delays a useful first render before any optimization.

## Outbound link evidence

105 unique outbound URLs: **77 reached HTTP 200**, **6 returned 404**, **17 returned 403**, and **5 returned 417** in this audit client. Redirects were followed. A 200 proves reachability in this check, not the truth or currency of the cited claim. 403/417 results require verification and are not dead-link counts. Every source link remains unchanged.

### URLs returning 404

| Issue | Exact destination | Source page(s) |
|---|---|---|
| LNK-001 | https://consumer.ftc.gov/articles/0211-auto-repair-basics | ccc-one-vs-mitchell-collision-repair.html |
| LNK-002 | https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business | how-do-i-build-an-email-list-for-my-business.html |
| LNK-003 | https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information | how-qr-codes-became-part-of-everyday-business.html |
| LNK-004 | https://www.nia.nih.gov/health/long-term-care/long-term-care-facilities-assisted-living-nursing-homes-and-other-residential-care | how-to-get-more-assisted-living-residents.html |
| LNK-005 | https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials | the-fake-review-epidemic.html |
| LNK-006 | https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers | the-fake-review-epidemic.html |

### Destinations needing normal-browser/account verification

| Response | Exact destination | Source page(s) |
|---|---|---|
| 417 | https://outlook.live.com/mail/0/deeplink/compose?to=desirae@startweb7.com | about.html, assisted-living.html, business-website.html, careers.html, catering.html, collision-repair.html, competitive.html, contact.html, dentists.html, doctors.html, dominance.html, essentials.html, general-contractors.html, index.html, industries.html, landing-page.html, lawyers.html, pool-construction.html, real-estate-agents.html, resources-ai-search.html, resources-digital-marketing.html, resources-paid-ads.html, resources-seo.html, resources-websites.html, resources.html, reviews.html, seo-optimized-website.html, services.html, support.html |
| 403 | https://openai.com/index/introducing-chatgpt-search/ | aeo-ai-search.html, what-is-aeo.html |
| 403 | https://legiscan.com/CA/text/SB37/id/3272879 | buying-legal-leads-california-oregon-2026.html |
| 403 | https://legiscan.com/CA/text/AB2039/id/3460493 | buying-legal-leads-california-oregon-2026.html |
| 403 | https://www.cityofcalabasas.com/government/community-development/planning-division/city-profile | calabasas.html |
| 403 | https://www.cityofcalabasas.com/government/community-development/planning-division/development-review | calabasas.html |
| 403 | https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt | can-ai-search-recommend-my-business.html, can-i-pay-chatgpt-to-recommend-my-business.html, how-do-i-get-my-business-recommended-by-chatgpt.html, how-long-does-it-take-to-show-up-in-ai-answers.html, why-does-chatgpt-recommend-my-competitor-but-not-me.html |
| 403 | https://help.openai.com/en/articles/20001047-ads-in-chatgpt | can-i-pay-chatgpt-to-recommend-my-business.html |
| 403 | https://www.upwork.com/freelance-jobs/apply/Freelance-Website-Developer-Indepent-Project-Based-Work_~022091248950594118272/ | careers.html |
| 403 | https://www.upwork.com/jobs/~022091632368767083136 | careers.html, contact.html, index.html, reviews.html, support.html |
| 403 | https://www.upwork.com/jobs/~022091671150785926803 | careers.html, contact.html |
| 403 | https://www.upwork.com/jobs/~022091669948970992622 | careers.html, contact.html |
| 403 | https://www.upwork.com/jobs/~022091248950594118272 | contact.html, index.html, reviews.html, support.html |
| 403 | https://blog.x.com/en_us/topics/company/2021/making-twitter-a-better-home-for-writers | how-email-newsletters-became-a-media-business-again.html |
| 403 | https://help.x.com/en/using-x/revue | how-email-newsletters-became-a-media-business-again.html |
| 403 | https://www.bls.gov/ooh/protective-service/security-guards.htm | how-to-get-more-monthly-security-contracts.html |
| 417 | https://outlook.live.com/mail/0/deeplink/compose?to=skdreamhomesatl@gmail.com | index.html |
| 417 | https://outlook.live.com/mail/0/deeplink/compose?to=bodiesbyelauq@gmail.com | index.html |
| 417 | https://outlook.live.com/mail/0/deeplink/compose?to=vduncanevans@gmail.com | index.html |
| 417 | https://outlook.live.com/mail/0/deeplink/compose?to=kevinjhawkins@aol.com | index.html |
| 403 | https://www.simivalley.org/departments/city-manager-s-office/economic-development-business-assistance/the-business-resource-center/why-simi-valley | simi-valley.html |
| 403 | https://doi.org/10.1145/3313831.3376849 | why-every-website-looks-the-same-now.html |

Utility mail-compose checks were GETs only; no message was sent. Upwork links were not used to apply. The manual-check backlog is EXT-004.

## Detailed findings and approval-only repair plan

Each item below has the same ID and status in the Priority Fix List. `confirmed` means direct source/browser/HTTP evidence; `requires_verification` means missing external or owner evidence; `opportunity` means a possible improvement, not a demonstrated search failure. Impact is qualitative; no fabricated traffic or revenue estimate is assigned. All checklist rows are **Not Started**.

### Confirmed defects

#### INT-001 — High — Pool-builder comparison article has no incoming internal link from another page.

**Affected:** https://startweb7.com/angi-vs-thumbtack-pool-builders.html

**Evidence:** Zero incoming source links and zero incoming links in the rendered desktop DOM of all 116 pages. The article is listed in the sitemap and live HTTP 200. Its filename appears in contact-chat JavaScript data, which is not a crawlable link on another page.

**Estimated impact:** Make the existing article discoverable through the site rather than relying on the sitemap.

**Recommended repair/check (approval required):** After approval, add a relevant descriptive HTML link from pool-construction.html and an appropriate Business Growth category/index. Keep its existing URL and writing.

**Verify:** Recrawl every page; confirm at least one ordinary incoming <a href> in initial HTML and a clear category path.

#### SCH-001 — High — FAQPage markup describes questions and answers absent from the visible page.

**Affected:** https://startweb7.com/about.html

**Evidence:** about.html:165: 4 question/answer pairs exist in JSON-LD. None of their questions or answers occurs in the rendered visible body text at 1440px.

**Estimated impact:** Align structured data with actual content and remove misleading machine-readable answers.

**Recommended repair/check (approval required):** After approval, remove the unsupported FAQPage block, or mark up only real questions and answers already approved and displayed to users. Do not add a new FAQ solely for schema.

**Verify:** Check visible page text against each marked-up question/answer; run the current relevant structured-data validator and inspect rendered JSON-LD.

#### SCH-002 — High — FAQPage markup describes questions and answers absent from the visible page.

**Affected:** https://startweb7.com/contact.html

**Evidence:** contact.html:341: 4 question/answer pairs exist in JSON-LD. None of their questions or answers occurs in the rendered visible body text at 1440px.

**Estimated impact:** Align structured data with actual content and remove misleading machine-readable answers.

**Recommended repair/check (approval required):** After approval, remove the unsupported FAQPage block, or mark up only real questions and answers already approved and displayed to users. Do not add a new FAQ solely for schema.

**Verify:** Check visible page text against each marked-up question/answer; run the current relevant structured-data validator and inspect rendered JSON-LD.

#### SCH-003 — High — FAQPage markup describes questions and answers absent from the visible page.

**Affected:** https://startweb7.com/

**Evidence:** index.html:443: 8 question/answer pairs exist in JSON-LD. None of their questions or answers occurs in the rendered visible body text at 1440px.

**Estimated impact:** Align structured data with actual content and remove misleading machine-readable answers.

**Recommended repair/check (approval required):** After approval, remove the unsupported FAQPage block, or mark up only real questions and answers already approved and displayed to users. Do not add a new FAQ solely for schema.

**Verify:** Check visible page text against each marked-up question/answer; run the current relevant structured-data validator and inspect rendered JSON-LD.

#### SCH-004 — High — FAQPage markup describes questions and answers absent from the visible page.

**Affected:** https://startweb7.com/reviews.html

**Evidence:** reviews.html:311: 4 question/answer pairs exist in JSON-LD. None of their questions or answers occurs in the rendered visible body text at 1440px.

**Estimated impact:** Align structured data with actual content and remove misleading machine-readable answers.

**Recommended repair/check (approval required):** After approval, remove the unsupported FAQPage block, or mark up only real questions and answers already approved and displayed to users. Do not add a new FAQ solely for schema.

**Verify:** Check visible page text against each marked-up question/answer; run the current relevant structured-data validator and inspect rendered JSON-LD.

#### AEO-001 — Medium — The Sources section lists publications but provides no clickable source links.

**Affected:** https://startweb7.com/the-cookie-that-would-not-die.html

**Evidence:** the-cookie-that-would-not-die.html:18: 6 plain-text source labels, zero anchor elements in the Sources section. Labels: Chromium, January 2020 cookie phase out announcement; Google, July 2024 change in approach; Google, April 2025 cookie choice update; Google, October 2025 technology retirement announcement; Competition and Markets Authority, investigation and dated updates; WebKit, March 2020 Safari cookie blocking announcement.

**Estimated impact:** Let readers and answer systems inspect supporting material directly.

**Recommended repair/check (approval required):** After approval, locate the exact original documents supporting each label and turn those labels into links while preserving the supplied article writing. Do not guess source destinations.

**Verify:** Each existing source label opens the matching source document, with the article text and dates unchanged.

#### AEO-002 — Medium — The Sources section lists publications but provides no clickable source links.

**Affected:** https://startweb7.com/when-tiktok-became-a-search-engine.html

**Evidence:** when-tiktok-became-a-search-engine.html:18: 2 plain-text source labels, zero anchor elements in the Sources section. Labels: Adobe Express, consumer search survey and methodology; TechCrunch, reporting on Google’s July 2022 conference remarks.

**Estimated impact:** Let readers and answer systems inspect supporting material directly.

**Recommended repair/check (approval required):** After approval, locate the exact original documents supporting each label and turn those labels into links while preserving the supplied article writing. Do not guess source destinations.

**Verify:** Each existing source label opens the matching source document, with the article text and dates unchanged.

#### AEO-003 — Medium — The Sources section lists publications but provides no clickable source links.

**Affected:** https://startweb7.com/wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html

**Evidence:** wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html:18: 3 plain-text source labels, zero anchor elements in the Sources section. Labels: Wikimedia Foundation, human traffic data and interpretation; Wikimedia Enterprise, services for content reuse; Wikimedia Foundation, Wikipedia history.

**Estimated impact:** Let readers and answer systems inspect supporting material directly.

**Recommended repair/check (approval required):** After approval, locate the exact original documents supporting each label and turn those labels into links while preserving the supplied article writing. Do not guess source destinations.

**Verify:** Each existing source label opens the matching source document, with the article text and dates unchanged.

#### LNK-001 — Medium — A published source link returned HTTP 404.

**Affected:** https://startweb7.com/ccc-one-vs-mitchell-collision-repair.html

**Evidence:** https://consumer.ftc.gov/articles/0211-auto-repair-basics returned HTTP 404 to a read-only GET on October 15, 2026 (America/Los_Angeles). Exact source URL is retained; a 404 observation does not prove permanent removal.

**Estimated impact:** Restore usable evidence for readers and answer engines.

**Recommended repair/check (approval required):** After approval, locate the same document on its publisher’s official site, verify that it supports the existing claim, and replace only the stale source URL. Recheck in a normal browser before editing.

**Verify:** The approved replacement returns a usable 200 response and contains the cited material; check the article link manually.

#### LNK-002 — Medium — A published source link returned HTTP 404.

**Affected:** https://startweb7.com/how-do-i-build-an-email-list-for-my-business.html

**Evidence:** https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business returned HTTP 404 to a read-only GET on October 15, 2026 (America/Los_Angeles). Exact source URL is retained; a 404 observation does not prove permanent removal.

**Estimated impact:** Restore usable evidence for readers and answer engines.

**Recommended repair/check (approval required):** After approval, locate the same document on its publisher’s official site, verify that it supports the existing claim, and replace only the stale source URL. Recheck in a normal browser before editing.

**Verify:** The approved replacement returns a usable 200 response and contains the cited material; check the article link manually.

#### LNK-003 — Medium — A published source link returned HTTP 404.

**Affected:** https://startweb7.com/how-qr-codes-became-part-of-everyday-business.html

**Evidence:** https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information returned HTTP 404 to a read-only GET on October 15, 2026 (America/Los_Angeles). Exact source URL is retained; a 404 observation does not prove permanent removal.

**Estimated impact:** Restore usable evidence for readers and answer engines.

**Recommended repair/check (approval required):** After approval, locate the same document on its publisher’s official site, verify that it supports the existing claim, and replace only the stale source URL. Recheck in a normal browser before editing.

**Verify:** The approved replacement returns a usable 200 response and contains the cited material; check the article link manually.

#### LNK-004 — Medium — A published source link returned HTTP 404.

**Affected:** https://startweb7.com/how-to-get-more-assisted-living-residents.html

**Evidence:** https://www.nia.nih.gov/health/long-term-care/long-term-care-facilities-assisted-living-nursing-homes-and-other-residential-care returned HTTP 404 to a read-only GET on October 15, 2026 (America/Los_Angeles). Exact source URL is retained; a 404 observation does not prove permanent removal.

**Estimated impact:** Restore usable evidence for readers and answer engines.

**Recommended repair/check (approval required):** After approval, locate the same document on its publisher’s official site, verify that it supports the existing claim, and replace only the stale source URL. Recheck in a normal browser before editing.

**Verify:** The approved replacement returns a usable 200 response and contains the cited material; check the article link manually.

#### LNK-005 — Medium — A published source link returned HTTP 404.

**Affected:** https://startweb7.com/the-fake-review-epidemic.html

**Evidence:** https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials returned HTTP 404 to a read-only GET on October 15, 2026 (America/Los_Angeles). Exact source URL is retained; a 404 observation does not prove permanent removal.

**Estimated impact:** Restore usable evidence for readers and answer engines.

**Recommended repair/check (approval required):** After approval, locate the same document on its publisher’s official site, verify that it supports the existing claim, and replace only the stale source URL. Recheck in a normal browser before editing.

**Verify:** The approved replacement returns a usable 200 response and contains the cited material; check the article link manually.

#### LNK-006 — Medium — A published source link returned HTTP 404.

**Affected:** https://startweb7.com/the-fake-review-epidemic.html

**Evidence:** https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers returned HTTP 404 to a read-only GET on October 15, 2026 (America/Los_Angeles). Exact source URL is retained; a 404 observation does not prove permanent removal.

**Estimated impact:** Restore usable evidence for readers and answer engines.

**Recommended repair/check (approval required):** After approval, locate the same document on its publisher’s official site, verify that it supports the existing claim, and replace only the stale source URL. Recheck in a normal browser before editing.

**Verify:** The approved replacement returns a usable 200 response and contains the cited material; check the article link manually.

#### SCH-005 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/burbank.html

**Evidence:** burbank.html:15: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-006 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/calabasas.html

**Evidence:** calabasas.html:15: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-007 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/careers.html

**Evidence:** careers.html:307: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-008 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/glendale.html

**Evidence:** glendale.html:15: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-009 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/industries.html

**Evidence:** industries.html:52: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-010 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/los-angeles.html

**Evidence:** los-angeles.html:15: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-011 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/santa-clarita.html

**Evidence:** santa-clarita.html:15: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-012 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/simi-valley.html

**Evidence:** simi-valley.html:15: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### SCH-013 — Medium — An empty FAQPage entity is published without any questions.

**Affected:** https://startweb7.com/support.html

**Evidence:** support.html:309: JSON-LD contains mainEntity: []. JSON syntax parses, but the block has no FAQ content.

**Estimated impact:** Remove meaningless structured-data entities.

**Recommended repair/check (approval required):** After approval, remove the empty FAQPage block. Retain the existing Service/Organization/WebPage schema. Add FAQ data only if a real, visible and relevant FAQ is later approved.

**Verify:** Confirm no empty FAQPage remains in source or rendered DOM; preserve other schema types.

#### UX-001 — Medium — The Careers H1 runs beyond the mobile viewport.

**Affected:** https://startweb7.com/careers.html

**Evidence:** At 390px the CONTRACTOR JOBS heading uses a 56px font in a 342px-wide box at x=24; text extends to x=543.03, beyond the 390px viewport. The page suppresses horizontal overflow, so a document scrollWidth test alone misses the clipped text.

**Estimated impact:** Keep the job-page title fully readable on phones.

**Recommended repair/check (approval required):** After approval, make this heading wrap or scale within its existing container at mobile widths; preserve the Careers layout and imagery.

**Verify:** At 320px, 390px and 430px, the complete title is visible and the text rectangle remains inside the viewport; inspect after scrolling to the H1.

#### META-001 — Low — The Open Graph URL identifies the general resource hub instead of this category.

**Affected:** https://startweb7.com/resources-ai-search.html

**Evidence:** resources-ai-search.html:27: og:url is https://startweb7.com/resources.html; its canonical and CollectionPage schema correctly identify https://startweb7.com/resources-ai-search.html.

**Estimated impact:** Keep shared-link identity consistent without changing indexing canonicals.

**Recommended repair/check (approval required):** After approval, change only og:url to this category’s existing canonical URL.

**Verify:** Source and social preview both identify the category URL; canonical and page content stay unchanged.

#### META-002 — Low — The Open Graph URL identifies the general resource hub instead of this category.

**Affected:** https://startweb7.com/resources-digital-marketing.html

**Evidence:** resources-digital-marketing.html:27: og:url is https://startweb7.com/resources.html; its canonical and CollectionPage schema correctly identify https://startweb7.com/resources-digital-marketing.html.

**Estimated impact:** Keep shared-link identity consistent without changing indexing canonicals.

**Recommended repair/check (approval required):** After approval, change only og:url to this category’s existing canonical URL.

**Verify:** Source and social preview both identify the category URL; canonical and page content stay unchanged.

#### META-003 — Low — The Open Graph URL identifies the general resource hub instead of this category.

**Affected:** https://startweb7.com/resources-paid-ads.html

**Evidence:** resources-paid-ads.html:27: og:url is https://startweb7.com/resources.html; its canonical and CollectionPage schema correctly identify https://startweb7.com/resources-paid-ads.html.

**Estimated impact:** Keep shared-link identity consistent without changing indexing canonicals.

**Recommended repair/check (approval required):** After approval, change only og:url to this category’s existing canonical URL.

**Verify:** Source and social preview both identify the category URL; canonical and page content stay unchanged.

#### META-004 — Low — The Open Graph URL identifies the general resource hub instead of this category.

**Affected:** https://startweb7.com/resources-seo.html

**Evidence:** resources-seo.html:27: og:url is https://startweb7.com/resources.html; its canonical and CollectionPage schema correctly identify https://startweb7.com/resources-seo.html.

**Estimated impact:** Keep shared-link identity consistent without changing indexing canonicals.

**Recommended repair/check (approval required):** After approval, change only og:url to this category’s existing canonical URL.

**Verify:** Source and social preview both identify the category URL; canonical and page content stay unchanged.

#### META-005 — Low — The Open Graph URL identifies the general resource hub instead of this category.

**Affected:** https://startweb7.com/resources-websites.html

**Evidence:** resources-websites.html:27: og:url is https://startweb7.com/resources.html; its canonical and CollectionPage schema correctly identify https://startweb7.com/resources-websites.html.

**Estimated impact:** Keep shared-link identity consistent without changing indexing canonicals.

**Recommended repair/check (approval required):** After approval, change only og:url to this category’s existing canonical URL.

**Verify:** Source and social preview both identify the category URL; canonical and page content stay unchanged.

### External or owner verification required

#### EXT-001 — High — Google indexing, selected canonicals, sitemap processing and manual-action status are unknown.

**Affected:** Google Search Console: startweb7.com domain property

**Evidence:** All 116 local canonical targets have sitemap entries; 113 currently return live HTTP 200 and three intentionally unpublished targets return 404. No authenticated Search Console data was available.

**Estimated impact:** Distinguish real indexing blockers from local readiness and expected unpublished content.

**Recommended repair/check (approval required):** With owner-authorized read-only Search Console access/export, reconcile Pages, Sitemaps, URL Inspection, Manual Actions and Security Issues against this inventory; start with the homepage, services, city pages and the pool-comparison orphan. Do not submit unpublished URLs.

**Verify:** Export dated coverage and sitemap results; record Google-selected canonical and last crawl for representative and excluded URLs.

#### CONT-001 — Medium — Two legacy comparison URL names now lead to broader industry articles.

**Affected:** https://startweb7.com/ccc-one-vs-mitchell-collision-repair.html; https://startweb7.com/mojo-vs-vulcan7-real-estate-leads.html

**Evidence:** The collision URL H1 is Collision Repair Marketing and Customer Decisions; the real-estate URL H1 is Real Estate Lead Sources and Customer Intent. Their editorial body does not provide the named vendor-versus-vendor comparison implied by the filenames. Titles match the current broader articles.

**Estimated impact:** Avoid an intent mismatch for visitors arriving through legacy comparison queries.

**Recommended repair/check (approval required):** Review intended audience and Search Console landing queries before changing anything. If comparison intent is still important, approve a properly sourced comparison; otherwise retain useful current pages and accurate labels. Do not rename or redirect automatically.

**Verify:** Compare dated GSC queries and visitor intent with the actual article; verify any future scope change with the owner.

#### CONT-002 — Medium — Some topic clusters need query-level confirmation that their roles remain distinct.

**Affected:** https://startweb7.com/how-long-does-seo-take-to-work.html; https://startweb7.com/how-long-until-seo-starts-bringing-in-leads.html; https://startweb7.com/when-can-i-expect-my-first-customer-with-seo.html; https://startweb7.com/what-is-the-difference-between-seo-and-google-ads.html; https://startweb7.com/seo-vs-paid-ads.html; https://startweb7.com/aeo-ai-search.html; https://startweb7.com/what-is-aeo.html; https://startweb7.com/how-do-i-get-my-business-recommended-by-chatgpt.html; https://startweb7.com/can-ai-search-recommend-my-business.html

**Evidence:** SEO timing is covered by three separate articles (work, leads and first customer); paid-versus-organic and AI-discovery also have adjacent explainers. No exact duplicate main-text documents, duplicate document titles or duplicate document descriptions were found. Keyword cannibalization is not established.

**Estimated impact:** Preserve useful coverage while avoiding unhelpful competition between pages.

**Recommended repair/check (approval required):** Use a GSC page/query matrix to assess whether these pages serve different intents. Prefer clarifying their role and cross-linking; consolidate only if actual overlap/performance and owner approval justify it.

**Verify:** Compare query overlap and engagement before/after approved changes; keep URLs intact unless a redirect plan is approved.

#### EXT-002 — Medium — Backlinks, referring domains and broken incoming links are not independently measurable from this repository.

**Affected:** Google Search Console Links report / reliable backlink-provider export for startweb7.com

**Evidence:** No Search Console Links export, backlink-provider dataset or inbound request logs were supplied. Outgoing social links and cited publications are not evidence of incoming backlinks. A public search is not a complete backlink index.

**Estimated impact:** Identify real authority sources and worthwhile link reclamation without fabricated metrics.

**Recommended repair/check (approval required):** Obtain a dated read-only GSC Links export or reputable backlink-provider export and relevant 404/referral logs. Review true referring domains, anchor patterns, relevant local/industry mentions and broken incoming URLs against the inventory. Investigate the 13 removed slugs in REMOVED-BLOGS.txt only if inbound links/traffic exist.

**Verify:** Report the actual dataset name/date and manually sample referring pages; deduplicate domains and distinguish live links from historical records.

#### EXT-003 — Medium — Real-user Core Web Vitals and standardized lab performance remain unmeasured.

**Affected:** https://startweb7.com/; https://startweb7.com/services.html; https://startweb7.com/blog.html

**Evidence:** The audit used local unthrottled Chrome layout checks and source byte counts. It did not run Lighthouse/PageSpeed Insights or obtain CrUX/GSC field data; no LCP, INP, CLS or performance scores are claimed.

**Estimated impact:** Prioritize performance work using measured bottlenecks rather than file-size guesses.

**Recommended repair/check (approval required):** Run repeatable mobile/desktop PSI/Lighthouse on the live homepage, services page, one video-heavy industry page, a resource article and blog index/article; get field data from CrUX or Search Console where available.

**Verify:** Record device/network/CPU conditions and run dates; distinguish lab snapshots from the field-data window and unavailable field samples.

#### EXT-004 — Medium — Some external destinations reject automated HTTP checks.

**Affected:** https://startweb7.com/about.html; https://startweb7.com/aeo-ai-search.html; https://startweb7.com/assisted-living.html; https://startweb7.com/business-website.html; https://startweb7.com/buying-legal-leads-california-oregon-2026.html; https://startweb7.com/calabasas.html; https://startweb7.com/can-ai-search-recommend-my-business.html; https://startweb7.com/can-i-pay-chatgpt-to-recommend-my-business.html; https://startweb7.com/careers.html; https://startweb7.com/catering.html; https://startweb7.com/collision-repair.html; https://startweb7.com/competitive.html; https://startweb7.com/contact.html; https://startweb7.com/dentists.html; https://startweb7.com/doctors.html; https://startweb7.com/dominance.html; https://startweb7.com/essentials.html; https://startweb7.com/general-contractors.html; https://startweb7.com/how-do-i-get-my-business-recommended-by-chatgpt.html; https://startweb7.com/how-email-newsletters-became-a-media-business-again.html; https://startweb7.com/how-long-does-it-take-to-show-up-in-ai-answers.html; https://startweb7.com/how-to-get-more-monthly-security-contracts.html; https://startweb7.com/; https://startweb7.com/industries.html; https://startweb7.com/landing-page.html; https://startweb7.com/lawyers.html; https://startweb7.com/pool-construction.html; https://startweb7.com/real-estate-agents.html; https://startweb7.com/resources-ai-search.html; https://startweb7.com/resources-digital-marketing.html; https://startweb7.com/resources-paid-ads.html; https://startweb7.com/resources-seo.html; https://startweb7.com/resources-websites.html; https://startweb7.com/resources.html; https://startweb7.com/reviews.html; https://startweb7.com/seo-optimized-website.html; https://startweb7.com/services.html; https://startweb7.com/simi-valley.html; https://startweb7.com/support.html; https://startweb7.com/what-is-aeo.html; https://startweb7.com/why-does-chatgpt-recommend-my-competitor-but-not-me.html; https://startweb7.com/why-every-website-looks-the-same-now.html

**Evidence:** 17 unique URLs returned 403 and five Outlook compose URLs returned 417. Examples include OpenAI Help, X, LegiScan, Upwork, city sources and a DOI resolver. These are not classified as dead links. The master report lists every URL and response.

**Estimated impact:** Separate actual stale links from anti-bot/account requirements.

**Recommended repair/check (approval required):** Open each listed URL in a normal browser, using a legitimate account only when necessary, and confirm the destination. Check Upwork job availability and email compose links without submitting messages. Leave valid destinations intact.

**Verify:** Record human-browser destination and availability; reclassify as broken only with adequate evidence.

#### EXT-005 — Medium — Full schema vocabulary and search-feature validation still needs official validators.

**Affected:** All structured-data-bearing pages; especially FAQ findings SCH-001 through SCH-013

**Evidence:** All 116 pages’ JSON-LD parses successfully; source and rendered entities were inventoried. This does not establish Schema.org vocabulary validity, Google feature eligibility or Google’s actual extraction. Confirmed semantic problems are listed separately.

**Estimated impact:** Verify real structured-data interpretation and avoid confusing JSON validity with search eligibility.

**Recommended repair/check (approval required):** After approval of any actual markup repairs, run Schema Markup Validator and the current relevant Rich Results Test, then use Search Console URL Inspection on representative deployed templates. Do not add irrelevant types or ratings.

**Verify:** Save dated validator output and distinguish supported-feature errors, recommendations and non-applicable markup.

#### EXT-006 — Medium — Time-sensitive legal assertions need verification against current primary sources.

**Affected:** https://startweb7.com/buying-legal-leads-california-oregon-2026.html

**Evidence:** The article discusses California SB 37, AB 2039 and Oregon referral rules; the two LegiScan URLs returned 403 to the audit client. The source-link availability test is not a legal fact check.

**Estimated impact:** Maintain trustworthy dated business guidance without overstating certainty.

**Recommended repair/check (approval required):** Have the responsible editor verify the precise effective-date/rule statements against current official California and Oregon materials before any approved update. Prefer primary citations supporting the exact assertions. Preserve the article pending review.

**Verify:** Document the official source, relevant provision and effective date for each material legal assertion; record editorial approval.

#### LOCAL-001 — Medium — Local business/profile accuracy needs owner and Google Business Profile evidence.

**Affected:** https://startweb7.com/contact.html; https://startweb7.com/nationwide.html; https://startweb7.com/burbank.html; https://startweb7.com/calabasas.html; https://startweb7.com/glendale.html; https://startweb7.com/los-angeles.html; https://startweb7.com/santa-clarita.html; https://startweb7.com/simi-valley.html

**Evidence:** The published contact phone is consistently +18189340444 across all 116 source pages. Contact describes a Los Angeles base; the six city pages describe service markets and meetings by appointment. Organization/Service schema does not invent six street-address branches. No authenticated GBP record was inspected.

**Estimated impact:** Keep local identity accurate and avoid misrepresenting service-area coverage.

**Recommended repair/check (approval required):** With owner-supplied verified profile details, confirm legal/trading name, phone, service areas, real public location, eligibility, hours and appointment arrangements. Do not create city offices or add addresses solely for SEO.

**Verify:** Compare the owner-verified profile and site details; use actual Google Maps only if verified review counts are needed. No assumed storefront or review total.

### Optional opportunities

#### INT-002 — Medium — Blog articles provide no topic-specific internal link beyond Back to Blog in their editorial content.

**Affected:** https://startweb7.com/buying-legal-leads-california-oregon-2026.html; https://startweb7.com/from-ten-blue-links-to-ai-answers.html; https://startweb7.com/how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html; https://startweb7.com/how-email-newsletters-became-a-media-business-again.html; https://startweb7.com/how-qr-codes-became-part-of-everyday-business.html; https://startweb7.com/how-to-tell-if-your-seo-company-is-actually-doing-anything.html; https://startweb7.com/opening-a-business-alone-or-with-a-partner.html; https://startweb7.com/should-i-redesign-my-website-or-just-fix-the-seo.html; https://startweb7.com/the-cookie-that-would-not-die.html; https://startweb7.com/the-fake-review-epidemic.html; https://startweb7.com/when-tiktok-became-a-search-engine.html; https://startweb7.com/why-did-my-google-rankings-drop-overnight.html; https://startweb7.com/why-every-website-looks-the-same-now.html; https://startweb7.com/wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html

**Evidence:** All 14 source articles have only blog.html among their non-global page links; menus/footer still provide global service links. No article is incorrectly called orphaned for this reason.

**Estimated impact:** Help readers explore related services and support topical relationships.

**Recommended repair/check (approval required):** After approval, add one or two naturally relevant links using the existing prose where possible: Craigslist/design to business-website.html; QR/mobile experience to landing-page.html; newsletters to how-do-i-build-an-email-list-for-my-business.html; AI stories to what-is-aeo.html. Choose appropriate existing service/topic destinations for the remaining articles.

**Verify:** Recrawl contextual <a href> links and manually check relevance; preserve the full original article writing and all source links.

#### INT-003 — Medium — These resource articles have only the audit CTA as a non-global outgoing page link.

**Affected:** https://startweb7.com/can-ai-search-recommend-my-business.html; https://startweb7.com/can-i-get-leads-from-google-without-running-ads.html; https://startweb7.com/can-i-pay-chatgpt-to-recommend-my-business.html; https://startweb7.com/can-seo-work-for-a-business-that-serves-more-than-one-city.html; https://startweb7.com/do-i-need-a-website-if-i-have-social-media.html; https://startweb7.com/do-i-need-professional-photos-to-succeed-on-instagram.html; https://startweb7.com/do-i-need-special-ai-code-on-my-website.html; https://startweb7.com/do-reviews-help-me-get-more-customers-from-google.html; https://startweb7.com/how-do-i-build-an-email-list-for-my-business.html; https://startweb7.com/how-do-i-get-customers-from-social-media-without-paying-for-ads.html; https://startweb7.com/how-do-i-get-my-business-recommended-by-chatgpt.html; https://startweb7.com/how-do-i-know-if-my-paid-ads-are-working.html; https://startweb7.com/how-do-i-know-if-my-seo-is-working.html; https://startweb7.com/how-do-i-show-up-when-someone-searches-for-my-service-near-me.html; https://startweb7.com/how-do-i-target-the-right-people-with-ads.html; https://startweb7.com/how-long-does-it-take-to-show-up-in-ai-answers.html; https://startweb7.com/how-long-does-seo-take-to-work.html; https://startweb7.com/how-long-until-seo-starts-bringing-in-leads.html; https://startweb7.com/i-don-t-have-time-to-create-content-is-there-a-faster-way.html; https://startweb7.com/i-just-started-my-business-how-do-i-get-google-to-notice-me.html; https://startweb7.com/if-i-leave-my-agency-do-i-keep-my-google-accounts.html; https://startweb7.com/is-seo-worth-it-for-my-business.html; https://startweb7.com/my-competitor-shows-up-first-on-google-and-i-don-t-what-are-they-doing-differently.html; https://startweb7.com/should-i-boost-posts-or-use-ads-manager.html; https://startweb7.com/should-i-hire-an-agency-a-freelancer-or-do-seo-myself.html; https://startweb7.com/what-are-red-flags-when-choosing-an-seo-company.html; https://startweb7.com/what-do-i-do-if-someone-says-i-don-t-have-rights-to-a-photo-on-my-website.html; https://startweb7.com/what-if-my-business-is-service-based-can-instagram-still-work-for-me.html; https://startweb7.com/what-is-the-difference-between-seo-and-google-ads.html; https://startweb7.com/what-makes-someone-choose-one-business-over-another-online.html; https://startweb7.com/what-questions-should-i-ask-before-hiring-an-seo-agency.html; https://startweb7.com/why-am-i-posting-on-instagram-regularly-but-getting-no-customers.html; https://startweb7.com/why-are-my-ads-getting-clicks-but-no-customers.html; https://startweb7.com/why-did-my-ad-account-get-restricted.html; https://startweb7.com/why-does-chatgpt-recommend-my-competitor-but-not-me.html; https://startweb7.com/why-does-my-business-not-show-up-on-google-when-i-search-its-name.html; https://startweb7.com/why-is-my-business-not-getting-leads-from-google.html; https://startweb7.com/why-is-my-website-not-bringing-in-customers.html; https://startweb7.com/why-is-seo-ongoing-instead-of-a-one-time-service.html; https://startweb7.com/will-seo-still-matter-as-people-use-ai-search.html; https://startweb7.com/wix-or-squarespace-vs-hiring-a-professional.html

**Evidence:** 41 articles have exactly [instant-audit.html] in the source non-global outgoing-link set. Links in global navigation are excluded from this count.

**Estimated impact:** Improve topic discovery and provide useful next steps beyond a generic conversion CTA.

**Recommended repair/check (approval required):** After approval, connect each article to its existing category, one closely related resource and a relevant existing service where useful. For example, link how-do-i-build-an-email-list-for-my-business.html to the newsletter article and link local-visibility resources to google-business-profile-vs-website.html.

**Verify:** Check source links and rendered links for each listed article; verify destinations and anchors match the article subject.

#### PERF-001 — Medium — The Services HTML document is unusually large before compression.

**Affected:** https://startweb7.com/services.html

**Evidence:** services.html is 1,132,986 bytes on disk; the live GET also returned this uncompressed document length. This is an asset-size observation, not a measured Core Web Vitals failure.

**Estimated impact:** Reduce document transfer and parsing work while preserving approved behavior.

**Recommended repair/check (approval required):** After approval and a baseline performance recording, examine embedded SVG/data payloads and repeated inline assets; extract/cache or optimize them where visual equivalence can be maintained. Preserve the sales-report feature.

**Verify:** Compare compressed transfer size and repeatable mobile Lighthouse traces before/after; visually regress the sales report and services layout.

#### PERF-002 — Medium — Six blog photographs have large PNG source payloads.

**Affected:** https://startweb7.com/blog.html; https://startweb7.com/how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html; https://startweb7.com/how-email-newsletters-became-a-media-business-again.html; https://startweb7.com/how-qr-codes-became-part-of-everyday-business.html; https://startweb7.com/the-cookie-that-would-not-die.html; https://startweb7.com/when-tiktok-became-a-search-engine.html; https://startweb7.com/wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html

**Evidence:** assets/blog/Google’s third-party cookie reversal-1.png: 1,922,587 bytes; assets/blog/Searching for coffee on TikTok-2.png: 2,518,743 bytes; assets/blog/Team meeting around a laptop table.png: 2,705,175 bytes; assets/blog/craigslist-kept-its-1990s-look.png: 2,514,617 bytes; assets/blog/inbox-came-back-email-newsletters.png: 3,118,800 bytes; assets/blog/the-little-square-qr-code-comeback.png: 2,396,841 bytes. Total: 15,176,763 bytes if all six are fetched. Cards use lazy loading for most below-fold images.

**Estimated impact:** Reduce image bandwidth without shrinking the visible photographs.

**Recommended repair/check (approval required):** After approval, create visually equivalent optimized WebP/AVIF variants and responsive sources where useful. Preserve the originals and the existing displayed photo dimensions and crops.

**Verify:** Compare actual transferred bytes, image quality, card/cover dimensions, first-photo loading and repeatable mobile LCP measurements.

#### PERF-003 — Medium — Several retained hero videos exceed 3 MB as source files.

**Affected:** https://startweb7.com/about.html; https://startweb7.com/assisted-living.html; https://startweb7.com/careers.html; https://startweb7.com/catering.html; https://startweb7.com/commercial-cleaning.html; https://startweb7.com/landing-page.html; https://startweb7.com/nationwide.html; https://startweb7.com/security-services.html

**Evidence:** assets/about-hero-video.mp4: 6,281,492 bytes; assets/assisted-living-hero.mp4: 3,430,226 bytes; assets/landing-page-hero-video.mp4: 4,411,300 bytes; careers-video.mp4: 5,751,593 bytes; catering-events.mp4: 5,486,800 bytes; commercial-cleaning-hero.mp4: 7,797,584 bytes; nationwide-hero.mp4: 3,471,303 bytes; security-services-hero.mp4: 5,044,238 bytes. File size alone does not establish how many bytes autoplay/preload transfers on a particular visit.

**Estimated impact:** Reduce unnecessary mobile media work while preserving video features.

**Recommended repair/check (approval required):** After approval, measure actual mobile transfers and poster/LCP timing; optimize encoding, poster loading or preload behavior only if the same approved video experience can be retained.

**Verify:** Use cold-cache mobile performance recordings and Network panel data; verify video playback and poster behavior on desktop and phone.

#### AEO-004 — Low — The site could make editorial responsibility and first-hand evidence more explicit.

**Affected:** https://startweb7.com/about.html; https://startweb7.com/buying-legal-leads-california-oregon-2026.html; https://startweb7.com/from-ten-blue-links-to-ai-answers.html; https://startweb7.com/how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html; https://startweb7.com/how-email-newsletters-became-a-media-business-again.html; https://startweb7.com/how-qr-codes-became-part-of-everyday-business.html; https://startweb7.com/how-to-tell-if-your-seo-company-is-actually-doing-anything.html; https://startweb7.com/opening-a-business-alone-or-with-a-partner.html; https://startweb7.com/should-i-redesign-my-website-or-just-fix-the-seo.html; https://startweb7.com/the-cookie-that-would-not-die.html; https://startweb7.com/the-fake-review-epidemic.html; https://startweb7.com/when-tiktok-became-a-search-engine.html; https://startweb7.com/why-did-my-google-rankings-drop-overnight.html; https://startweb7.com/why-every-website-looks-the-same-now.html; https://startweb7.com/wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html

**Evidence:** About describes the service and nationwide work but does not identify a named team or evidence of credentials. Blog publisher identity is present; most article pages have no visible editorial byline. Reviews and portfolio examples already provide some trust evidence.

**Estimated impact:** Provide useful context for readers evaluating expertise and business identity.

**Recommended repair/check (approval required):** After approval, add only verifiable team/editorial responsibility and authorized project evidence; connect to existing reviews and portfolio work. Do not invent testimonials, rankings or outcome statistics.

**Verify:** Check every added identity/claim with the business owner and source project records; confirm visible disclosures match schema.

#### OFF-001 — Low — Existing project/review evidence could support legitimate off-site mentions and fuller case studies.

**Affected:** https://startweb7.com/; https://startweb7.com/reviews.html; https://startweb7.com/about.html

**Evidence:** The site already displays named client feedback and portfolio material. No verified external editorial placements or backlink totals were established.

**Estimated impact:** Create evidence worth citing without manufacturing endorsements.

**Recommended repair/check (approval required):** After separate approval, use owner-authorized project case studies and relevant industry/community relationships to earn genuine mentions. Do not contact clients or buy bulk directory/spam links as part of this audit.

**Verify:** Verify client permission, project facts and any eventual referring-page link directly.

#### PERF-004 — Low — Shared UI behavior depends on substantial JavaScript and repeated styles.

**Affected:** universal-nav-fix.js; startweb7-contact-chat-v2.js

**Evidence:** universal-nav-fix.js is 140,599 bytes; startweb7-contact-chat-v2.js is 39,096 bytes. The sample homepage declares 11 CSS links and seven sourced scripts; styles and chat UI are also appended at runtime.

**Estimated impact:** Reduce parse and style work without making a speculative redesign.

**Recommended repair/check (approval required):** After approval and profiling, remove proven duplicate loads or dead code and consider deferred/cached shared modules. Preserve menus, footer, chat, analytics and every approved interaction.

**Verify:** Compare script execution/coverage and network requests; test dropdowns, compact menus, contact chat and forms after any approved refactor.

#### PERF-005 — Low — The sixth card still requests its below-fold photograph eagerly with high priority.

**Affected:** https://startweb7.com/blog.html

**Evidence:** The Wikipedia card image assets/blog/Team%20meeting%20around%20a%20laptop%20table.png has loading="eager" and fetchpriority="high". The first Craigslist photo is also eager/high and preloaded.

**Estimated impact:** Give the initial visible photograph priority while keeping all images.

**Recommended repair/check (approval required):** After approval and a loading trace, use lazy loading/normal priority for the below-fold card if it competes with the first photograph. Keep the full article’s cover eager.

**Verify:** Check the first viewport Network waterfall and card rendering during scroll at desktop and mobile widths.

#### SCH-014 — Low — Three BlogPosting objects omit an author entity.

**Affected:** https://startweb7.com/the-cookie-that-would-not-die.html; https://startweb7.com/when-tiktok-became-a-search-engine.html; https://startweb7.com/wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html

**Evidence:** The October 14 BlogPosting objects include publisher and dates but no author. Other blog articles use StartWeb7 as an Organization author. This is a recommended-property opportunity, not invalid JSON or an indexing blocker.

**Estimated impact:** Clarify responsibility for the writing.

**Recommended repair/check (approval required):** After approval, identify the actual accountable author/editorial organization, disclose it visibly where appropriate and use the same truthful entity in schema. Do not invent a person or credentials.

**Verify:** Compare the visible byline/editorial credit and author schema; validate using current Article guidance.

## Document-by-document coverage ledger

Every row below corresponds to one source HTML document. The companion CSV expands these to all 230 canonical/verified-alias routes and records titles, descriptions, canonical URL, sitemap status, source and rendered link status, schema/alt findings, content focus and verification requirements. Word counts are approximate source text excluding navigation/scripts/styles, not a quality score. Full account-only checks remain unknown even on rows without a confirmed defect.

| Source / preferred route | Type | Live status | Words | Findings |
|---|---|---:|---:|---|
| [about.html](https://startweb7.com/about.html) | page | 200 | 205 | SCH-001, PERF-003, AEO-004, EXT-004, OFF-001 |
| [aeo-ai-search.html](https://startweb7.com/aeo-ai-search.html) | resource_article | 200 | 572 | CONT-002, EXT-004 |
| [angi-vs-thumbtack-pool-builders.html](https://startweb7.com/angi-vs-thumbtack-pool-builders.html) | resource_article | 200 | 611 | INT-001 |
| [assisted-living.html](https://startweb7.com/assisted-living.html) | industry | 200 | 578 | PERF-003, EXT-004 |
| [blog.html](https://startweb7.com/blog.html) | blog_index | 200 | 500 | PERF-002, PERF-005 |
| [burbank.html](https://startweb7.com/burbank.html) | service_area | 200 | 536 | SCH-005, LOCAL-001 |
| [business-website.html](https://startweb7.com/business-website.html) | service | 200 | 291 | EXT-004 |
| [buying-legal-leads-california-oregon-2026.html](https://startweb7.com/buying-legal-leads-california-oregon-2026.html) | blog_article | 200 | 540 | INT-002, AEO-004, EXT-004, EXT-006 |
| [calabasas.html](https://startweb7.com/calabasas.html) | service_area | 200 | 529 | SCH-006, LOCAL-001, EXT-004 |
| [can-ai-search-recommend-my-business.html](https://startweb7.com/can-ai-search-recommend-my-business.html) | resource_article | 200 | 525 | INT-003, CONT-002, EXT-004 |
| [can-i-get-leads-from-google-without-running-ads.html](https://startweb7.com/can-i-get-leads-from-google-without-running-ads.html) | resource_article | 200 | 467 | INT-003 |
| [can-i-pay-chatgpt-to-recommend-my-business.html](https://startweb7.com/can-i-pay-chatgpt-to-recommend-my-business.html) | resource_article | 200 | 436 | INT-003, EXT-004 |
| [can-seo-work-for-a-business-that-serves-more-than-one-city.html](https://startweb7.com/can-seo-work-for-a-business-that-serves-more-than-one-city.html) | resource_article | 200 | 465 | INT-003 |
| [can-seo-work-if-i-do-not-have-a-storefront.html](https://startweb7.com/can-seo-work-if-i-do-not-have-a-storefront.html) | resource_article | 200 | 429 | No page-specific defect in tested scope; external checks pending |
| [careers.html](https://startweb7.com/careers.html) | page | 200 | 71 | SCH-007, UX-001, PERF-003, EXT-004 |
| [catering.html](https://startweb7.com/catering.html) | industry | 200 | 600 | PERF-003, EXT-004 |
| [ccc-one-vs-mitchell-collision-repair.html](https://startweb7.com/ccc-one-vs-mitchell-collision-repair.html) | resource_article | 200 | 596 | LNK-001, CONT-001 |
| [collision-repair.html](https://startweb7.com/collision-repair.html) | industry | 200 | 636 | EXT-004 |
| [commercial-cleaning.html](https://startweb7.com/commercial-cleaning.html) | industry | 200 | 580 | PERF-003 |
| [competitive.html](https://startweb7.com/competitive.html) | service | 200 | 407 | EXT-004 |
| [contact.html](https://startweb7.com/contact.html) | page | 200 | 185 | SCH-002, LOCAL-001, EXT-004 |
| [dentists.html](https://startweb7.com/dentists.html) | industry | 200 | 726 | EXT-004 |
| [digital-marketing-vs-seo.html](https://startweb7.com/digital-marketing-vs-seo.html) | resource_article | 200 | 549 | No page-specific defect in tested scope; external checks pending |
| [do-i-need-a-website-if-i-have-social-media.html](https://startweb7.com/do-i-need-a-website-if-i-have-social-media.html) | resource_article | 200 | 468 | INT-003 |
| [do-i-need-professional-photos-to-succeed-on-instagram.html](https://startweb7.com/do-i-need-professional-photos-to-succeed-on-instagram.html) | resource_article | 200 | 456 | INT-003 |
| [do-i-need-special-ai-code-on-my-website.html](https://startweb7.com/do-i-need-special-ai-code-on-my-website.html) | resource_article | 200 | 471 | INT-003 |
| [do-reviews-help-me-get-more-customers-from-google.html](https://startweb7.com/do-reviews-help-me-get-more-customers-from-google.html) | resource_article | 200 | 367 | INT-003 |
| [doctors.html](https://startweb7.com/doctors.html) | industry | 200 | 599 | EXT-004 |
| [does-a-website-actually-help-a-business-get-customers.html](https://startweb7.com/does-a-website-actually-help-a-business-get-customers.html) | resource_article | 200 | 442 | No page-specific defect in tested scope; external checks pending |
| [dominance.html](https://startweb7.com/dominance.html) | service | 200 | 337 | EXT-004 |
| [essentials.html](https://startweb7.com/essentials.html) | service | 200 | 432 | EXT-004 |
| [from-ten-blue-links-to-ai-answers.html](https://startweb7.com/from-ten-blue-links-to-ai-answers.html) | blog_article | 200 | 652 | INT-002, AEO-004 |
| [general-contractors.html](https://startweb7.com/general-contractors.html) | industry | 200 | 570 | EXT-004 |
| [glendale.html](https://startweb7.com/glendale.html) | service_area | 200 | 510 | SCH-008, LOCAL-001 |
| [google-business-profile-vs-website.html](https://startweb7.com/google-business-profile-vs-website.html) | resource_article | 200 | 576 | No page-specific defect in tested scope; external checks pending |
| [google-maps-leads.html](https://startweb7.com/google-maps-leads.html) | resource_article | 200 | 546 | No page-specific defect in tested scope; external checks pending |
| [home-health-care.html](https://startweb7.com/home-health-care.html) | industry | 200 | 566 | No page-specific defect in tested scope; external checks pending |
| [how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html](https://startweb7.com/how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html) | blog_article | 404 (unpublished) | 1061 | PERF-002, INT-002, AEO-004 |
| [how-do-customers-find-local-businesses-online.html](https://startweb7.com/how-do-customers-find-local-businesses-online.html) | resource_article | 200 | 458 | No page-specific defect in tested scope; external checks pending |
| [how-do-i-build-an-email-list-for-my-business.html](https://startweb7.com/how-do-i-build-an-email-list-for-my-business.html) | resource_article | 200 | 471 | LNK-002, INT-003 |
| [how-do-i-get-customers-from-social-media-without-paying-for-ads.html](https://startweb7.com/how-do-i-get-customers-from-social-media-without-paying-for-ads.html) | resource_article | 200 | 508 | INT-003 |
| [how-do-i-get-my-business-recommended-by-chatgpt.html](https://startweb7.com/how-do-i-get-my-business-recommended-by-chatgpt.html) | resource_article | 200 | 455 | INT-003, CONT-002, EXT-004 |
| [how-do-i-know-if-my-paid-ads-are-working.html](https://startweb7.com/how-do-i-know-if-my-paid-ads-are-working.html) | resource_article | 200 | 408 | INT-003 |
| [how-do-i-know-if-my-seo-is-working.html](https://startweb7.com/how-do-i-know-if-my-seo-is-working.html) | resource_article | 200 | 480 | INT-003 |
| [how-do-i-show-up-when-someone-searches-for-my-service-near-me.html](https://startweb7.com/how-do-i-show-up-when-someone-searches-for-my-service-near-me.html) | resource_article | 200 | 439 | INT-003 |
| [how-do-i-target-the-right-people-with-ads.html](https://startweb7.com/how-do-i-target-the-right-people-with-ads.html) | resource_article | 200 | 392 | INT-003 |
| [how-email-newsletters-became-a-media-business-again.html](https://startweb7.com/how-email-newsletters-became-a-media-business-again.html) | blog_article | 404 (unpublished) | 1213 | PERF-002, INT-002, AEO-004, EXT-004 |
| [how-long-does-it-take-to-get-leads-from-angi-commercial-cleaning.html](https://startweb7.com/how-long-does-it-take-to-get-leads-from-angi-commercial-cleaning.html) | resource_article | 200 | 565 | No page-specific defect in tested scope; external checks pending |
| [how-long-does-it-take-to-show-up-in-ai-answers.html](https://startweb7.com/how-long-does-it-take-to-show-up-in-ai-answers.html) | resource_article | 200 | 430 | INT-003, EXT-004 |
| [how-long-does-seo-take-to-work.html](https://startweb7.com/how-long-does-seo-take-to-work.html) | resource_article | 200 | 458 | INT-003, CONT-002 |
| [how-long-until-seo-starts-bringing-in-leads.html](https://startweb7.com/how-long-until-seo-starts-bringing-in-leads.html) | resource_article | 200 | 474 | INT-003, CONT-002 |
| [how-qr-codes-became-part-of-everyday-business.html](https://startweb7.com/how-qr-codes-became-part-of-everyday-business.html) | blog_article | 404 (unpublished) | 1224 | LNK-003, PERF-002, INT-002, AEO-004 |
| [how-to-get-more-assisted-living-residents.html](https://startweb7.com/how-to-get-more-assisted-living-residents.html) | resource_article | 200 | 601 | LNK-004 |
| [how-to-get-more-monthly-security-contracts.html](https://startweb7.com/how-to-get-more-monthly-security-contracts.html) | resource_article | 200 | 545 | EXT-004 |
| [how-to-tell-if-your-seo-company-is-actually-doing-anything.html](https://startweb7.com/how-to-tell-if-your-seo-company-is-actually-doing-anything.html) | blog_article | 200 | 645 | INT-002, AEO-004 |
| [i-don-t-have-time-to-create-content-is-there-a-faster-way.html](https://startweb7.com/i-don-t-have-time-to-create-content-is-there-a-faster-way.html) | resource_article | 200 | 457 | INT-003 |
| [i-just-started-my-business-how-do-i-get-google-to-notice-me.html](https://startweb7.com/i-just-started-my-business-how-do-i-get-google-to-notice-me.html) | resource_article | 200 | 512 | INT-003 |
| [if-i-leave-my-agency-do-i-keep-my-google-accounts.html](https://startweb7.com/if-i-leave-my-agency-do-i-keep-my-google-accounts.html) | resource_article | 200 | 506 | INT-003 |
| [increase-sales.html](https://startweb7.com/increase-sales.html) | resource_article | 200 | 554 | No page-specific defect in tested scope; external checks pending |
| [index.html](https://startweb7.com/) | homepage | 200 | 467 | SCH-003, EXT-004, OFF-001 |
| [industries.html](https://startweb7.com/industries.html) | industry | 200 | 175 | SCH-009, EXT-004 |
| [instant-audit.html](https://startweb7.com/instant-audit.html) | page | 200 | 106 | No page-specific defect in tested scope; external checks pending |
| [is-seo-worth-it-for-my-business.html](https://startweb7.com/is-seo-worth-it-for-my-business.html) | resource_article | 200 | 455 | INT-003 |
| [landing-page.html](https://startweb7.com/landing-page.html) | service | 200 | 312 | PERF-003, EXT-004 |
| [lawyers.html](https://startweb7.com/lawyers.html) | industry | 200 | 696 | EXT-004 |
| [los-angeles.html](https://startweb7.com/los-angeles.html) | service_area | 200 | 581 | SCH-010, LOCAL-001 |
| [mojo-vs-vulcan7-real-estate-leads.html](https://startweb7.com/mojo-vs-vulcan7-real-estate-leads.html) | resource_article | 200 | 567 | CONT-001 |
| [my-competitor-shows-up-first-on-google-and-i-don-t-what-are-they-doing-differently.html](https://startweb7.com/my-competitor-shows-up-first-on-google-and-i-don-t-what-are-they-doing-differently.html) | resource_article | 200 | 486 | INT-003 |
| [nationwide.html](https://startweb7.com/nationwide.html) | service_area | 200 | 469 | PERF-003, LOCAL-001 |
| [opening-a-business-alone-or-with-a-partner.html](https://startweb7.com/opening-a-business-alone-or-with-a-partner.html) | blog_article | 200 | 673 | INT-002, AEO-004 |
| [pool-construction.html](https://startweb7.com/pool-construction.html) | industry | 200 | 634 | EXT-004 |
| [real-estate-agents.html](https://startweb7.com/real-estate-agents.html) | industry | 200 | 618 | EXT-004 |
| [resources-ai-search.html](https://startweb7.com/resources-ai-search.html) | resource_index | 200 | 104 | META-001, EXT-004 |
| [resources-digital-marketing.html](https://startweb7.com/resources-digital-marketing.html) | resource_index | 200 | 115 | META-002, EXT-004 |
| [resources-paid-ads.html](https://startweb7.com/resources-paid-ads.html) | resource_index | 200 | 82 | META-003, EXT-004 |
| [resources-seo.html](https://startweb7.com/resources-seo.html) | resource_index | 200 | 244 | META-004, EXT-004 |
| [resources-websites.html](https://startweb7.com/resources-websites.html) | resource_index | 200 | 105 | META-005, EXT-004 |
| [resources.html](https://startweb7.com/resources.html) | resource_index | 200 | 501 | EXT-004 |
| [reviews.html](https://startweb7.com/reviews.html) | page | 200 | 644 | SCH-004, EXT-004, OFF-001 |
| [sales-during-slow-season.html](https://startweb7.com/sales-during-slow-season.html) | resource_article | 200 | 574 | No page-specific defect in tested scope; external checks pending |
| [santa-clarita.html](https://startweb7.com/santa-clarita.html) | service_area | 200 | 504 | SCH-011, LOCAL-001 |
| [security-services.html](https://startweb7.com/security-services.html) | industry | 200 | 585 | PERF-003 |
| [seo-optimized-website.html](https://startweb7.com/seo-optimized-website.html) | service | 200 | 549 | EXT-004 |
| [seo-vs-paid-ads.html](https://startweb7.com/seo-vs-paid-ads.html) | resource_article | 200 | 561 | CONT-002 |
| [services.html](https://startweb7.com/services.html) | service | 200 | 209 | PERF-001, EXT-004 |
| [should-i-boost-posts-or-use-ads-manager.html](https://startweb7.com/should-i-boost-posts-or-use-ads-manager.html) | resource_article | 200 | 406 | INT-003 |
| [should-i-hire-an-agency-a-freelancer-or-do-seo-myself.html](https://startweb7.com/should-i-hire-an-agency-a-freelancer-or-do-seo-myself.html) | resource_article | 200 | 456 | INT-003 |
| [should-i-redesign-my-website-or-just-fix-the-seo.html](https://startweb7.com/should-i-redesign-my-website-or-just-fix-the-seo.html) | blog_article | 200 | 774 | INT-002, AEO-004 |
| [simi-valley.html](https://startweb7.com/simi-valley.html) | service_area | 200 | 537 | SCH-012, LOCAL-001, EXT-004 |
| [support.html](https://startweb7.com/support.html) | page | 200 | 266 | SCH-013, EXT-004 |
| [the-cookie-that-would-not-die.html](https://startweb7.com/the-cookie-that-would-not-die.html) | blog_article | 200 | 1100 | AEO-001, PERF-002, INT-002, SCH-014, AEO-004 |
| [the-fake-review-epidemic.html](https://startweb7.com/the-fake-review-epidemic.html) | blog_article | 200 | 661 | LNK-005, LNK-006, INT-002, AEO-004 |
| [what-are-red-flags-when-choosing-an-seo-company.html](https://startweb7.com/what-are-red-flags-when-choosing-an-seo-company.html) | resource_article | 200 | 479 | INT-003 |
| [what-do-i-do-if-someone-says-i-don-t-have-rights-to-a-photo-on-my-website.html](https://startweb7.com/what-do-i-do-if-someone-says-i-don-t-have-rights-to-a-photo-on-my-website.html) | resource_article | 200 | 457 | INT-003 |
| [what-if-my-business-is-service-based-can-instagram-still-work-for-me.html](https://startweb7.com/what-if-my-business-is-service-based-can-instagram-still-work-for-me.html) | resource_article | 200 | 428 | INT-003 |
| [what-is-aeo.html](https://startweb7.com/what-is-aeo.html) | resource_article | 200 | 609 | CONT-002, EXT-004 |
| [what-is-seo.html](https://startweb7.com/what-is-seo.html) | resource_article | 200 | 615 | No page-specific defect in tested scope; external checks pending |
| [what-is-the-difference-between-seo-and-google-ads.html](https://startweb7.com/what-is-the-difference-between-seo-and-google-ads.html) | resource_article | 200 | 425 | INT-003, CONT-002 |
| [what-makes-someone-choose-one-business-over-another-online.html](https://startweb7.com/what-makes-someone-choose-one-business-over-another-online.html) | resource_article | 200 | 543 | INT-003 |
| [what-questions-should-i-ask-before-hiring-an-seo-agency.html](https://startweb7.com/what-questions-should-i-ask-before-hiring-an-seo-agency.html) | resource_article | 200 | 444 | INT-003 |
| [what-should-a-business-website-include-to-get-more-customers.html](https://startweb7.com/what-should-a-business-website-include-to-get-more-customers.html) | resource_article | 200 | 462 | No page-specific defect in tested scope; external checks pending |
| [when-can-i-expect-my-first-customer-with-seo.html](https://startweb7.com/when-can-i-expect-my-first-customer-with-seo.html) | resource_article | 200 | 611 | CONT-002 |
| [when-tiktok-became-a-search-engine.html](https://startweb7.com/when-tiktok-became-a-search-engine.html) | blog_article | 200 | 1011 | AEO-002, PERF-002, INT-002, SCH-014, AEO-004 |
| [why-am-i-posting-on-instagram-regularly-but-getting-no-customers.html](https://startweb7.com/why-am-i-posting-on-instagram-regularly-but-getting-no-customers.html) | resource_article | 200 | 455 | INT-003 |
| [why-are-my-ads-getting-clicks-but-no-customers.html](https://startweb7.com/why-are-my-ads-getting-clicks-but-no-customers.html) | resource_article | 200 | 405 | INT-003 |
| [why-did-my-ad-account-get-restricted.html](https://startweb7.com/why-did-my-ad-account-get-restricted.html) | resource_article | 200 | 453 | INT-003 |
| [why-did-my-google-rankings-drop-overnight.html](https://startweb7.com/why-did-my-google-rankings-drop-overnight.html) | blog_article | 200 | 743 | INT-002, AEO-004 |
| [why-does-chatgpt-recommend-my-competitor-but-not-me.html](https://startweb7.com/why-does-chatgpt-recommend-my-competitor-but-not-me.html) | resource_article | 200 | 446 | INT-003, EXT-004 |
| [why-does-my-business-not-show-up-on-google-when-i-search-its-name.html](https://startweb7.com/why-does-my-business-not-show-up-on-google-when-i-search-its-name.html) | resource_article | 200 | 531 | INT-003 |
| [why-every-website-looks-the-same-now.html](https://startweb7.com/why-every-website-looks-the-same-now.html) | blog_article | 200 | 627 | INT-002, AEO-004, EXT-004 |
| [why-is-my-business-not-getting-leads-from-google.html](https://startweb7.com/why-is-my-business-not-getting-leads-from-google.html) | resource_article | 200 | 467 | INT-003 |
| [why-is-my-website-not-bringing-in-customers.html](https://startweb7.com/why-is-my-website-not-bringing-in-customers.html) | resource_article | 200 | 443 | INT-003 |
| [why-is-seo-ongoing-instead-of-a-one-time-service.html](https://startweb7.com/why-is-seo-ongoing-instead-of-a-one-time-service.html) | resource_article | 200 | 465 | INT-003 |
| [wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html](https://startweb7.com/wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html) | blog_article | 200 | 818 | AEO-003, PERF-002, INT-002, SCH-014, AEO-004 |
| [will-seo-still-matter-as-people-use-ai-search.html](https://startweb7.com/will-seo-still-matter-as-people-use-ai-search.html) | resource_article | 200 | 472 | INT-003 |
| [wix-or-squarespace-vs-hiring-a-professional.html](https://startweb7.com/wix-or-squarespace-vs-hiring-a-professional.html) | resource_article | 200 | 423 | INT-003 |

## External evidence still required

| Source/access | Questions it resolves | Current status |
|---|---|---|
| Read-only GSC domain property/export | Indexed/excluded counts, submitted-not-indexed reasons, sitemap processing, selected canonicals, crawl/index issues, manual/security actions, queries, impressions, clicks, CTR, average position | Unknown; EXT-001 |
| Owner-verified GBP details and appropriate read-only profile access | Actual name, category, hours, service areas, location eligibility, profile details and local visibility | Unknown; LOCAL-001 |
| GSC Links or a reliable dated backlink-provider export plus logs | Real referring domains, anchors, relevant mentions, broken incoming URLs, competitive link opportunities | Unknown; EXT-002 |
| PSI/Lighthouse and CrUX/GSC CWV | Standardized lab results and real-user LCP/INP/CLS | Not run/not available; EXT-003 |
| Current schema validators and URL Inspection | Vocabulary validity, supported feature checks and Google-rendered extraction | JSON syntax checked; full validation pending, EXT-005 |
| Normal browser/account where appropriate | 403/417 link destinations and availability | EXT-004; no actions submitted |
| Owner/editorial records and primary sources | Appointment arrangements, testimonial permission, image rights, legal assertions and editorial accountability | Not independently verified; LOCAL-001/EXT-006/AEO-004 |

## Recommended order of operations

1. **Establish actual crawl/index blockers first:** review EXT-001. The tested code/HTTP responses show no blanket noindex/robots block; investigate any real excluded/manual-action evidence before cosmetic or content work. Keep the three new articles unpublished until the user approves release.
2. **Repair direct trust/discovery defects after approval:** align unsupported/empty FAQ blocks, add incoming links to the pool-comparison orphan, restore the six stale source URLs and add actual source destinations to the three unlinked source lists.
3. **Address confirmed usability/metadata errors:** fix the Careers mobile title and five incorrect category og:url values. These are separate from the already completed blog-spacing exception.
4. **Measure before optimizing:** record representative lab/field performance, then prioritize large HTML, PNG, video or script work using those traces. Preserve all approved photos, videos and features.
5. **Strengthen topical paths and accountable evidence:** add useful related-topic/service links, verify bylines/primary sources and use query data to evaluate overlapping or legacy-comparison topics. Do not mass-rewrite or consolidate merely because subjects are adjacent.
6. **Verify local/off-page facts and any eventual release:** use owner/GSC/GBP/backlink evidence. Only after approval, publish the three articles, cards, assets and sitemap together; then confirm live 200/canonical/source links and use Search Console appropriately. No publication or account mutation is authorized by this report.

### Primary guidance used to interpret findings

- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical) — access/response/content readiness; a sitemap is not proof of indexing.
- [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features) — ordinary SEO foundations, visible text, internal links and no special AI file/schema requirement.
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — markup must accurately represent user-visible content.
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article) — truthful article metadata and author context.
- [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — preferred URLs and canonical signals.

These primary references were checked during this audit; site-specific findings above come from the actual source files, rendered local pages and dated live HTTP responses.
