from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from slowapi.middleware import SlowAPIMiddleware
from src.appeal.routers import router as appeal_router
from src.core.limiter import limiter
from src.documents.router import router as doc_router
from src.faculty.routers import router as faculty_router
from src.gallery.routers import router as gallery_router
from src.images.router import router as image_router
from src.news.router import router as news_router
from src.schedules.router import router as schedules_router
from src.specialties.router import router as specialties_router
from src.start import start
from src.universty.routers import router as uni_router
from src.users.routers import router as auth_router


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await start()
    yield


app = FastAPI(
    lifespan=lifespan,
    root_path="/api",
    docs_url=None,  # отключает Swagger UI (/docs)
    redoc_url=None,  # отключает ReDoc (/redoc)
    openapi_url=None,  # отключает OpenAPI JSON (/openapi.json)
)

app.state.limiter = limiter

app.add_middleware(SlowAPIMiddleware)


origins = [
    # "https://gditk.edu.az",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


path_public = {
    "home": "/",
    "news": "/news",
    "history": "/history",
    "management": "/management",
    "staff": "/staff",
    "department": "/department",
    "appeal": "/appeal",
    "schedule": "/schedule",
    "documents": "/documents",
    "search": "/search",
    "specialties": "/specialties",
}


@app.get("/sitemap.xml")
async def sitemap():
    # Генерация XML-карты сайта
    sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">"""

    base_url = "https://gditk.edu.az"  # Замени на свой домен

    # Создание <url> для каждого маршрута
    for page, path in path_public.items():
        sitemap_content += f"""
        <url>
            <loc>{base_url}{path}</loc>
            <lastmod>2025-04-25</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>"""

    # Закрытие тега urlset
    sitemap_content += "</urlset>"

    # Возвращаем XML-контент с нужным заголовком
    return Response(content=sitemap_content, media_type="application/xml")


app.include_router(auth_router)
app.include_router(gallery_router)
app.include_router(image_router)
app.include_router(faculty_router)
app.include_router(news_router)
app.include_router(uni_router)
app.include_router(appeal_router)
app.include_router(doc_router)
app.include_router(schedules_router)
app.include_router(specialties_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
