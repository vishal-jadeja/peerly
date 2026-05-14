"""LinkedIn scraper — DuckDuckGo site: search via the ddgs library (no API key needed)."""
import asyncio
import hashlib
import logging
from ddgs import DDGS
from scrapers.base import BaseScraper
from models.schemas import PersonResult

logger = logging.getLogger(__name__)


class LinkedInScraper(BaseScraper):
    async def search(self, queries: list[str]) -> list[PersonResult]:
        results: list[PersonResult] = []
        for query in queries:
            results.extend(await self._run_query(query))
        return results

    async def _run_query(self, query: str) -> list[PersonResult]:
        try:
            raw = await asyncio.to_thread(self._ddg_search, query)
        except Exception as exc:
            logger.warning("LinkedIn DDG query failed for %r: %r", query, exc)
            return []

        people: list[PersonResult] = []
        for item in raw:
            url = item.get("href", "")
            if "linkedin.com/in/" not in url:
                continue
            username = item.get("title") or url
            snippet = item.get("body") or ""
            people.append(
                PersonResult(
                    id=hashlib.md5(f"linkedin:{url}".encode()).hexdigest(),
                    username=username,
                    platform="linkedin",
                    snippet=snippet[:300],
                    profile_url=url,
                    post_url=url,
                    posted_at="",
                )
            )
        return people

    @staticmethod
    def _ddg_search(query: str) -> list[dict]:
        with DDGS() as ddgs:
            return list(ddgs.text(f"site:linkedin.com/in {query}", max_results=10))
