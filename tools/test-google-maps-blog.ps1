$ErrorActionPreference='Stop'
$root=Split-Path $PSScriptRoot -Parent
Set-Location $root
function Assert($condition,$message){if(!$condition){throw $message}}
function Plain($html){[Net.WebUtility]::HtmlDecode([regex]::Replace($html,'<[^>]+>',''))}
$approved=Get-Content tools/google-maps-approved-content.json -Raw -Encoding UTF8 | ConvertFrom-Json
$page=[IO.File]::ReadAllText((Join-Path $root $approved.file))
$archive=[IO.File]::ReadAllText((Join-Path $root 'blog.html'))
$prose=[regex]::Match($page,'(?s)<article class="blog-prose">(.*?)<section class="blog-sources">').Groups[1].Value
$actual=@([regex]::Matches($prose,'(?s)<(h2|p)>(.*?)</\1>'))
Assert ($actual.Count -eq $approved.blocks.Count) 'Article block count differs from PDF'
foreach($i in 0..($actual.Count-1)){
 $expected=([regex]::Replace($approved.blocks[$i].text,'\s*\[\d+\]','')).Trim()
 Assert ((Plain $actual[$i].Groups[2].Value) -ceq $expected) "Approved text differs at block $i"
 Assert (($actual[$i].Groups[1].Value -eq 'h2') -eq $approved.blocks[$i].heading) "Heading structure differs at block $i"
}
Assert ((Plain ([regex]::Match($page,'<title>(.*?)</title>').Groups[1].Value)) -ceq $approved.title) 'SEO title mismatch'
$meta=[regex]::Match($page,'<meta name="description" content="([^"]*)"').Groups[1].Value
Assert ((Plain $meta) -ceq $approved.description) 'Meta description mismatch'
foreach($url in $approved.sourceUrls){Assert ($page.Contains('href="'+[Net.WebUtility]::HtmlEncode($url)+'"')) "Missing clickable reference: $url"}
$references=@([regex]::Matches($page,'(?s)<li id="source-\d+">(.*?)</li>'))
foreach($i in 0..($references.Count-1)){
 $reference=(Plain ($references[$i].Groups[1].Value.Replace('<br/>',' ')))
 Assert (($reference -replace '\s+',' ').Trim() -ceq ($approved.sources[$i] -replace '^\d+\. ','')) 'Reference text differs'
}
Assert ($references.Count -eq 2) 'Reference count differs'
Assert ($prose -notmatch '\[\d+\]' -and $page -notmatch '<ol>') 'Visible reference numbering remains'
$src='assets/blog/'+[uri]::EscapeDataString($approved.photo)
Assert ($page.Contains('src="'+$src+'"')) 'Assigned article image missing'
$cards=@([regex]::Matches($archive,'(?s)<article class="blog-card">(?:(?!</article>).)*</article>')|Where-Object {$_.Value.Contains('href="'+$approved.file+'"')})
Assert ($cards.Count -eq 1) 'Expected exactly one matching archive card'
Assert ($cards[0].Value.Contains('src="'+$src+'"')) 'Archive photo assignment mismatch'
Assert ((Get-FileHash -LiteralPath ('assets/blog/'+$approved.photo)).Hash -eq $approved.imageSha256) 'Copied image changed'
Assert ((Get-FileHash -LiteralPath (Join-Path 'C:\Users\Owner\OneDrive\Desktop' $approved.photo)).Hash -eq $approved.imageSha256) 'Copied image differs from original photo'
$schema=[regex]::Match($page,'(?s)<script type="application/ld\+json">(.*?)</script>').Groups[1].Value|ConvertFrom-Json
Assert ($schema.headline -ceq $approved.title -and $schema.description -ceq $approved.description -and $schema.image -eq ('https://startweb7.com/'+$src)) 'Article schema mismatch'
[xml]$sitemap=[IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
Assert (@($sitemap.urlset.url|Where-Object loc -EQ ('https://startweb7.com/'+$approved.file)).Count -eq 1) 'Expected one sitemap entry'
Assert ($prose -notmatch 'FAQ|next steps|[\u2013\u2014]') 'Unapproved section or dash introduced'
Assert ($page.Contains('href="google-maps-leads.html"') -and $page.Contains('href="google-business-profile-vs-website.html"')) 'Contextual internal links missing'
Assert (([IO.File]::ReadAllText((Join-Path $root 'assets/translations/current.js'))).Contains('locales:{}')) 'Existing inactive translation setup changed'
Write-Output 'PASS: PDF writing and headings preserved with reference numbers removed as requested; source links, image, archive, SEO, schema, internal links, sitemap, and translation state verified.'
