from google import genai
import os
from pydantic import ValidationError
import getPrompt
import extractChat
import json
import settings
from collections import deque
import getStreamerInfo
import doubleQuoteRemover

# import time
# i cant afford gemini pro
# nvm i bouhgt it just for this

client = genai.Client(api_key=os.getenv("geminiapikey"))

def getAnalysis(interval, url):
    print("Getting chat...")
    chat = extractChat.getChat(url)
    if (chat == -1):
        return -1

    streamInfo = str(getStreamerInfo.getInfo(url))

    model, ratelim = settings.getModel()
    previousRatings = deque([])

    analysis = []
    currinterval = 0
    input = ""
    messages = 0
    for msg in chat:
        messages += 1
        if (msg["timeInSeconds"] > currinterval*interval):
            print(f"Processing interval {currinterval}...")

            prompt = getPrompt.analysis(input, interval, streamInfo, previousRatings, messages)
            try:
                res = client.models.generate_content(
                    model = model,
                    contents=prompt
                )
                cleaned = res.text.strip()
                if cleaned.startswith("```json"):
                    cleaned = cleaned.lstrip("```json").lstrip()
                if cleaned.endswith("```"):
                    cleaned = cleaned.rstrip("```").rstrip()
                # print(cleaned)
                cleaned = doubleQuoteRemover.convertJSON(cleaned)
                print(cleaned)
                # print()
                cleaned = json.loads(cleaned)
            except ValidationError as e:
                print(f"""Pydantic validation failed for Gemini response: {e}
                    Raw Response: {getattr(res, 'text', 'N/A')}""")
                return -2
            except Exception as e:
                print(f"An unexpected error occurred during Gemini API call: {e}")
                return -3

            curr = {
                "rating": cleaned,
                "messages": messages
            }
            previousRatings.append(cleaned)
            if (len(previousRatings) == 6):
                previousRatings.popleft()

            analysis.append(cleaned)
            currinterval += 1
            input = ""
            messages = 0
        
        input += str(msg)+"\n"
    
    return analysis