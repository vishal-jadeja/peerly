"""LinkedIn scraper — Google site: search to find public LinkedIn profile URLs, then scrapes snippets."""
import hashlib
import httpx
from bs4 import BeautifulSoup
from scrapers.base import BaseScraper
from models.schemas import PersonResult

_GOOGLE_SEARCH = "https://www.google.com/search"
_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}


class LinkedInScraper(BaseScraper):
    async def search(self, queries: list[str]) -> list[PersonResult]:
        results: list[PersonResult] = []
        async with httpx.AsyncClient(headers=_HEADERS, follow_redirects=True) as client:
            for query in queries:
                results.extend(await self._run_query(client, query))
        return results

    async def _run_query(self, client: httpx.AsyncClient, query: str) -> list[PersonResult]:
        params = {"q": f"site:linkedin.com/in {query}", "num": 10}
        resp = await client.get(_GOOGLE_SEARCH, params=params, timeout=10)
        resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "html.parser")
        people: list[PersonResult] = []

        for result in soup.select("div.g")[:10]:
            link_tag = result.select_one("a[href*='linkedin.com/in/']")
            if not link_tag:
                continue

            url = link_tag["href"]
            snippet_tag = result.select_one("div.VwiC3b, span.st")
            snippet = snippet_tag.get_text(" ", strip=True) if snippet_tag else ""
            title_tag = result.select_one("h3")
            username = title_tag.get_text(strip=True) if title_tag else url

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
