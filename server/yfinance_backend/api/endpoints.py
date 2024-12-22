from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from .models import StockData
from stock_services.stock_services import (
    get_realtime_data,
    get_top_profitable_stocks,
    get_highest_volume_stocks
)

router = APIRouter()

# Market names list
marketnames = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "BHARTIARTL.NS", "ICICIBANK.NS",
    "INFY.NS", "SBIN.NS", "HINDUNILVR.NS", "ITC.NS", "LT.NS", "HCLTECH.NS",
    "SUNPHARMA.NS", "ONGC.NS", "BAJFINANCE.NS", "NTPC.NS", "MARUTI.NS",
    "TATAMOTORS.NS", "ADANIENT.NS", "KOTAKBANK.NS", "AXISBANK.NS",
    "ADANIPORTS.NS", "M&M.NS", "ULTRACEMCO.NS", "COALINDIA.NS", "POWERGRID.NS",
    "ASIANPAINT.NS", "TITAN.NS", "BAJAJ-AUTO.NS", "WIPRO.NS", "BAJAJFINSV.NS",
    "NESTLEIND.NS", "JSWSTEEL.NS", "TATASTEEL.NS", "GRASIM.NS", "SBILIFE.NS",
    "LTIM.NS", "HDFCLIFE.NS", "BPCL.NS", "TECHM.NS", "BRITANNIA.NS",
    "HINDALCO.NS", "DIVISLAB.NS", "EICHERMOT.NS", "CIPLA.NS", "TATACONSUM.NS",
    "DRREDDY.NS", "SHRIRAMFIN.NS", "HEROMOTOCO.NS", "INDUSINDBK.NS",
    "APOLLOHOSP.NS", "LICI.NS", "DMART.NS", "HAL.NS", "ADANIGREEN.NS",
    "ADANIPOWER.NS", "IOC.NS", "SIEMENS.NS", "IRFC.NS", "ZOMATO.NS", "BEL.NS",
    "DLF.NS", "JIOFIN.NS", "VBL.NS", "TRENT.NS", "VEDL.NS", "ABB.NS", "INDIGO.NS",
    "PFC.NS", "PIDILITIND.NS", "AMBUJACEM.NS", "RECLTD.NS", "GODREJCP.NS",
    "GAIL.NS", "TATAPOWER.NS", "ADANIENSOL.NS", "ZYDUSLIFE.NS", "PNB.NS",
    "BANKBARODA.NS", "MOTHERSON.NS", "TVSMOTOR.NS", "CHOLAFIN.NS", "HAVELLS.NS",
    "DABUR.NS", "TORNTPHARM.NS", "UNITDSPR.NS", "ICICIPRULI.NS", "BAJAJHLDNG.NS",
    "CANBK.NS", "JINDALSTEL.NS", "ATGL.NS", "BOSCHLTD.NS", "ICICIGI.NS",
    "COLPAL.NS", "NAUKRI.NS", "SHREECEM.NS", "MARICO.NS", "SRF.NS", "IRCTC.NS",
    "SBICARD.NS", "BERGEPAINT.NS"
]

@router.get("/realtime/{symbol}", response_model=StockData)
async def get_stock_realtime(symbol: str):
    try:
        data = get_realtime_data([symbol])
        if data and symbol in data:
            return StockData(
                symbol=symbol,
                price=float(data[symbol]['price']),
                change=float(data[symbol]['change']),
                volume=int(data[symbol]['volume']),
                timestamp=data[symbol]['timestamp']
            )
        raise HTTPException(status_code=404, detail="Stock data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/realtime/multiple/{symbols}")
async def get_multiple_realtime(symbols: str):
    try:
        symbol_list = symbols.split(',')
        data = get_realtime_data(symbol_list)
        return JSONResponse(content=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/top-stocks')
def top_stocks():
    """
    API endpoint to return the top 10 most profitable stocks in JSON format.
    """
    top_stocks_data = get_top_profitable_stocks(marketnames)
    return JSONResponse(content=top_stocks_data)

@router.get('/highest-volume-stocks')
def highest_volume_stocks():
    """
    API endpoint to return the top 10 stocks with highest trading volume in JSON format.
    """
    highest_volume_data = get_highest_volume_stocks(marketnames)
    return JSONResponse(content=highest_volume_data)
