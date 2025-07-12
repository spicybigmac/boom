from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import process
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def greet():
    return {"message": "yay backend!!!"}

class ProcessRequest(BaseModel):
    vodLink: str
    interval: int

@app.post("/processVod")
def processfunction(request: ProcessRequest):
    link = request.vodLink
    print(f"Got link: {link}")

    output = process.process(link, request.interval)
    if (output == -1):
        raise HTTPException(422, "Make sure your link works.")
    elif (output == -2):
        raise HTTPException(404, "Validation Failed.")
    elif (output == -3):
        raise HTTPException(404, "insurmountable barrier reached, give up now.")
    else:
        return output

if (__name__ == "__main__"):
    uvicorn.run("main:app", reload=True)