import logging
from config import Config
from bot.exchange_handler import ExchangeHandler
from bot.strategy import SMACrossoverStrategy
from bot.engine import TradingEngine
from web.app import create_app

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def main():
    logging.info("Initializing Crypto Hopper Lite with Web Dashboard...")

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

    # Create and run web app
    app = create_app(engine)

    logging.info("Starting web server on http://0.0.0.0:5000")
    # In a real production environment, you would use a proper WSGI server like gunicorn
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)

if __name__ == "__main__":
    main()
