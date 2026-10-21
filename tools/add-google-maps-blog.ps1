$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
$utf8 = New-Object Text.UTF8Encoding($false)
function Save($path,$text) { [IO.File]::WriteAllText((Join-Path $root $path),$text,$utf8) }
function Esc($text) { [Net.WebUtility]::HtmlEncode($text) }
function DecodeText($token) {
 if ($token.StartsWith('<')) {
  $hex=[regex]::Replace($token.Trim('<','>'),'\s','')
  $bytes=New-Object byte[] ($hex.Length/2)
  for($i=0;$i -lt $bytes.Length;$i++) {$bytes[$i]=[Convert]::ToByte($hex.Substring($i*2,2),16)}
  return [Text.Encoding]::GetEncoding(1252).GetString($bytes)
 }
 $value=$token.Substring(1,$token.Length-2)
 return [regex]::Replace($value,'\\([0-7]{1,3}|[nrtbf()\\])',[Text.RegularExpressions.MatchEvaluator]{
  param($m)
  switch -CaseSensitive ($m.Groups[1].Value) {
   'n' {"`n"} 'r' {"`r"} 't' {"`t"} 'b' { [string][char]8 } 'f' { [string][char]12 }
   default {if($m.Groups[1].Value -match '^[0-7]+$'){[string][char][Convert]::ToInt32($m.Groups[1].Value,8)}else{$m.Groups[1].Value}}
  }
 })
}
function InflateStream($raw,$id,$ascii85=$false) {
 $match=[regex]::Match($raw,'(?ms)^'+$id+' 0 obj\s*(.*?)stream\r?\n(.*?)endstream')
 if(!$match.Success) {throw "PDF content stream $id missing"}
 if($ascii85) {
  $clean=[regex]::Replace($match.Groups[2].Value,'\s|~>','')
  $buffer=New-Object 'Collections.Generic.List[byte]'
  [uint64]$acc=0; $count=0
  foreach($ch in $clean.ToCharArray()) {
   if($ch -ceq 'z' -and $count -eq 0){$buffer.AddRange([byte[]]@(0,0,0,0));continue}
   $acc=$acc*85+([int]$ch-33); $count++
   if($count -eq 5){foreach($shift in @(24,16,8,0)){$buffer.Add([byte](($acc -shr $shift)-band 255))};$acc=0;$count=0}
  }
  if($count){$remaining=$count-1;while($count -lt 5){$acc=$acc*85+84;$count++};for($i=0;$i -lt $remaining;$i++){$buffer.Add([byte](($acc -shr (24-8*$i))-band 255))}}
  $z=$buffer.ToArray()
 } else {$z=[Text.Encoding]::GetEncoding(28591).GetBytes($match.Groups[2].Value.TrimEnd("`r","`n"))}
 $inputStream=New-Object IO.MemoryStream(,[byte[]]$z[2..($z.Length-5)])
 $inflate=New-Object IO.Compression.DeflateStream($inputStream,[IO.Compression.CompressionMode]::Decompress)
 $out=New-Object IO.MemoryStream
 $inflate.CopyTo($out)
 $decoded=[Text.Encoding]::GetEncoding(1252).GetString($out.ToArray())
 $inflate.Dispose();$inputStream.Dispose();$out.Dispose()
 return $decoded
}
function TextBlocks($decoded) {
 foreach($block in [regex]::Matches($decoded,'(?s)BT\b(.*?)\bET')) {
  $pieces=@([regex]::Matches($block.Groups[1].Value,'\((?:\\.|[^\\)])*\)|<[0-9A-Fa-f\s]+>') | ForEach-Object { DecodeText $_.Value })
  if($pieces.Count){[pscustomobject]@{text=($pieces -join ' ').Trim();heading=($block.Value -match '/F2\s+12\s+Tf')}}
 }
}
$raw=[Text.Encoding]::GetEncoding(28591).GetString([IO.File]::ReadAllBytes('C:\Users\Owner\Downloads\StartWeb7_Google_Maps_Blog_UPDATED_PHOTO_NAME.pdf'))
# Page one contains the approved article and a separate filename correction overlay.
$pageOne=@(TextBlocks (InflateStream $raw 11))
$overlay=@(TextBlocks (InflateStream $raw 13))
$pageTwo=@(TextBlocks (InflateStream $raw 8 $true))
$title=$pageOne[1].text
$description=$pageOne[3].text -replace '^SEO meta description: ',''
$photo=$overlay[0].text
if($photo -cne 'Golden-Hour Poolside Workspace.png'){throw 'Unexpected photo assignment'}
$file='google-maps-verification-complete-business-still-missing.html'
$archivePath=Join-Path $root 'blog.html'
$archive=[IO.File]::ReadAllText($archivePath)
if((Test-Path -LiteralPath $file) -or $archive.Contains($title)){throw 'Exact article duplicate detected'}
$blocks=@(); $inArticle=$false; $inSources=$false; $sources=@()
foreach($block in @($pageOne)+@($pageTwo)) {
 if($block.heading -and $block.text -eq 'The verification email is not the finish line') {$inArticle=$true}
 if(!$inArticle){continue}
 if($block.text -eq 'Sources and references') {$inSources=$true;continue}
 if($block.text.StartsWith('Developer placement:')){break}
 if($inSources){$sources+=$block.text}else{$blocks+=$block}
}
if($blocks.Count -ne 14 -or $sources.Count -ne 2){throw 'Unexpected article section or source count'}
$urls=@($sources | ForEach-Object { [regex]::Match($_,'https?://\S+').Value })
$prose=''
foreach($block in $blocks) {
 if($block.heading){$prose+='<h2>'+(Esc $block.text)+"</h2>`n";continue}
 $paragraph=Esc (([regex]::Replace($block.text,'\s*\[\d+\]','')).Trim())
 # Link existing words without changing the approved writing.
 if($paragraph.StartsWith('Google Maps is ')){$paragraph=$paragraph.Replace('Google Maps is ','<a href="google-maps-leads.html">Google Maps</a> is ')}
 if($paragraph.Contains('a credible website')){$paragraph=$paragraph.Replace('a credible website','a credible <a href="google-business-profile-vs-website.html">website</a>')}
 $prose+='<p>'+ $paragraph + "</p>`n"
}
$prose+='<section class="blog-sources"><h2>Sources and references</h2><ul>'
for($i=0;$i -lt $sources.Count;$i++){
 $label=($sources[$i] -replace '^\d+\. ','').Replace(' '+$urls[$i],'')
 $prose+='<li id="source-'+($i+1)+'">'+(Esc $label)+'<br/><a href="'+(Esc $urls[$i])+'">'+(Esc $urls[$i])+'</a></li>'
}
$prose+='</ul></section>'
Copy-Item -LiteralPath (Join-Path 'C:\Users\Owner\OneDrive\Desktop' $photo) -Destination (Join-Path $root ('assets/blog/'+$photo))
$src='assets/blog/'+[uri]::EscapeDataString($photo)
$url='https://startweb7.com/'+$file
$imageUrl='https://startweb7.com/'+$src
$alt='A laptop showing a Google Maps pool builder listing beside a pool at sunset'
$img='<img src="'+$src+'" alt="'+$alt+'" width="1672" height="941" decoding="async"'
$template=[IO.File]::ReadAllText((Join-Path $root 'the-web-had-motion-and-then-flash-was-gone.html'))
$page=[regex]::Replace($template,'<title>.*?</title>|<meta\b[^>]*(?:name="(?:description|twitter:[^"]+)"|property="(?:og:[^"]+|article:[^"]+)")[^>]*?/>|<link\b[^>]*(?:rel="canonical"|as="image")[^>]*?/>|<script type="application/ld\+json">.*?</script>','','Singleline')
$page=$page.Replace('data-sw7-fit-page="the-web-had-motion-and-then-flash-was-gone"','data-sw7-fit-page="'+$file.Replace('.html','')+'"')
$schema=[ordered]@{'@context'='https://schema.org';'@type'='BlogPosting';headline=$title;description=$description;datePublished='2026-10-20';dateModified='2026-10-20';mainEntityOfPage=$url;url=$url;image=$imageUrl;inLanguage='en';isPartOf=@{'@type'='Blog';name='StartWeb7 Blog';url='https://startweb7.com/blog.html'};author=@{'@type'='Organization';name='StartWeb7';url='https://startweb7.com/'};publisher=@{'@type'='Organization';name='StartWeb7';logo=@{'@type'='ImageObject';url='https://startweb7.com/startweb7-logo.png'}};citation=$urls}
$head='<title>'+(Esc $title)+'</title><meta name="description" content="'+(Esc $description)+'"/><link rel="canonical" href="'+$url+'"/>'
foreach($pair in @(@('og:title',$title),@('og:description',$description),@('og:url',$url),@('og:type','article'),@('og:site_name','StartWeb7'),@('og:image',$imageUrl),@('og:image:alt',$alt),@('article:published_time','2026-10-20'),@('article:modified_time','2026-10-20'))){$head+='<meta property="'+$pair[0]+'" content="'+(Esc $pair[1])+'"/>'}
foreach($pair in @(@('twitter:card','summary_large_image'),@('twitter:title',$title),@('twitter:description',$description),@('twitter:image',$imageUrl),@('twitter:image:alt',$alt))){$head+='<meta name="'+$pair[0]+'" content="'+(Esc $pair[1])+'"/>'}
$head+='<link rel="preload" as="image" href="'+$src+'" fetchpriority="high"/><script type="application/ld+json">'+($schema|ConvertTo-Json -Depth 15 -Compress)+'</script>'
$page=$page.Replace('</head>',$head+'</head>')
$main='<main><header class="blog-heading" data-sw7-preserved=""><div class="sw7-feature-inner"><h1>'+(Esc $title)+'</h1><time data-publish-date="" datetime="2026-10-20">October 20, 2026</time></div></header><div class="sw7-feature-inner blog-article" data-sw7-preserved=""><figure class="blog-article-cover">'+$img+' loading="eager" fetchpriority="high"/></figure><article class="blog-prose">'+$prose+'</article><p><a class="blog-read-more" href="blog.html">Back to Blog</a></p></div></main>'
$page=[regex]::Replace($page,'<main>.*?</main>',[Text.RegularExpressions.MatchEvaluator]{param($m) $main},'Singleline')
Save $file $page
$card='<article class="blog-card"><a href="'+$file+'">'+$img+' loading="eager" fetchpriority="high" style="object-position:40% center!important"/></a><div class="blog-card-copy"><time data-publish-date="" datetime="2026-10-20">October 20, 2026</time><h2><a href="'+$file+'">'+(Esc $title)+'</a></h2><p>'+(Esc $description)+'</p><a class="blog-read-more" href="'+$file+'">Read more</a></div></article>'
$archive=[regex]::Replace($archive,'(<div[^>]*class="[^"]*blog-posts[^"]*"[^>]*>)',[Text.RegularExpressions.MatchEvaluator]{param($m) $m.Value+$card})
$archive=[regex]::Replace($archive,'<script type="application/ld\+json">(.*?)</script>',[Text.RegularExpressions.MatchEvaluator]{param($m) $data=$m.Groups[1].Value|ConvertFrom-Json;$entry=[ordered]@{'@type'='BlogPosting';headline=$title;datePublished='2026-10-20';image=$imageUrl;url=$url};$data.blogPost=@($entry)+@($data.blogPost);'<script type="application/ld+json">'+($data|ConvertTo-Json -Depth 20 -Compress)+'</script>'},'Singleline')
$archive=[regex]::Replace($archive,'(<link[^>]*rel="preload"[^>]*as="image"[^>]*href=")[^"]+','$1'+$src)
Save 'blog.html' $archive
$sitemap=[IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
$sitemap=$sitemap.Replace('</urlset>','  <url><loc>'+$url+'</loc><lastmod>2026-10-20</lastmod></url>'+"`n</urlset>")
Save 'sitemap.xml' $sitemap
Save 'tools/google-maps-approved-content.json' (@{title=$title;description=$description;date='2026-10-20';file=$file;photo=$photo;blocks=$blocks;sources=$sources;sourceUrls=$urls;imageSha256=(Get-FileHash -LiteralPath ('assets/blog/'+$photo)).Hash}|ConvertTo-Json -Depth 8)
Write-Output ('Added '+$title+' with '+$blocks.Count+' approved heading/paragraph blocks and '+$sources.Count+' references.')
