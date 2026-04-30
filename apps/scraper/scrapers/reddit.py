"""Reddit scraper — uses the public search.json API, no auth required."""
import hashlib
import httpx
from datetime import datetime, timezone
from scrapers.base import BaseScraper
from models.schemas import PersonResult

_BASE = "https://www.reddit.com/search.json"
_HEADERS = {"User-Agent": "peerly/0.1"}


class RedditScraper(BaseScraper):
    async def search(self, queries: list[str]) -> list[PersonResult]:
        results: list[PersonResult] = []
        async with httpx.AsyncClient(headers=_HEADERS, follow_redirects=True) as client:
            for query in queries:
                results.extend(await self._run_query(client, query))
        return results

    async def _run_query(self, client: httpx.AsyncClient, query: str) -> list[PersonResult]:
        params = {"q": query, "sort": "new", "limit": 25, "type": "link"}
        resp = await client.get(_BASE, params=params, timeout=10)
        resp.raise_for_status()
        posts = resp.json().get("data", {}).get("children", [])

        people: list[PersonResult] = []
        for post in posts:
            d = post.get("data", {})
            author = d.get("author", "")
            if not author or author == "[deleted]":
                continue
            people.append(
                PersonResult(
                    id=hashlib.md5(f"reddit:{d.get('id', '')}".encode()).hexdigest(),
                    username=author,
                    platform="reddit",
                    snippet=(d.get("selftext") or d.get("title", ""))[:300],
                    profile_url=f"https://reddit.com/u/{author}",
                    post_url=f"https://reddit.com{d.get('permalink', '')}",
                    posted_at=datetime.fromtimestamp(
                        d.get("created_utc", 0), tz=timezone.utc
                    ).isoformat(),
                )
            )
        return people
