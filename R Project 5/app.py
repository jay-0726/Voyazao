from flask import Flask, request, jsonify, render_template, send_from_directory, redirect
import os
import json
import sys

# Add the current directory to the path so modules can be found
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import from pages directory
from pages.ai import suggest_destinations_api, create_itinerary_api

app = Flask(__name__)

# Enable debug mode
app.config['DEBUG'] = True

# Directly serve the AI planner page at the root for easier access
@app.route('/ai-planner.html')
def serve_ai_planner_direct():
    try:
        return send_from_directory(os.path.join(os.path.dirname(__file__), 'pages'), 'ai-planner.html')
    except Exception as e:
        print(f"Error serving AI planner page directly: {e}")
        return f"Error: {str(e)}", 404

# Serve static files
@app.route('/<path:path>')
def serve_page(path):
    try:
        if path.startswith('pages/') and path.endswith('.html'):
            dir_path, file_name = os.path.split(path)
            return send_from_directory(os.path.join(os.path.dirname(__file__), dir_path), file_name)
        elif path.endswith('.html'):
            return send_from_directory(os.path.dirname(__file__), path)
        return send_from_directory(os.path.dirname(__file__), path)
    except Exception as e:
        print(f"Error serving {path}: {e}")
        return f"Error: {str(e)}", 404

# Serve root index
@app.route('/')
def index():
    try:
        # Redirect to the AI planner page directly
        return redirect('/ai-planner.html')
    except Exception as e:
        print(f"Error serving index: {e}")
        return f"Error: {str(e)}", 404

# Serve AI planner page directly with a simpler route
@app.route('/ai-planner')
def ai_planner():
    return redirect('/ai-planner.html')

# API endpoint for suggesting destinations
@app.route('/api/suggest-destinations', methods=['POST'])
def suggest_destinations():
    try:
        data = request.json
        interests = data.get('interests', [])
        budget = int(data.get('budget', 50000))
        duration = int(data.get('duration', 7))
        
        # Get additional parameters
        budget_flexibility = data.get('budget_flexibility')
        accommodation = data.get('accommodation')
        travel_style = data.get('travel_style')
        num_adults = int(data.get('num_adults', 1))
        num_children = int(data.get('num_children', 0))
        requirements = data.get('requirements', [])
        
        # Call the ML model with all parameters
        result = suggest_destinations_api(
            interests, 
            budget, 
            duration, 
            budget_flexibility, 
            accommodation, 
            travel_style, 
            num_adults, 
            num_children, 
            requirements
        )
        
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
        
        # Get additional parameters
        budget_flexibility = data.get('budget_flexibility')
        accommodation = data.get('accommodation')
        travel_style = data.get('travel_style')
        num_adults = int(data.get('num_adults', 1))
        num_children = int(data.get('num_children', 0))
        requirements = data.get('requirements', [])
        
        # Call the ML model with all parameters
        result = create_itinerary_api(
            destination_id, 
            interests, 
            budget, 
            duration, 
            start_date, 
            budget_flexibility, 
            accommodation, 
            travel_style, 
            num_adults, 
            num_children, 
            requirements
        )
        
        return result
    except Exception as e:
        print(f"Error in create_itinerary: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Create a data folder if it doesn't exist
    data_path = os.path.join(os.path.dirname(__file__), 'data')
    if not os.path.exists(data_path):
        os.makedirs(data_path)
        
    print("Starting AI Trip Planner server...")
    print("Access the AI Trip Planner at: http://localhost:5000/ai-planner.html")
    
    # Run on localhost only for security
    app.run(host='127.0.0.1', port=5000, debug=True) 