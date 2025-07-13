import geminiAnalysis
import datetime

def process(url, interval):
    start = datetime.datetime.now()
    out = geminiAnalysis.getAnalysis(interval, url)
    print(f"Finished in {datetime.datetime.now()-start}.")
    return out