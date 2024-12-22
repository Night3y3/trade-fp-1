import yfinance as yf
from datetime import datetime

def get_realtime_data(symbols: list):
    """
    Get real-time stock data for given symbols
    """
    try:
        # Create Ticker objects for each symbol
        tickers = {symbol: yf.Ticker(symbol) for symbol in symbols}
        
        # Get current data
        data = {}
        for symbol, ticker in tickers.items():
            current_data = ticker.history(period='1d', interval='1d').tail(1)
            if not current_data.empty and not current_data.empty:
                open_price = float(current_data['Open'])
                close_price = float(current_data['Close'].iloc[0])
                high = float(current_data['High'])
                low = float(current_data['Low'])
                volume = int(current_data['Volume'].iloc[0])
                previous_close = ticker.info.get('previousClose', 0)
                
                # Calculate percent change
                percent_change = ((close_price - previous_close) / previous_close * 100) if previous_close else 0
                
                # Add data to response
                data[symbol] = {
                    "symbol": symbol,
                    "open_price": open_price,
                    "close_price": close_price,
                    "percent_change": percent_change,
                    "volume": volume,
                    "high": high,
                    "low": low,
                    "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                }
        
        return data
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def get_top_profitable_stocks(symbols: list, period='1d', interval='1h'):
    """
    Get top 10 highest profitable stocks for the last 24 hours.
    """
    stock_data = []
    for symbol in symbols:
        try:
            # Fetch historical data
            data = yf.Ticker(symbol).history(period=period, interval=interval)
            if not data.empty:
                # Get previous day's close price
                prev_close = yf.Ticker(symbol).info.get('previousClose', 0)
                open_price = float(data['Open'][0])
                close_price = float(data['Close'][-1])
                volume = int(data['Volume'][-1])
                high = float(data['High'].max())
                low = float(data['Low'].min())
                percent_change = ((close_price - prev_close) / prev_close) * 100 if prev_close else 0

                stock_data.append({
                    'symbol': symbol,
                    'details': {
                        'open_price': open_price,
                        'close_price': close_price,
                        'percent_change': percent_change,
                        'volume': volume,
                        'high': high,
                        'low': low
                    }
                })
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")

    # Sort by percentage change in descending order
    sorted_data = sorted(stock_data, key=lambda x: x['details']['percent_change'], reverse=True)
    return sorted_data[:10]

def get_highest_volume_stocks(symbols: list, period='1d', interval='1h'):
    """
    Get top 10 stocks with highest trading volume.
    """
    stock_data = []
    for symbol in symbols:
        try:
            data = yf.Ticker(symbol).history(period=period, interval=interval)
            if not data.empty:
                prev_close = yf.Ticker(symbol).info.get('previousClose', 0)
                open_price = float(data['Open'][0])
                close_price = float(data['Close'][-1])
                volume = int(data['Volume'].sum())
                high = float(data['High'].max())
                low = float(data['Low'].min())
                percent_change = ((close_price - prev_close) / prev_close) * 100 if prev_close else 0

                stock_data.append({
                    'symbol': symbol,
                    'details': {
                        'open_price': open_price,
                        'close_price': close_price,
                        'percent_change': percent_change,
                        'volume': volume,
                        'high': high,
                        'low': low
                    }
                })
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")

    sorted_data = sorted(stock_data, key=lambda x: x['details']['volume'], reverse=True)
    return sorted_data[:10]
