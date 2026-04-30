"""Pydantic schemas for all scraper request and response shapes."""
from pydantic import BaseModel
from typing import Literal


Platform = Literal["reddit", "twitter", "linkedin"]


class ScrapeRequest(BaseModel):
    reddit: list[str]
    twitter: list[str]
    linkedin: list[str]


class PersonResult(BaseModel):
    id: str
    username: str
    platform: Platform
    snippet: str
    profile_url: str
    post_url: str
    posted_at: str


class ScrapeResponse(BaseModel):
    people: list[PersonResult]
