import chat_downloader
import datetime

def getChat(url):
    chat = chat_downloader.ChatDownloader().get_chat(url)
    
    start = datetime.datetime.now()
    output = []
    for m in chat:
        try:
            object = {}
            object["message"] = m["message"]
            object["timeInSeconds"] = m["time_in_seconds"]
            object["author"] = {}
            object["author"]["name"] = m["author"]["name"]
            object["author"]["displayName"] = m["author"]["display_name"]
            object["author"]["badges"] = []
            
            if ("badges" in m["author"]):
                for title in m["author"]["badges"]:
                    object["author"]["badges"].append(title["name"])

            output.append(object)
        except KeyError:
            pass

    print(f"Chat processing finished in {datetime.datetime.now()-start}.")
    return output