import time
import logging

class TradingEngine:
    def __init__(self, exchange_handler, strategy, config):
        self.exchange_handler = exchange_handler
        self.strategy = strategy
        self.config = config
        self.is_running = False
        self.position = None # None, 'long'

    def run(self):
        logging.info("Starting trading engine...")
        self.is_running = True

        while self.is_running:
            try:
                self.tick()
            except Exception as e:
                logging.error(f"Error in engine tick: {e}")

            # In a real bot, we might sleep for a longer period
            # For this lite version, we'll sleep for a bit
            time.sleep(10)

    def stop(self):
        self.is_running = False
        logging.info("Stopping trading engine...")

    def tick(self):
        symbol = self.config.SYMBOL
        timeframe = self.config.TIMEFRAME

        logging.info(f"Checking market for {symbol}...")
        df = self.exchange_handler.fetch_ohlcv(symbol, timeframe=timeframe)

        if df.empty:
            logging.warning("No data fetched, skipping tick.")
            return

        signal = self.strategy.generate_signals(df)
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
        else:
            logging.error(f"Failed to execute {side} order.")
