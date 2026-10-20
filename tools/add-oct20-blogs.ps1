$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
$utf8 = New-Object System.Text.UTF8Encoding($false)
function WriteUtf8($path, $value) { [IO.File]::WriteAllText((Join-Path $root $path), $value, $utf8) }
function Esc($value) { [Net.WebUtility]::HtmlEncode($value) }
$md = [IO.File]::ReadAllText('C:\Users\Owner\OneDrive\Desktop\startweb7_revised_blogs_with_image_names.md')
$template = [IO.File]::ReadAllText((Join-Path $root 'how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html'))
$archive = [IO.File]::ReadAllText((Join-Path $root 'blog.html'))
$sections = [regex]::Split($md, '(?m)^## ARTICLE \d+: ')[1..3]
$images = @('Flash Blocked, Website Still Waiting.png', '', 'Yellow Pages Meets Modern Local Search.png')
$alts = @('A laptop displaying the unsupported Adobe Flash Player message beside a website update checklist', '', 'A printed Yellow Pages directory beside a phone showing local plumbing search results')
$headings = @(
 @('A Small Animation Tool With a Large Idea','When Video Learned to Live in the Browser','The Phone That Said No','A Long Goodbye, Announced in Advance','What the Flash Era Left Behind','Why This Still Matters for Business Websites'),
 @('Spam, Fake Accounts, and a Problem of Trust','Two Words, One Known and One Lost','From Melted Letters to Traffic Lights','The Test That Trained Its Opponent','Frustration as a Cultural Experience','The Real Business Cost of a Difficult Verification Test'),
 @('A Directory Printed on Yellow Paper','Visibility You Bought Once a Year','The Phone in Every Pocket','Brighton, the First Town and the Last Delivery','What Was Lost With the Shared Page','From the Printed Category to the Search Question')
)
$cards = ''
$entries = @()
$records = @()
foreach ($i in 0..2) {
 $section = $sections[$i]
 $title = ($section -split '\r?\n')[0].Trim()
 $description = [regex]::Match($section, '(?m)^Meta description: (.+)').Groups[1].Value.Trim()
 $match = [regex]::Match($section, '(?s)Suggested file: ([^ |]+) \| October 20, 2026 (.*?)\s+Sources: (.*)')
 if (!$match.Success) { throw "Cannot parse $title" }
 $file = $match.Groups[1].Value
 if (Test-Path $file) { throw "Duplicate: $file" }
 if ($archive.Contains($title)) { throw "Duplicate title: $title" }
 $body = $match.Groups[2].Value.Trim()
 $originalBody = $body
 foreach ($heading in $headings[$i]) { $body = $body.Replace($heading, "`n`n## $heading`n`n") }
 $prose = ''
 foreach ($block in [regex]::Split($body, '\r?\n\s*\r?\n')) {
  $block = $block.Trim()
  if (!$block) { continue }
  if ($block.StartsWith('## ')) { $prose += '<h2>' + (Esc $block.Substring(3)) + "</h2>`n" }
  else {
   # Restore readable paragraphs without changing any of the supplied words.
   $sentences = [regex]::Split($block, '(?<=[.!?])\s+(?=[A-Z])')
   for ($j=0; $j -lt $sentences.Count; $j+=3) {
    $end = [Math]::Min($j+2, $sentences.Count-1)
    $prose += '<p>' + (Esc ($sentences[$j..$end] -join ' ')) + "</p>`n"
   }
  }
 }
 $sourceHtml = '<section class="blog-sources"><h2>Sources</h2><ul>'
 $urls = [regex]::Matches($match.Groups[3].Value, 'https?://[^\s]+') | ForEach-Object Value
 foreach ($url in $urls) {
  $labelMatch = [regex]::Match($match.Groups[3].Value, '(?m)^([^\r\n]+): ' + [regex]::Escape($url))
  $label = if ($labelMatch.Success) { $labelMatch.Groups[1].Value } else { ([uri]$url).Host }
  $sourceHtml += '<li><a href="' + (Esc $url) + '">' + (Esc $label) + '</a></li>'
 }
 $prose += $sourceHtml + '</ul></section>'
 $url = 'https://startweb7.com/' + $file
 $schema = [ordered]@{'@context'='https://schema.org';'@type'='BlogPosting';headline=$title;description=$description;datePublished='2026-10-20';dateModified='2026-10-20';mainEntityOfPage=$url;url=$url;inLanguage='en';isPartOf=@{'@type'='Blog';name='StartWeb7 Blog';url='https://startweb7.com/blog.html'};author=@{'@type'='Organization';name='StartWeb7';url='https://startweb7.com/'};publisher=@{'@type'='Organization';name='StartWeb7';logo=@{'@type'='ImageObject';url='https://startweb7.com/startweb7-logo.png'}}}
 $cover = ''; $cardImage = ''; $imageMeta = ''
 if ($images[$i]) {
  $name = $images[$i]
  Copy-Item -LiteralPath (Join-Path 'C:\Users\Owner\OneDrive\Desktop' $name) -Destination (Join-Path $root "assets/blog/$name")
  $src = 'assets/blog/' + [uri]::EscapeDataString($name)
  $width = if ($i -eq 2) {1536} else {1672}
  $height = if ($i -eq 2) {1024} else {941}
  $img = '<img src="' + $src + '" alt="' + (Esc $alts[$i]) + '" width="' + $width + '" height="' + $height + '" decoding="async"'
  $cover = '<figure class="blog-article-cover">' + $img + ' loading="eager" fetchpriority="high"/></figure>'
  $cardImage = '<a href="' + $file + '">' + $img + ' loading="lazy"/></a>'
  $schema.image = 'https://startweb7.com/' + $src
  $imageMeta = '<meta property="og:image" content="' + $schema.image + '"/><meta name="twitter:image" content="' + $schema.image + '"/><meta property="og:image:alt" content="' + (Esc $alts[$i]) + '"/>'
 }
 if ($i -eq 0) {
  $support = 'Retro Flash Welcome Workspace.png'
  Copy-Item -LiteralPath (Join-Path 'C:\Users\Owner\OneDrive\Desktop' $support) -Destination (Join-Path $root "assets/blog/$support")
  $prose = $prose.Replace('<h2>When Video Learned to Live in the Browser</h2>', '<figure class="blog-article-cover"><img src="assets/blog/Retro%20Flash%20Welcome%20Workspace.png" alt="A colorful retro Macromedia Flash welcome page displayed on a laptop" width="1672" height="941" loading="lazy" decoding="async"/></figure><h2>When Video Learned to Live in the Browser</h2>')
 }
 $head = '<title>' + (Esc $title) + ' | StartWeb7</title><meta name="description" content="' + (Esc $description) + '"/><link rel="canonical" href="' + $url + '"/>'
 foreach ($pair in @(@('og:title',$title),@('og:description',$description),@('og:url',$url),@('og:type','article'),@('og:site_name','StartWeb7'),@('article:published_time','2026-10-20'),@('article:modified_time','2026-10-20'))) { $head += '<meta property="' + $pair[0] + '" content="' + (Esc $pair[1]) + '"/>' }
 $twitterCard = if ($images[$i]) {'summary_large_image'} else {'summary'}
 $head += '<meta name="twitter:card" content="' + $twitterCard + '"/><meta name="twitter:title" content="' + (Esc $title) + '"/><meta name="twitter:description" content="' + (Esc $description) + '"/>' + $imageMeta + '<script type="application/ld+json">' + ($schema | ConvertTo-Json -Depth 12 -Compress) + '</script>'
 $page = [regex]::Replace($template, '<title>.*?</title>|<meta [^>]*(?:name="(?:description|twitter:[^"]+)"|property="(?:og:[^"]+|article:[^"]+)")[^>]*?/>|<link [^>]*(?:rel="canonical"|as="image")[^>]*?/>|<script type="application/ld\+json">.*?</script>', '', 'Singleline')
 $page = $page.Replace('</head>', $head + '</head>')
 $page = $page.Replace('data-sw7-fit-page="how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals"', 'data-sw7-fit-page="' + $file.Replace('.html','') + '"')
 $main = '<main><header class="blog-heading" data-sw7-preserved=""><div class="sw7-feature-inner"><h1>' + (Esc $title) + '</h1><time data-publish-date="" datetime="2026-10-20">October 20, 2026</time></div></header><div class="sw7-feature-inner blog-article" data-sw7-preserved="">' + $cover + '<article class="blog-prose">' + $prose + '</article><p><a class="blog-read-more" href="blog.html">Back to Blog</a></p></div></main>'
 $page = [regex]::Replace($page, '<main>.*?</main>', [Text.RegularExpressions.MatchEvaluator]{param($m) $main}, 'Singleline')
 WriteUtf8 $file $page
 $cards += '<article class="blog-card">' + $cardImage + '<div class="blog-card-copy"><time data-publish-date="" datetime="2026-10-20">October 20, 2026</time><h2><a href="' + $file + '">' + (Esc $title) + '</a></h2><p>' + (Esc $description) + '</p><a class="blog-read-more" href="' + $file + '">Read more</a></div></article>'
 $entry = [ordered]@{'@type'='BlogPosting';headline=$title;datePublished='2026-10-20';url=$url}
 if ($schema.image) { $entry.image = $schema.image }
 $entries += $entry
 $records += @{file=$file;body=$originalBody;urls=@($urls);title=$title}
}
$archive = [regex]::Replace($archive, '(<div[^>]*class="[^"]*blog-posts[^"]*"[^>]*>)', [Text.RegularExpressions.MatchEvaluator]{param($m) $m.Value + $cards})
$archive = [regex]::Replace($archive, '<script type="application/ld\+json">(.*?)</script>', [Text.RegularExpressions.MatchEvaluator]{param($m) $data = $m.Groups[1].Value | ConvertFrom-Json; $data.blogPost = @($entries) + @($data.blogPost); '<script type="application/ld+json">' + ($data | ConvertTo-Json -Depth 15 -Compress) + '</script>'}, 'Singleline')
WriteUtf8 'blog.html' $archive
$sitemap = [IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
foreach ($record in $records) { $sitemap = $sitemap.Replace('</urlset>', '  <url><loc>https://startweb7.com/' + $record.file + '</loc><lastmod>2026-10-20</lastmod></url>' + "`n</urlset>") }
$sitemap = [regex]::Replace($sitemap, '(<loc>https://startweb7.com/blog.html</loc>\s*<lastmod>)[^<]+', '${1}2026-10-20')
WriteUtf8 'sitemap.xml' $sitemap
WriteUtf8 'tools/oct20-content-check.json' ($records | ConvertTo-Json -Depth 8)
Write-Output 'Created all three article pages, archive cards, metadata, images, and sitemap entries.'
