from flask import Flask, render_template, jsonify, request
import threading

app = Flask(__name__)

# Global engine instance (will be set by run_with_web.py)
engine = None
engine_thread = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/state')
def get_state():
    if engine:
        return jsonify(engine.get_state())
    return jsonify({'error': 'Engine not initialized'})

@app.route('/api/start', methods=['POST'])
def start_bot():
    global engine_thread
    if engine and not engine.is_running:
        engine_thread = threading.Thread(target=engine.run, daemon=True)
        engine_thread.start()
        return jsonify({'status': 'success', 'message': 'Bot started'})
    return jsonify({'status': 'error', 'message': 'Bot already running or not initialized'})

@app.route('/api/stop', methods=['POST'])
def stop_bot():
    if engine and engine.is_running:
        engine.stop()
        return jsonify({'status': 'success', 'message': 'Bot stopping'})
    return jsonify({'status': 'error', 'message': 'Bot not running'})

def create_app(trading_engine):
    global engine
    engine = trading_engine
    return app
