import pandas as pd
import pytest
from bot.strategy import SMACrossoverStrategy

def test_sma_crossover_buy_signal():
    strategy = SMACrossoverStrategy(short_window=2, long_window=4)

    # Create data where short SMA crosses above long SMA at the last row
    data = {
        'close': [10, 10, 10, 10, 10, 15]
    }
    df = pd.DataFrame(data)

    signal = strategy.generate_signals(df)
    assert signal == 'buy'

def test_sma_crossover_sell_signal():
    strategy = SMACrossoverStrategy(short_window=2, long_window=4)

    # Create data where short SMA crosses below long SMA at the last row
    data = {
        'close': [20, 20, 20, 20, 20, 15]
    }
    df = pd.DataFrame(data)

    signal = strategy.generate_signals(df)
    assert signal == 'sell'

def test_sma_crossover_hold_signal():
    strategy = SMACrossoverStrategy(short_window=2, long_window=4)

    data = {
        'close': [10, 10, 10, 10, 10, 10]
    }
    df = pd.DataFrame(data)

    signal = strategy.generate_signals(df)
    assert signal == 'hold'

def test_insufficient_data():
    strategy = SMACrossoverStrategy(short_window=2, long_window=4)
    data = {'close': [10, 11, 12]}
    df = pd.DataFrame(data)

    signal = strategy.generate_signals(df)
    assert signal is None
