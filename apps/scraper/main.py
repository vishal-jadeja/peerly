"""FastAPI application entry point — CORS setup and router registration."""
import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import scrape

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

app = FastAPI(title="Peerly Scraper", version="0.1.0")

_default_origins = ["http://localhost:3000"]
_extra = os.environ.get("CORS_ALLOWED_ORIGINS", "")
if _extra:
    _default_origins.extend(origin.strip() for origin in _extra.split(",") if origin.strip())

app.add_middleware(
    CORSMiddleware,
    allow_origins=_default_origins,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(scrape.router)
