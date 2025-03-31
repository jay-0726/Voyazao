from flask import Flask, request, jsonify, render_template, send_from_directory, redirect
import os
import json
from ai import suggest_destinations_api, create_itinerary_api

app = Flask(__name__)

# Enable debug mode
app.config['DEBUG'] = True

# Serve static files
@app.route('/<path:path>')
def serve_page(path):
    try:
        if path.endswith('.html'):
            return send_from_directory(os.path.dirname(__file__), path)
        return send_from_directory(os.path.join(os.path.dirname(__file__), '..'), path)
    except Exception as e:
        print(f"Error serving {path}: {e}")
        return f"Error: {str(e)}", 404

# Serve root index
@app.route('/')
def index():
    try:
        return send_from_directory(os.path.join(os.path.dirname(__file__), '..'), 'index.html')
    except Exception as e:
        print(f"Error serving index: {e}")
        return f"Error: {str(e)}", 404

# Serve AI planner page directly
@app.route('/ai-planner')
def ai_planner():
    return redirect('/pages/ai-planner.html')

# API endpoint for suggesting destinations
@app.route('/api/suggest-destinations', methods=['POST'])
def suggest_destinations():
    try:
        data = request.json
        interests = data.get('interests', [])
        budget = int(data.get('budget', 50000))
        duration = int(data.get('duration', 7))
        
        # Call the ML model
        result = suggest_destinations_api(interests, budget, duration)
        
        return result
    except Exception as e:
        print(f"Error in suggest_destinations: {e}")
        return jsonify({"error": str(e)}), 500

# API endpoint for creating an itinerary
@app.route('/api/create-itinerary', methods=['POST'])
def create_itinerary():
    try:
        data = request.json
        destination_id = data.get('destination_id')
        interests = data.get('interests', [])
        budget = data.get('budget', 50000)
        duration = data.get('duration', 7)
        start_date = data.get('start_date')
        
        # Call the ML model
        result = create_itinerary_api(destination_id, interests, budget, duration, start_date)
        
        return result
    except Exception as e:
        print(f"Error in create_itinerary: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Create a data folder if it doesn't exist
    data_path = os.path.join(os.path.dirname(__file__), '../data')
    if not os.path.exists(data_path):
        os.makedirs(data_path)
        
    print("Starting AI Trip Planner server...")
    print("Access the AI Trip Planner at: http://localhost:5000/pages/ai-planner.html")
    app.run(host='0.0.0.0', port=5000) 