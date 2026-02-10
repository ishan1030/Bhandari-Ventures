import ccxt
import pandas as pd
import logging

class ExchangeHandler:
    def __init__(self, exchange_id, api_key='', api_secret='', paper_trading=True):
        self.exchange_id = exchange_id
        self.paper_trading = paper_trading

        exchange_class = getattr(ccxt, exchange_id)
        self.exchange = exchange_class({
            'apiKey': api_key,
            'secret': api_secret,
            'enableRateLimit': True,
        })

        if paper_trading:
            logging.info(f"Initialized {exchange_id} in PAPER TRADING mode.")
        else:
            logging.info(f"Initialized {exchange_id} in LIVE TRADING mode.")

    def fetch_ohlcv(self, symbol, timeframe='1h', limit=100):
        try:
            ohlcv = self.exchange.fetch_ohlcv(symbol, timeframe=timeframe, limit=limit)
            df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            return df
        except Exception as e:
            logging.error(f"Error fetching OHLCV: {e}")
            return pd.DataFrame()

    def fetch_ticker(self, symbol):
        try:
            return self.exchange.fetch_ticker(symbol)
        except Exception as e:
            logging.error(f"Error fetching ticker: {e}")
            return None

    def create_order(self, symbol, order_type, side, amount, price=None):
        if self.paper_trading:
            logging.info(f"[PAPER] Created {side} {order_type} order for {amount} {symbol}")
            return {'id': 'paper_order', 'status': 'closed', 'side': side, 'amount': amount, 'price': price}
        else:
            try:
                return self.exchange.create_order(symbol, order_type, side, amount, price)
            except Exception as e:
                logging.error(f"Error creating order: {e}")
                return None
