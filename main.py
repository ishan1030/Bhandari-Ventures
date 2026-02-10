import logging
from config import Config
from bot.exchange_handler import ExchangeHandler
from bot.strategy import SMACrossoverStrategy
from bot.engine import TradingEngine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def main():
    logging.info("Initializing Crypto Hopper Lite...")

    # Initialize components
    exchange_handler = ExchangeHandler(
        exchange_id=Config.EXCHANGE,
        api_key=Config.API_KEY,
        api_secret=Config.API_SECRET,
        paper_trading=Config.PAPER_TRADING
    )

    strategy = SMACrossoverStrategy(
        short_window=Config.SMA_SHORT,
        long_window=Config.SMA_LONG
    )

    engine = TradingEngine(
        exchange_handler=exchange_handler,
        strategy=strategy,
        config=Config
    )

    try:
        # In a real scenario, we might want to run this in a way that can be interrupted
        # For now, we'll just run one tick for demonstration or let it run
        # To make it more "lite" and testable, let's just run it
        engine.run()
    except KeyboardInterrupt:
        engine.stop()
        logging.info("Bot stopped by user.")

if __name__ == "__main__":
    main()
