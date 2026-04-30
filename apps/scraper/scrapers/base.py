"""BaseScraper abstract class — defines the shared interface for all platform scrapers."""
from abc import ABC, abstractmethod
from models.schemas import PersonResult


class BaseScraper(ABC):
    """All platform scrapers inherit from this class."""

    @abstractmethod
    async def search(self, queries: list[str]) -> list[PersonResult]:
        """Run the given queries and return a list of PersonResult objects."""
        ...
