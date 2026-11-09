$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
function Assert($condition, $message) { if (!$condition) { throw $message } }
function Normalize($text) { ([regex]::Replace([Net.WebUtility]::HtmlDecode($text), '\s+', ' ')).Trim() }
$records = Get-Content tools/oct20-content-check.json -Raw -Encoding UTF8 | ConvertFrom-Json
$archive = [IO.File]::ReadAllText((Join-Path $root 'blog.html'))
[xml]$sitemap = [IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
foreach ($record in $records) {
 $page = [IO.File]::ReadAllText((Join-Path $root $record.file))
 $prose = [regex]::Match($page, '(?s)<article class="blog-prose">(.*?)<section class="blog-sources">').Groups[1].Value
 $plain = [regex]::Replace($prose, '<[^>]+>', ' ')
 Assert ((Normalize $plain) -ceq (Normalize $record.body)) "Article content differs: $($record.file)"
 foreach ($url in $record.urls) { Assert ($page.Contains('href="' + [Net.WebUtility]::HtmlEncode($url) + '"')) "Source missing: $url" }
 Assert (([regex]::Matches($page, '<h1>')).Count -eq 1) 'Expected one article heading'
 Assert (([regex]::Matches($page, 'rel="canonical"')).Count -eq 1) 'Expected one canonical'
 Assert (!$prose.Contains('FAQ')) 'Unexpected FAQ section'
 Assert (!(Normalize $plain).Contains([char]0x2014)) 'Unexpected em dash'
 Assert (([regex]::Matches($archive, '<article class="blog-card">(?:(?!</article>).)*href="' + [regex]::Escape($record.file) + '"', 'Singleline')).Count -eq 1) 'Archive card count mismatch'
 $schema = [regex]::Match($page, '<script type="application/ld\+json">(.*?)</script>', 'Singleline').Groups[1].Value | ConvertFrom-Json
 Assert ($schema.headline -eq $record.title -and $schema.datePublished -eq '2026-10-20') 'Structured data mismatch'
 Assert (@($sitemap.urlset.url | Where-Object loc -EQ ('https://startweb7.com/' + $record.file)).Count -eq 1) 'Sitemap count mismatch'
 foreach ($match in [regex]::Matches($page, '(?:src|href)="([^"]+)"')) {
  $target = [uri]::UnescapeDataString(($match.Groups[1].Value -split '\?')[0])
  if ($target -match '^(https?:|tel:|mailto:|#)') { continue }
  Assert (Test-Path -LiteralPath (Join-Path $root $target)) "Missing local resource: $target"
 }
 Write-Output "PASS: $($record.file), complete text, sources, metadata, archive card, sitemap, and local resources"
}
# Verified against the original assets in commit b1d668d9aaa548a3247c152cb6c57ca9e061ed3d.
# Exact source hashes keep this check portable without an author's Desktop copies.
$originalHashes = @{
 'Flash Blocked, Website Still Waiting.png' = 'aef2dc62a8f09fe7fa8961a589f2158fa68490d40383da8bf5c40d5ab7c80772'
 'Retro Flash Welcome Workspace.png' = 'aacd51c3a3072f3199e84d4a2bafa37d62b655853be39a2f7f663a57b4be52be'
 'Yellow Pages Meets Modern Local Search.png' = 'dc5cc4ebad5eedbec9c4d0d91d0288e9e2466c443c3c9c6cfa4105bcb3dd1ee2'
}
foreach ($name in $originalHashes.Keys) {
 $copy = Get-FileHash -LiteralPath (Join-Path $root "assets/blog/$name")
 Assert ($originalHashes[$name] -eq $copy.Hash) "Image changed: $name"
}
$blogSchema = [regex]::Match($archive, '<script type="application/ld\+json">(.*?)</script>', 'Singleline').Groups[1].Value | ConvertFrom-Json
# Compare the complete current archive rather than freezing the October 20 count.
$archiveCards = @([regex]::Matches($archive, '(?s)<article\b[^>]*class="[^"]*\bblog-card\b[^"]*"[^>]*>.*?</article>'))
$archiveUrls = @($archiveCards | ForEach-Object {
 $href = [regex]::Match($_.Value, '<a\b[^>]*href="([^"]+)"').Groups[1].Value
 Assert ($href -and (Test-Path -LiteralPath (Join-Path $root $href))) 'Archive article target missing'
 'https://startweb7.com/' + $href
})
$schemaUrls = @($blogSchema.blogPost | ForEach-Object { $_.url })
Assert ($archiveUrls.Count -ge $records.Count) 'Approved archive cards missing'
# Preserve every article in the original October 20 schema while permitting later posts.
$originalArchive = git show 'b1d668d9aaa548a3247c152cb6c57ca9e061ed3d:blog.html'
Assert ($LASTEXITCODE -eq 0) 'Original archive snapshot unavailable'
$originalSchema = [regex]::Match(($originalArchive -join "`n"), '<script type="application/ld\+json">(.*?)</script>', 'Singleline').Groups[1].Value | ConvertFrom-Json
Assert ($originalSchema.blogPost.Count -eq 17) 'Original archive baseline mismatch'
foreach ($article in $originalSchema.blogPost) {
 Assert ($schemaUrls -contains $article.url) "Original archive schema article missing: $($article.url)"
}
Assert (@($schemaUrls | Select-Object -Unique).Count -eq $schemaUrls.Count) 'Duplicate archive structured data'
foreach ($url in $schemaUrls) {
 Assert ($archiveUrls -contains $url) "Structured data article missing from archive: $url"
}
Write-Output "PASS: all three original image files match verified source hashes; 17 original schema articles retained; all $($schemaUrls.Count) schema entries match real archive cards."
