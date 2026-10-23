$ErrorActionPreference='Stop'
$pdf=[IO.File]::ReadAllText('C:/Users/Owner/OneDrive/Desktop/StartWeb7_Revised_Page_Copy_Interior_Design_FINAL_REVIEW.pdf',[Text.Encoding]::GetEncoding(28591))
$output=@()
foreach($m in [regex]::Matches($pdf,'(?s)stream\r?\n(.*?)\r?\nendstream')) {
 $s=[regex]::Replace($m.Groups[1].Value,'\s','') -replace '~>$',''
 $bytes=New-Object 'System.Collections.Generic.List[byte]'
 $group=New-Object 'System.Collections.Generic.List[int]'
 foreach($ch in $s.ToCharArray()) {
  if($ch -ceq 'z' -and $group.Count -eq 0){$bytes.AddRange([byte[]](0,0,0,0));continue}
  $group.Add(([int]$ch-33))
  if($group.Count -eq 5){[long]$v=0;foreach($n in $group){$v=$v*85+$n};for($i=3;$i -ge 0;$i--){$bytes.Add([byte](($v -shr ($i*8)) -band 255))};$group.Clear()}
 }
 if($group.Count){$count=$group.Count;while($group.Count -lt 5){$group.Add(84)};[long]$v=0;foreach($n in $group){$v=$v*85+$n};for($i=0;$i -lt $count-1;$i++){$bytes.Add([byte](($v -shr ((3-$i)*8)) -band 255))}}
 $arr=$bytes.ToArray();$ms=New-Object IO.MemoryStream(,$arr);$ms.Position=2
 $ds=New-Object IO.Compression.DeflateStream($ms,[IO.Compression.CompressionMode]::Decompress)
 $sr=New-Object IO.StreamReader($ds,[Text.Encoding]::GetEncoding(28591));$raw=$sr.ReadToEnd();$sr.Dispose()
 $lines=@();foreach($t in [regex]::Matches($raw,'\(((?:\\.|[^\\)])*)\)\s*Tj')){$line=$t.Groups[1].Value;$line=[regex]::Replace($line,'\\([0-7]{1,3})',{param($x) [string][char][Convert]::ToInt32($x.Groups[1].Value,8)});$line=$line -replace '\\([()\\])','$1';$lines+=$line}
 $output+=('=== PAGE '+($output.Count+1)+' ==='+"`n"+($lines -join "`n"))
}
New-Item -ItemType Directory -Force verification/oct22 | Out-Null
$output -join "`n`n" | Set-Content verification/oct22/complete-pdf-text.txt -Encoding UTF8
$output

