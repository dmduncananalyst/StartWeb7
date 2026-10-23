StartWeb7 unpublished commit review - October 22, 2026

Scope
Reviewed every one of the 508 changed paths in commit 91f0acb, against published main 4372e8ec871f4712a7cdb7aea5d91f2792a25704.
GitHub main was checked directly and matched origin/main. Exactly one commit is unpublished. No published commit is rewritten, and no push or deployment is performed.

Classification of the original 508 paths
61 actual website/project files: 42 website source/configuration files and 19 reusable audit/test utilities.
19 website assets and preserved media originals, including all Interior Design variants.
38 intentionally preserved reports, approved content records, inventories, extracted approved source text, and JSON validation evidence.
390 generated artifacts excluded from the amended commit: 387 PNG screenshots/video frame samples and three runtime logs.
The complete per-file classification, original Git blob IDs and local SHA256 hashes are in file-classification.json.

Removal policy
Only Git tracking/history changes. All 390 local files remain at their original paths, with their bytes checked against the manifest.
Screenshot exclusions affect verification/full-frame, verification/hero-review, verification/industry-audit, verification/interior-review and verification/oct22. Those directories themselves are NOT excluded wholesale.
The three logs are debug.log, verification/full-frame/error.txt and verification/full-frame/site-audit-log.txt.
No source, HTML, CSS, JavaScript, SEO metadata, sitemap, media asset, icon or Interior Design image is removed or modified.

Preserved reports and limitations
All 38 non-log audit/input/evidence files remain tracked. Reusable test tools reference pages.json and approved-content.json, so those inputs are preserved.
Raw validation JSON is retained as supporting evidence. Reports refer to screenshots that remain local but will not accompany the commit.
Historical reports describe intermediate layouts and are not claims about current behavior. In particular, verification/full-frame/papertrail-frame-report.txt describes a shortened PaperTrail card that was subsequently rejected and reverted. It is preserved for review, not treated as current acceptance evidence. Later reports and owner instructions supersede earlier layout descriptions.
All original/source image variants are deliberately retained, including older Interior Design images, rather than guessing that an unreferenced source is disposable.
The 19 development utilities are retained conservatively. Some exercise earlier layout expectations; this review does not change them or rerun them as a release certification.

Prevention
.gitignore excludes verification screenshots/video output, browser profiles at any verification depth, runtime/error logs, temporary JSON/trace output and standard Playwright output directories. Text documentation, page inventories, approved-content records and intentionally preserved JSON evidence remain trackable.
The previously excluded 3,916 Chrome profile files remain excluded. The entire unpublished range will be checked for profile paths and the newly removed artifact paths, not just its final tree.

Expected result
390 files removed from tracking; 120 changed files remain versus published main, including two new commit-review documentation files. Website/project source and all 19 assets are preserved byte-for-byte; only .gitignore and review documentation are changed by this cleanup.
No local verification files are deleted. Nothing is pushed. Owner approval is required before any push.
