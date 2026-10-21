$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
function Assert($condition, $message) { if (!$condition) { throw $message } }
function Attribute($tag, $name) { [Net.WebUtility]::HtmlDecode([regex]::Match($tag, '\b' + [regex]::Escape($name) + '="([^"]*)"').Groups[1].Value) }
[xml]$sitemap = [IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
$titles=@{}; $descriptions=@{}; $pageCount=0; $imageCount=0; $linkCount=0; $inlineSaved=0
$approvedBlog = if (Test-Path tools/google-maps-approved-content.json) { Get-Content tools/google-maps-approved-content.json -Raw -Encoding UTF8 | ConvertFrom-Json } else { $null }
foreach ($entry in $sitemap.urlset.url) {
 $filename=([uri]$entry.loc).AbsolutePath.TrimStart('/'); if (!$filename) {$filename='index.html'}
 $path=Join-Path $root $filename
 Assert (Test-Path -LiteralPath $path) "Missing sitemap page $filename"
 $html=[IO.File]::ReadAllText($path)
 Assert ($html -notmatch 'data:image/') "Embedded image remains in $filename"
 Assert ($html -notmatch 'quick-form|quickForm|serviceSelect|article-contact-form\.js') "Obsolete form code in $filename"
 Assert ($html -notmatch 'href="index.html"|href=\\"index.html\\"') "Duplicate homepage URL in $filename"
 Assert (([regex]::Matches($html,'<h1\b')).Count -eq 1) "H1 count in $filename"
 $title=[Net.WebUtility]::HtmlDecode([regex]::Match($html,'<title>(.*?)</title>').Groups[1].Value)
 $approvedExactTitle = $approvedBlog -and $filename -eq $approvedBlog.file -and $title -ceq $approvedBlog.title
 Assert ($title.Length -gt 0 -and ($title.Length -le 65 -or $approvedExactTitle)) "Title length $($title.Length) in $filename"
 Assert (!$titles.ContainsKey($title)) "Duplicate title in $filename"
 $titles[$title]=$true
 $descriptionTag=[regex]::Match($html,'<meta\b[^>]*name="description"[^>]*>').Value
 $description=Attribute $descriptionTag 'content'
 Assert ($description.Length -gt 0 -and $description.Length -le 160) "Description length $($description.Length) in $filename"
 Assert (!$descriptions.ContainsKey($description)) "Duplicate description in $filename"
 $descriptions[$description]=$true
 $canonical=[regex]::Matches($html,'<link\b[^>]*rel="canonical"[^>]*>')
 Assert ($canonical.Count -eq 1) "Canonical count in $filename"
 Assert ((Attribute $canonical[0].Value 'href') -eq $entry.loc) "Canonical URL in $filename"
 Assert ($html -notmatch 'content="[^"]*noindex') "Unexpected noindex in $filename"
 foreach ($schema in [regex]::Matches($html,'(?s)<script type="application/ld\+json">(.*?)</script>')) {
  $null=$schema.Groups[1].Value | ConvertFrom-Json
 }
 foreach ($img in [regex]::Matches($html,'<img\b[^>]*>')) {
  $src=Attribute $img.Value 'src'; $alt=Attribute $img.Value 'alt'
  Assert ($src.Length -gt 0) "Empty image source in $filename"
  Assert ($alt -or (Attribute $img.Value 'aria-hidden') -eq 'true') "Undescribed image in $filename ($src)"
  $imageCount++
 }
 foreach ($tag in [regex]::Matches($html,'<(?:a|link|img|script|source|video)\b[^>]*>')) {
  foreach ($name in @('href','src','poster')) {
   $target=Attribute $tag.Value $name
   if (!$target -or $target -match '^(?:https?:|tel:|mailto:|data:|#|javascript:)') {continue}
   $target=[uri]::UnescapeDataString(($target -split '[?#]')[0]).TrimStart('/')
   if (!$target) {$target='index.html'}
   Assert (Test-Path -LiteralPath (Join-Path $root $target)) "Broken local target in ${filename}: $target"
   $linkCount++
  }
 }
 $pageCount++
}
$pool=[IO.File]::ReadAllText((Join-Path $root 'pool-construction.html'))
Assert ($pool.Contains('href="angi-vs-thumbtack-pool-builders.html"')) 'Pool comparison is orphaned'
$versions=@()
foreach ($file in Get-ChildItem -File -Path * -Include '*.html','*.js','*.css') {
 $text=[IO.File]::ReadAllText($file.FullName)
 Assert ($text -notmatch 'quick-form|quickForm|serviceSelect') "Legacy form code in $($file.Name)"
 foreach ($m in [regex]::Matches($text, 'startweb7-contact-chat-v2\.js\?v=([^"''\s<>]+)')) {$versions+=$m.Groups[1].Value}
}
Assert (@($versions | Select-Object -Unique).Count -eq 1) 'Chat script versions differ'
$contact=[IO.File]::ReadAllText((Join-Path $root 'contact.html'))
Assert ($contact.Contains('id="homeChatComposer"')) 'Contact static form missing'
Assert ($contact.IndexOf('id="homeContactChat"') -lt $contact.IndexOf('<script src="universal-nav-fix.js')) 'Contact markup follows nav initialization'
Assert ($contact.Contains('<noscript>')) 'Contact no-script fallback missing'
Assert (!(Test-Path -LiteralPath (Join-Path $root 'audit-startweb7-2026-10-18.pdf'))) 'Audit PDF should not be in the website'
$blogRecords=Get-Content tools/oct20-content-check.json -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($record in $blogRecords) {
 $html=[IO.File]::ReadAllText((Join-Path $root $record.file))
 $prose=[regex]::Match($html,'(?s)<article class="blog-prose">(.*?)<section class="blog-sources">').Groups[1].Value
 $plain=[Net.WebUtility]::HtmlDecode([regex]::Replace($prose,'<[^>]+>',' '))
 Assert (([regex]::Replace($plain,'\s+',' ')).Trim() -ceq ([regex]::Replace($record.body,'\s+',' ')).Trim()) "Blog content changed in $($record.file)"
}
Write-Output "PASS: $pageCount pages, $imageCount images, $linkCount local asset/link references, unique metadata, canonical URLs, JSON schemas, legacy cleanup, contact resilience, and preserved October 20 blog content."
Write-Output ('PASS: shared chat version ' + ($versions | Select-Object -Unique))
