from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Mount static files, all files in the ./images directory will be served at '/images'
app.mount("/images", StaticFiles(directory="/app/images"), name="images")

@app.get("/")
async def read_index():
    # Serves the index.html file at the root URL
    return FileResponse('index.html')

