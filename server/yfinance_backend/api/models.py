# api/models.py
from pydantic import BaseModel
from typing import Dict

class StockDetails(BaseModel):
    open_price: float
    close_price: float
    percent_change: float
    volume: int
    high: float
    low: float

class StockData(BaseModel):
    symbol: str
    details: StockDetails

class StockResponse(BaseModel):
    symbol: str
    details: Dict[str, float | int]
