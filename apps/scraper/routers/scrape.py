"""POST /scrape — runs all three platform scrapers in parallel and returns merged results."""
import asyncio
import logging
from fastapi import APIRouter
from models.schemas import ScrapeRequest, ScrapeResponse
from scrapers.reddit import RedditScraper
from scrapers.twitter import TwitterScraper
from scrapers.linkedin import LinkedInScraper

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/scrape", response_model=ScrapeResponse, response_model_by_alias=True)
async def scrape(req: ScrapeRequest) -> ScrapeResponse:
    reddit = RedditScraper()
    twitter = TwitterScraper()
    linkedin = LinkedInScraper()

    batches = await asyncio.gather(
        reddit.search(req.reddit),
        twitter.search(req.twitter),
        linkedin.search(req.linkedin),
        return_exceptions=True,
    )

    seen_ids: set[str] = set()
    people = []
    for name, batch in zip(("reddit", "twitter", "linkedin"), batches):
        if isinstance(batch, Exception):
            logger.error("scraper %s failed: %r", name, batch, exc_info=batch)
            continue
        if not isinstance(batch, list):
            continue
        for person in batch:
            if person.id in seen_ids:
                continue
            seen_ids.add(person.id)
            people.append(person)

    return ScrapeResponse(people=people)
