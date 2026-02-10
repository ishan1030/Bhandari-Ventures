import pandas as pd

class SMACrossoverStrategy:
    def __init__(self, short_window, long_window):
        self.short_window = short_window
        self.long_window = long_window

    def generate_signals(self, df):
        if len(df) < self.long_window:
            return None

        df = df.copy()
        df['sma_short'] = df['close'].rolling(window=self.short_window).mean()
        df['sma_long'] = df['close'].rolling(window=self.long_window).mean()

        # Get the last two rows to check for a crossover
        last_row = df.iloc[-1]
        prev_row = df.iloc[-2]

        if prev_row['sma_short'] <= prev_row['sma_long'] and last_row['sma_short'] > last_row['sma_long']:
            return 'buy'
        elif prev_row['sma_short'] >= prev_row['sma_long'] and last_row['sma_short'] < last_row['sma_long']:
            return 'sell'

        return 'hold'
