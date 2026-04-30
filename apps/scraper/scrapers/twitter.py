"""X (Twitter) scraper — uses twscrape with credentials from environment."""
import hashlib
import os
from scrapers.base import BaseScraper
from models.schemas import PersonResult


class TwitterScraper(BaseScraper):
    async def search(self, queries: list[str]) -> list[PersonResult]:
        try:
            import twscrape
        except ImportError:
            return []

        api = twscrape.API()
        await api.pool.add_account(
            username=os.environ["TWITTER_USERNAME"],
            password=os.environ["TWITTER_PASSWORD"],
            email=os.environ["TWITTER_EMAIL"],
            email_password=os.environ.get("TWITTER_EMAIL_PASSWORD", ""),
        )
        await api.pool.login_all()

        results: list[PersonResult] = []
        for query in queries:
            results.extend(await self._run_query(api, query))
        return results

    async def _run_query(self, api: object, query: str) -> list[PersonResult]:
        people: list[PersonResult] = []
        async for tweet in api.search(f"{query} since:2024-01-01 min_replies:1", limit=25):
            people.append(
                PersonResult(
                    id=hashlib.md5(f"twitter:{tweet.id}".encode()).hexdigest(),
                    username=tweet.user.username,
                    platform="twitter",
                    snippet=tweet.rawContent[:300],
                    profile_url=f"https://x.com/{tweet.user.username}",
                    post_url=f"https://x.com/{tweet.user.username}/status/{tweet.id}",
                    posted_at=tweet.date.isoformat(),
                )
            )
        return people
