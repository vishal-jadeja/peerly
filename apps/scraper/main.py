"""FastAPI application entry point — CORS setup and router registration."""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import scrape

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

app = FastAPI(title="Peerly Scraper", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(scrape.router)
