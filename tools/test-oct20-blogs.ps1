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
foreach ($name in @('Flash Blocked, Website Still Waiting.png','Retro Flash Welcome Workspace.png','Yellow Pages Meets Modern Local Search.png')) {
 $original = Get-FileHash -LiteralPath (Join-Path 'C:\Users\Owner\OneDrive\Desktop' $name)
 $copy = Get-FileHash -LiteralPath (Join-Path $root "assets/blog/$name")
 Assert ($original.Hash -eq $copy.Hash) "Image changed: $name"
}
$blogSchema = [regex]::Match($archive, '<script type="application/ld\+json">(.*?)</script>', 'Singleline').Groups[1].Value | ConvertFrom-Json
Assert ($blogSchema.blogPost.Count -eq 17) 'Archive structured data count mismatch'
Write-Output 'PASS: all three original image files are byte identical; archive structured data has 17 articles.'
