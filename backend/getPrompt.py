jsonformat = """{
    "message": {
        "description": "The content of the chat message.",
        "type": "string"
    },
    "timeinseconds": {
        "description": "The time, in seconds after the start of the stream, that the message was sent.",
        "type": "integer"
    },
    "author": {
        "description": "An object containing general information about the author of the chat message.",
        "type": "object",
        "values": {
            "name": {
                "description": "The name of the chatter.",
                "type": "string"
            },
            "displayName": {
                "description": "The display name of the chatter.",
                "type": "string"
            },
            "badges": {
                "description": "An array containing the names of the badges of the chatter.",
                "type": "array"
            }
        }
    }
}"""

outputjsonformat = """{
    "excitementScore": {
        "description": "A score from 0 to 100 detailing the excitement of the chat.",
        "type": "number",
        "maxvalue": 100,
        "minvalue": 0
    },
    "vibe": {
        "description": "1-3 words describing the overall vibe/emotions of the chat. Examples include "hyped", "sad", "motivated".",
        "type": "string",
        "maxlength": 25,
        "minvalue": 0
    },
    "summary": {
        "description": "A 1 sentence summary of the contents of the chat. The summary MUST fall within the maximum and minimum character limits below.",
        "type": "string",
        "maxlength": "70",
        "minlength": "10"
    }
}"""

score90 = """no way {'name': 'nate314__', 'displayName': 'nate314__', 'badges': []}
paus {'name': 'krispydonna', 'displayName': 'KrispyDonna', 'badges': ['moderator', 'clip_the_halls']}
omg {'name': 'jaffajake68', 'displayName': 'JaffaJake68', 'badges': ['share_the_love']}
WTF {'name': 'krispydonna', 'displayName': 'KrispyDonna', 'badges': ['moderator', 'clip_the_halls']}
YES ZERO CYCLE {'name': 'galaxybolter1', 'displayName': 'galaxybolter1', 'badges': ['predictions']}
DUB {'name': 'kexiv_', 'displayName': 'Kexiv_', 'badges': ['purple_pixel_heart___together_for_good_24']}
omg {'name': 'akiraveliara', 'displayName': 'akiraveliara', 'badges': ['twitch_recap_2024']}
pog {'name': 'xkobo_tv', 'displayName': 'xKobo_TV', 'badges': ['glhf_pledge']}
WTF {'name': 'nate314__', 'displayName': 'nate314__', 'badges': []}
GOAT {'name': 'jaffajake68', 'displayName': 'JaffaJake68', 'badges': ['share_the_love']}
slay {'name': 'spencek007', 'displayName': 'spencek007', 'badges': ['predictions', 'subscriber']}
OKAY {'name': 'drownj', 'displayName': 'drownj', 'badges': ['moderator', 'marathon_reveal_runner']}
that's insane {'name': 'akiraveliara', 'displayName': 'akiraveliara', 'badges': ['twitch_recap_2024']}
CLEAN {'name': 'kellybeans_', 'displayName': 'kellybeans_', 'badges': ['subscriber', 'minecraft_15th_anniversary_celebration']}
LETSGO {'name': 'krispydonna', 'displayName': 'KrispyDonna', 'badges': ['moderator', 'clip_the_halls']}
slayyy {'name': 'nate314__', 'displayName': 'nate314__', 'badges': []}
slayyyyy {'name': 'nic_c1', 'displayName': 'nic_c1', 'badges': ['predictions', 'subscriber']}
slayyy {'name': 'willowt5150', 'displayName': 'willowt5150', 'badges': ['predictions', 'premium']}
slayyy {'name': 'askingvic', 'displayName': 'AskingVic', 'badges': ['predictions']}
slayyy {'name': 'troooonnn', 'displayName': 'troooonnn', 'badges': ['predictions']}
slayyy {'name': 'the_ruietto', 'displayName': 'the_ruietto', 'badges': ['predictions', 'subscriber', 'arcane_season_2_premiere']}
slayyy {'name': 'skylordyamato', 'displayName': 'SkyLordYamato', 'badges': ['predictions', 'premium']}
slayyy {'name': 'crispanaro', 'displayName': 'crispanaro', 'badges': ['predictions']}
you are that guy WICKED {'name': 'drownj', 'displayName': 'drownj', 'badges': ['moderator', 'marathon_reveal_runner']}
slayyy {'name': '7oaktrees', 'displayName': '7OakTrees', 'badges': ['predictions', 'subscriber']}"""

def analysis(chat, interval, streamInfo, prevRatings, messages):
    return f"""
    You are an expert entertainment analyzer whose purpose is to analyze Twitch or YouTube chat messages and assign the messages an "excitement score" out of 100. You will be provided with a JSON array of chat messages.
    You should also assign the chat messages of each interval an overall "vibe" description, and a 1-2 sentence summary of the contents of the chat of each interval.

    The provided chat messages spans {interval} seconds of the stream.
    In this interval, {messages} messages were sent.

    The Livestream information, including information about the streamer, is below:
    {streamInfo}
    Make sure to consider these factors when analyzing the frequency and content of chats.

    Based on the following specific, consistent, and practical factors, you will analyze the provided chat messages:
    Message Velocity: A higher frequency of messages, especially from a high number of unique chatters, within the given timeframe is a strong indicator of excitement. (Note: This is the most important factor)
    Emote and Capitalization Usage: Increased use of emotes (especially hype-related ones) and messages in all caps suggest a higher energy level in the chat.
    Sentiment of Language: The emotional tone of the messages is crucial. Positive and enthusiastic words (e.g., "hype," "pog," "wow," "insane") should increase the excitement score, while neutral language should lower it. Extreme negative words should also raise the score.
    User Engagement: Consider the number of unique chatters. A high level of participation from a diverse group of users indicates widespread excitement.
    Badge Significance: While all messages are important, give slightly more weight to messages from users with badges like "subscriber," "VIP," or "moderator," as they represent more dedicated community members.
    
    A score of around 50 is the average chat experience, where there is no one clear topic of discussion, and the chat frequency is around 1/10 of the view count (provided above) per minute.
    More chat frequency should bring the score above 50, and less chat frequency should bring the score below 50.
    
    To ensure accuracy, up to 5 past intervals and ratings are provided:
    {prevRatings}
    Use these as benchmarks for the excitement score of this interval. Make sure to add the necessary variation to the scores if there are variations in the chat.
    Do not include these in your output; only output the analysis for the below chat messages.

    The format of the chat messages are as follows:
    {jsonformat}

    The chat messages will be provided below:
    {chat}

    Evaluate the above file based on the JSON schema provided below:
    **Your response MUST be a single, valid JSON object that strictly adheres to the following schema. Do not include any text or formatting outside of this JSON object.**
    {outputjsonformat}
    """