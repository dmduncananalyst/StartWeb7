$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
$utf8 = New-Object Text.UTF8Encoding($false)
function Save($path, $text) { [IO.File]::WriteAllText((Join-Path $root $path), $text, $utf8) }
function Esc($text) { [Net.WebUtility]::HtmlEncode($text) }
$version = '20261020-audit'
$questionAlts = @(
 'Three business people','Report with a bar chart and check mark','Identification badge','Checklist on a clipboard','Flag on a pole','Key','Hourglass','First place medal',
 'Storefront with an awning','Shield with a check mark','Quotation marks in speech bubbles','Dollar sign','Stopwatch','Review cards with a star','Social media photo cards','Camera',
 'Briefcase','People connected in a network','Open envelope','Calendar with a clock','Computer mouse beside an advertisement','Advertising controls with an upward arrow','Padlock','Target with an arrow',
 'Advertising bar chart with an upward arrow','Website window with a heart','Telephone','Hammer beside a website window','Image with a copyright symbol','Contact card tray','Address book','Website window with a leaf',
 'Advertisement beside a search result','Location pin on a map','Thumbs up in a speech bubble','Clock','Open book with a bar chart','Speech bubble above an open book','Signpost with chart and advertising signs','Artist palette beside an advertisement',
 'Person with a check mark and a number one badge','House with an older person','Bar chart with an upward arrow','House with a key','Route across a map','Medal with a star and speech bubble','Website and profile review cards','Tools beside a flag',
 'Calendar with a snowflake','Hard hat beside a clock','Certificate beside a shield','Storefront with a location pin','Website blueprint','Handshake','Calendar encircled by arrows','Connected city skylines',
 'Service van','Ledger beside a calculator','Five star review card','Microchip with code brackets','Two speech bubbles'
)
$categoryAlts = @{'seo'='Three level podium numbered one, two and three';'ai-search'='Blue and silver speech bubbles';'digital-marketing'='Camera with an envelope';'paid-ads'='Sponsored advertisement sign';'websites'='Website window with a question mark'}
$titles = @{
 'buying-legal-leads-california-oregon-2026.html'='Buying Legal Leads in California & Oregon, 2026 | StartWeb7'
 'from-ten-blue-links-to-ai-answers.html'='From Blue Links to AI Answers in Google Search | StartWeb7'
 'the-cookie-that-would-not-die.html'='Google and the Cookie That Would Not Die | StartWeb7'
 'how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html'='How Craigslist Outlived Prettier Rivals | StartWeb7'
 'the-fake-review-epidemic.html'='The Fake Review Epidemic and Online Trust | StartWeb7'
 'what-should-a-business-website-include-to-get-more-customers.html'='What Your Business Website Should Include | StartWeb7'
 'commercial-cleaning.html'='Commercial Cleaning Website Design, SEO + AEO | StartWeb7'
 'how-to-tell-if-your-seo-company-is-actually-doing-anything.html'='How to Check Your SEO Company’s Work | StartWeb7'
 'should-i-hire-an-agency-a-freelancer-or-do-seo-myself.html'='SEO Agency, Freelancer or Doing It Yourself? | StartWeb7'
 'can-i-pay-chatgpt-to-recommend-my-business.html'='ChatGPT Ads and Business Recommendations | StartWeb7'
 'opening-a-business-alone-or-with-a-partner.html'='Starting a Business Alone or With a Partner | StartWeb7'
 'assisted-living.html'='Assisted Living Website Design, SEO + AEO | StartWeb7'
 'wix-or-squarespace-vs-hiring-a-professional.html'='Wix, Squarespace or a Website Professional? | StartWeb7'
 'wikipedia-is-feeding-the-ai-era-while-losing-its-readers.html'='Wikipedia Feeds AI While Losing Readers | StartWeb7'
 'why-is-my-website-not-bringing-in-customers.html'='Why Your Website Is Not Bringing In Customers | StartWeb7'
 'home-health-care.html'='Home Health Care Website Design, SEO + AEO | StartWeb7'
 'how-do-i-get-my-business-recommended-by-chatgpt.html'='Get Your Business Recommended by ChatGPT | StartWeb7'
 'are-you-a-robot-captcha-taught-machines-to-read.html'='CAPTCHA: The Test That Taught Machines to Read | StartWeb7'
}
$descriptions = @{
 'angi-vs-thumbtack-pool-builders.html'='Compare Angi and Thumbtack for pool builder leads, including lead costs, competition, project fit and how your website can support direct inquiries.'
 'how-to-get-more-assisted-living-residents.html'='Help families discover your assisted living community with clear care information, useful photos, local search visibility and simple ways to arrange a tour.'
 'buying-legal-leads-california-oregon-2026.html'='Review paid legal leads, referrals and client solicitation in California and Oregon, including the rules law firms should consider before buying leads.'
}
function CleanLegacyCss($text) {
 # Work only on flat CSS rules. Preserve shared declarations and media wrappers.
 [regex]::Replace($text, '([^{}]+)\{([^{}]*)\}', [Text.RegularExpressions.MatchEvaluator]{
  param($m)
  $selector = $m.Groups[1].Value
  if ($selector -notmatch '\.(?:quick-form|service-select|sw7-form-|submit-btn)|#(?:quickForm|serviceSelect|selectedService)') { return $m.Value }
  $keep = @($selector -split ',' | Where-Object { $_ -notmatch '\.(?:quick-form|service-select|sw7-form-|submit-btn)|#(?:quickForm|serviceSelect|selectedService)' })
  if (!$keep.Count) { return '' }
  return ($keep -join ',') + '{' + $m.Groups[2].Value + '}'
 })
}
New-Item -ItemType Directory -Path assets/site -Force | Out-Null
$changed = @()
foreach ($file in Get-ChildItem -File -Filter '*.html') {
 $text = [IO.File]::ReadAllText($file.FullName)
 $before = $text
 $text = $text.Replace('href="index.html"', 'href="/"').Replace("href='index.html'", "href='/'").Replace('href=\"index.html\"', 'href=\"/\"')
 $text = [regex]::Replace($text, '<img\b[^>]*>', [Text.RegularExpressions.MatchEvaluator]{
  param($m)
  $tag = $m.Value
  if ($tag -match 'src="data:image/[^;]+;base64,[^"]+"' -and $tag -match 'alt="StartWeb7') { $tag = [regex]::Replace($tag, 'src="data:image/[^;]+;base64,[^"]+"', 'src="startweb7-logo.png"') }
  if ($tag -notmatch 'alt=""') { return $tag }
  $src = [regex]::Match($tag, 'src="([^"]+)"').Groups[1].Value
  $alt = $null
  if ($src -match 'assets/resources/question-graphics/(\d+)\.webp') { $alt = $questionAlts[[int]$Matches[1]-1] }
  elseif ($tag -match 'resource-category-image' -and $src -match 'assets/resources/([^/]+)\.webp') { $alt = $categoryAlts[$Matches[1]] }
  if ($alt) { return $tag.Replace('alt=""', 'alt="' + (Esc $alt) + '"') }
  if ($tag -notmatch 'aria-hidden=') { $tag = $tag.Replace('alt=""', 'alt="" aria-hidden="true"') }
  return $tag
 })
 # Described question illustrations must also be exposed through their wrappers.
 $text = [regex]::Replace($text, '<span\b[^>]*aria-hidden="true"[^>]*>\s*(<img\b[^>]*src="assets/resources/question-graphics/[^>]*>)', [Text.RegularExpressions.MatchEvaluator]{param($m) $m.Value.Replace('aria-hidden="true"', '')})
 # Preserve exact pixels for non-logo images, including the map and video poster.
 $text = [regex]::Replace($text, 'data:image/([^;]+);base64,([A-Za-z0-9+/=]+)', [Text.RegularExpressions.MatchEvaluator]{
  param($m)
  $bytes = [Convert]::FromBase64String($m.Groups[2].Value)
  $hash = [BitConverter]::ToString(([Security.Cryptography.SHA256]::Create()).ComputeHash($bytes)).Replace('-','').Substring(0,12).ToLower()
  $ext = switch ($m.Groups[1].Value) { 'jpeg' {'jpg'} 'svg+xml' {'svg'} default {$m.Groups[1].Value} }
  $asset = "assets/site/image-$hash.$ext"
  if (!(Test-Path -LiteralPath $asset)) { [IO.File]::WriteAllBytes((Join-Path $root $asset), $bytes) }
  return $asset
 })
 $text = [regex]::Replace($text, '<script\b[^>]*>\s*/\* Working no-backend fallback\..*?</script>', '', 'Singleline')
 $text = [regex]::Replace($text, '<script\b[^>]*src="article-contact-form\.js[^\"]*"[^>]*>\s*</script>', '')
 $text = [regex]::Replace($text, '(?s)(<style\b[^>]*>)(.*?)(</style>)', [Text.RegularExpressions.MatchEvaluator]{param($m) $m.Groups[1].Value + (CleanLegacyCss $m.Groups[2].Value) + $m.Groups[3].Value})
 $text = [regex]::Replace($text, '(startweb7-contact-chat-v2\.js\?v=)[^"''\s<>]+', '${1}' + $version)
 $text = [regex]::Replace($text, '(universal-nav-fix\.js\?v=)[^"''\s<>]+', '${1}' + $version)
 if ($titles.ContainsKey($file.Name)) {
  $title = Esc $titles[$file.Name]
  $text = [regex]::Replace($text, '<title>.*?</title>', '<title>' + $title + '</title>')
  $text = [regex]::Replace($text, '<meta\b[^>]*(?:name="twitter:title"|property="og:title")[^>]*>', [Text.RegularExpressions.MatchEvaluator]{param($m) [regex]::Replace($m.Value, 'content="[^"]*"', 'content="' + $title + '"')})
 }
 if ($descriptions.ContainsKey($file.Name)) {
  $desc = Esc $descriptions[$file.Name]
  $text = [regex]::Replace($text, '<meta\b[^>]*(?:name="(?:description|twitter:description)"|property="og:description")[^>]*>', [Text.RegularExpressions.MatchEvaluator]{param($m) [regex]::Replace($m.Value, 'content="[^"]*"', 'content="' + $desc + '"')})
  $text = [regex]::Replace($text, '<script type="application/ld\+json">(.*?)</script>', [Text.RegularExpressions.MatchEvaluator]{param($m) $data = $m.Groups[1].Value | ConvertFrom-Json; if ($data.PSObject.Properties['description']) {$data.description=$descriptions[$file.Name]}; '<script type="application/ld+json">' + ($data | ConvertTo-Json -Depth 30 -Compress) + '</script>'}, 'Singleline')
 }
 if ($text -cne $before) { Save $file.Name $text; $changed += $file.Name }
}
# Add the comparison where visitors are already reading about pool company leads.
$pool = [IO.File]::ReadAllText((Join-Path $root 'pool-construction.html'))
if (!$pool.Contains('href="angi-vs-thumbtack-pool-builders.html"')) {
 $needle = '<h3>Meet people during the planning stage</h3>'
 if (!$pool.Contains($needle)) { throw 'Pool insertion point missing' }
 $pool = $pool.Replace($needle, '<h3>Compare sources of pool project inquiries</h3><p>Paid lead platforms offer another route to pool projects. Read our <a href="angi-vs-thumbtack-pool-builders.html">Angi and Thumbtack comparison for pool builders</a> to compare lead costs, competition and project fit alongside your own website.</p>' + $needle)
 Save 'pool-construction.html' $pool
}
$nav = [IO.File]::ReadAllText((Join-Path $root 'universal-nav-fix.js'))
$nav = $nav.Replace("brand.href = 'index.html'", "brand.href = '/'").Replace("pageBackLink.href = 'index.html'", "pageBackLink.href = '/'").Replace("window.location.href = 'index.html'", "window.location.href = '/'").Replace('href=\"index.html\"','href=\"/\"').Replace('href="index.html"','href="/"')
$nav = $nav.Replace('alt=\"\"', 'alt=\"\" aria-hidden=\"true\"')
$nav = [regex]::Replace($nav, '(startweb7-contact-chat-v2\.js\?v=)[^"''\s<>]+', '${1}' + $version)
$nav = [regex]::Replace($nav, '(?s)\(function \(\) \{\s*const serviceSelect = document\.getElementById\(''serviceSelect''\);.*?\}\)\(\);', '')
$nav = [regex]::Replace($nav, '(?s)\(function \(\) \{\s*const actionButtons = document\.querySelectorAll\(''\.hero-action,\.sw7-lead-source-cta a,\.tool-cta-action a,\.home-start''\);.*?\}\)\(\);', '')
# Legacy popup styles are entirely separate from the active chat styles.
$nav = [regex]::Replace($nav, '(?s)(\.textContent\s*=\s*`)(.*?)(`\s*;)', [Text.RegularExpressions.MatchEvaluator]{param($m) $m.Groups[1].Value + (CleanLegacyCss $m.Groups[2].Value) + $m.Groups[3].Value})
Save 'universal-nav-fix.js' $nav
foreach ($cssFile in Get-ChildItem -File -Filter '*.css') {
 $css = [IO.File]::ReadAllText($cssFile.FullName)
 $cleaned = CleanLegacyCss $css
 if ($cleaned -cne $css) { Save $cssFile.Name $cleaned }
}
# Keep existing email controls available in case an older page uses them.
$articleJs = [IO.File]::ReadAllText((Join-Path $root 'article-contact-form.js'))
$articleJs = [regex]::Replace($articleJs, '(?s)  const serviceSelect=.*?(?=  const emailButton=)', '')
Save 'article-contact-form.js' $articleJs
# Supply the existing working chat directly in contact.html, independent of nav.
$homepageText = [IO.File]::ReadAllText((Join-Path $root 'index.html'))
$chat = [regex]::Match($homepageText, '(?s)<button\b[^>]*id="openHomeChat"[^>]*>.*?</button><section\b[^>]*id="homeContactChat"[^>]*>.*?</section>').Value
if (!$chat) { throw 'Static home chat not found' }
$contact = [IO.File]::ReadAllText((Join-Path $root 'contact.html'))
if (!$contact.Contains('id="homeContactChat"')) {
 $contact = [regex]::Replace($contact, '(<script\b[^>]*src="universal-nav-fix\.js[^>]*>)', [Text.RegularExpressions.MatchEvaluator]{param($m) $chat + $m.Value})
 $contact = $contact.Replace('</body>', '<noscript><p style="padding:24px;text-align:center">Call <a href="tel:+18189340444">(818) 934-0444</a> or <a href="mailto:desirae@startweb7.com">email StartWeb7</a> to send your inquiry.</p></noscript><script src="startweb7-contact-chat-v2.js?v=' + $version + '"></script></body>')
 Save 'contact.html' $contact
}
# Invalidate sitemap dates only for pages changed by this audit.
[xml]$sitemap = [IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
foreach ($entry in $sitemap.urlset.url) {
 $filename = ([uri]$entry.loc).AbsolutePath.TrimStart('/')
 if (!$filename) { $filename='index.html' }
 if ($changed -contains $filename) { $entry.lastmod = '2026-10-20' }
}
$settings = New-Object Xml.XmlWriterSettings
$settings.Indent=$true; $settings.Encoding=$utf8
$writer = [Xml.XmlWriter]::Create((Join-Path $root 'sitemap.xml'), $settings)
$sitemap.Save($writer); $writer.Dispose()
Write-Output ('Updated ' + $changed.Count + ' pages, shared navigation, legacy handlers, contact resilience and sitemap dates.')
