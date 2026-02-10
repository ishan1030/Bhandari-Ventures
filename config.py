import os

class Config:
    EXCHANGE = 'kraken'
    SYMBOL = 'BTC/USDT'
    TIMEFRAME = '1h'
    SMA_SHORT = 10
    SMA_LONG = 30
    PAPER_TRADING = True
    TRADE_AMOUNT = 0.001

    # API Keys (use environment variables)
    API_KEY = os.getenv('EXCHANGE_API_KEY', '')
    API_SECRET = os.getenv('EXCHANGE_API_SECRET', '')
