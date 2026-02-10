import time
import logging
from datetime import datetime

class TradingEngine:
    def __init__(self, exchange_handler, strategy, config):
        self.exchange_handler = exchange_handler
        self.strategy = strategy
        self.config = config
        self.is_running = False
        self.position = None # None, 'long'

        self.state = {
            'is_running': False,
            'position': None,
            'latest_price': None,
            'last_signal': None,
            'trades': [],
            'last_tick': None,
            'error': None
        }

    def run(self):
        logging.info("Starting trading engine...")
        self.is_running = True
        self.state['is_running'] = True

        while self.is_running:
            try:
                self.tick()
                self.state['error'] = None
            except Exception as e:
                logging.error(f"Error in engine tick: {e}")
                self.state['error'] = str(e)

            # In a real bot, we might sleep for a longer period
            # For this lite version, we'll sleep for a bit
            time.sleep(10)

    def stop(self):
        self.is_running = False
        self.state['is_running'] = False
        logging.info("Stopping trading engine...")

    def tick(self):
        symbol = self.config.SYMBOL
        timeframe = self.config.TIMEFRAME

        logging.info(f"Checking market for {symbol}...")
        df = self.exchange_handler.fetch_ohlcv(symbol, timeframe=timeframe)

        if df.empty:
            logging.warning("No data fetched, skipping tick.")
            return

        latest_close = df.iloc[-1]['close']
        self.state['latest_price'] = float(latest_close)
        self.state['last_tick'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        signal = self.strategy.generate_signals(df)
        self.state['last_signal'] = signal
        logging.info(f"Generated signal: {signal}")

        if signal == 'buy' and self.position != 'long':
            self.execute_trade('buy')
        elif signal == 'sell' and self.position == 'long':
            self.execute_trade('sell')

    def execute_trade(self, side):
        symbol = self.config.SYMBOL
        amount = self.config.TRADE_AMOUNT

        order = self.exchange_handler.create_order(symbol, 'market', side, amount)
        if order:
            logging.info(f"Successfully executed {side} order.")
            if side == 'buy':
                self.position = 'long'
            else:
                self.position = None

            self.state['position'] = self.position
            self.state['trades'].append({
                'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'side': side,
                'symbol': symbol,
                'amount': amount,
                'price': order.get('price') or self.state['latest_price']
            })
        else:
            logging.error(f"Failed to execute {side} order.")
            self.state['error'] = f"Failed to execute {side} order."

    def get_state(self):
        return self.state
