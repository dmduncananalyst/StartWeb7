import concurrent.futures,json,urllib.request
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'verification/oct21'
records=json.loads((out/'articles.json').read_text())
def check(url):
    try:
        response=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=20)
        return dict(url=url,status=response.status,destination=response.url)
    except Exception as error:
        return dict(url=url,error=str(error))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results=list(pool.map(check,[u for r in records for u in r['urls']]))
(out/'source-link-results.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results,indent=2))
