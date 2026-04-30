"""POST /scrape — runs all three platform scrapers in parallel and returns merged results."""
import asyncio
from fastapi import APIRouter
from models.schemas import ScrapeRequest, ScrapeResponse
from scrapers.reddit import RedditScraper
from scrapers.twitter import TwitterScraper
from scrapers.linkedin import LinkedInScraper

router = APIRouter()


@router.post("/scrape", response_model=ScrapeResponse)
async def scrape(req: ScrapeRequest) -> ScrapeResponse:
    reddit = RedditScraper()
    twitter = TwitterScraper()
    linkedin = LinkedInScraper()

    reddit_results, twitter_results, linkedin_results = await asyncio.gather(
        reddit.search(req.reddit),
        twitter.search(req.twitter),
        linkedin.search(req.linkedin),
        return_exceptions=True,
    )

    people = []
    for batch in (reddit_results, twitter_results, linkedin_results):
        if isinstance(batch, list):
            people.extend(batch)

    return ScrapeResponse(people=people)
