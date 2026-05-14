"""Pydantic schemas for all scraper request and response shapes."""
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Literal


Platform = Literal["reddit", "twitter", "linkedin"]


class ScrapeRequest(BaseModel):
    reddit: list[str]
    twitter: list[str]
    linkedin: list[str]


class PersonResult(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    id: str
    username: str
    platform: Platform
    snippet: str
    profile_url: str
    post_url: str
    posted_at: str


class ScrapeResponse(BaseModel):
    people: list[PersonResult]
