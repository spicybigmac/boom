import twitch
import os

helix = twitch.Helix(os.getenv("twitchid"), os.getenv("twitchsecret"))

def getInfo(url):
    id = int(url.split("/")[-1])

    output = {}
    
    vid = helix.video(id)
    output["title"] = vid.title
    output["description"] = vid.description
    output["duration"] = vid.duration
    output["viewers"] = vid.view_count

    streamer = helix.user(vid.user_name)
    output["streamer"] = {}
    output["streamer"]["name"] = vid.user_name
    output["streamer"]["description"] = streamer.description

    return output
