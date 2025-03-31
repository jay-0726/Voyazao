import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import os
import random
from datetime import datetime, timedelta
import json

class ItinerarySuggestionModel:
    def __init__(self):
        self.attractions_df = None
        self.destinations_df = None
        self.activities_df = None
        self.tfidf_matrix = None
        self.tfidf_vectorizer = None
        self.data_path = os.path.join(os.path.dirname(__file__), '../data')
        
        # Create data directory if it doesn't exist
        if not os.path.exists(self.data_path):
            os.makedirs(self.data_path)
            
        # Initialize or load data
        self._initialize_data()
        
    def _initialize_data(self):
        """Initialize or load destination and attraction data"""
        attractions_path = os.path.join(self.data_path, 'attractions.pkl')
        destinations_path = os.path.join(self.data_path, 'destinations.pkl')
        activities_path = os.path.join(self.data_path, 'activities.pkl')
        
        if os.path.exists(attractions_path) and os.path.exists(destinations_path) and os.path.exists(activities_path):
            # Load existing data
            self.attractions_df = pd.read_pickle(attractions_path)
            self.destinations_df = pd.read_pickle(destinations_path)
            self.activities_df = pd.read_pickle(activities_path)
        else:
            # Create sample data
            self._create_sample_data()
            # Save data
            self.attractions_df.to_pickle(attractions_path)
            self.destinations_df.to_pickle(destinations_path)
            self.activities_df.to_pickle(activities_path)
            
        # Build the TF-IDF matrix for content-based filtering
        self._build_tfidf_matrix()
    
    def _create_sample_data(self):
        """Create sample data for destinations, attractions, and activities"""
        # Sample destinations
        destinations = [
            {"id": "paris", "name": "Paris", "country": "France", "cost_factor": 0.9, 
             "tags": "romantic cultural historical architecture museums nightlife shopping food"},
            {"id": "tokyo", "name": "Tokyo", "country": "Japan", "cost_factor": 0.85, 
             "tags": "technology modern cultural food shopping nightlife adventure"},
            {"id": "new-york", "name": "New York", "country": "USA", "cost_factor": 1.0, 
             "tags": "urban cultural museums nightlife shopping food adventure"},
            {"id": "rome", "name": "Rome", "country": "Italy", "cost_factor": 0.8, 
             "tags": "historical cultural architecture museums food relaxation"},
            {"id": "bali", "name": "Bali", "country": "Indonesia", "cost_factor": 0.5, 
             "tags": "beach nature relaxation adventure cultural spiritual"},
            {"id": "dubai", "name": "Dubai", "country": "UAE", "cost_factor": 0.95, 
             "tags": "luxury shopping modern adventure nightlife food"},
            {"id": "london", "name": "London", "country": "UK", "cost_factor": 0.9, 
             "tags": "historical cultural museums shopping nightlife urban food"},
            {"id": "sydney", "name": "Sydney", "country": "Australia", "cost_factor": 0.85, 
             "tags": "beach urban outdoor adventure relaxation food cultural"},
            {"id": "bangkok", "name": "Bangkok", "country": "Thailand", "cost_factor": 0.5, 
             "tags": "cultural food adventure shopping nightlife spiritual"},
            {"id": "delhi", "name": "Delhi", "country": "India", "cost_factor": 0.3, 
             "tags": "historical cultural food architecture spiritual"},
            {"id": "mumbai", "name": "Mumbai", "country": "India", "cost_factor": 0.35, 
             "tags": "urban cultural food nightlife shopping beach"},
            {"id": "goa", "name": "Goa", "country": "India", "cost_factor": 0.4, 
             "tags": "beach relaxation adventure nightlife food cultural"},
        ]
        
        # Sample attractions
        attractions = [
            # Paris
            {"id": 1, "destination_id": "paris", "name": "Eiffel Tower", "category": "sightseeing", 
             "tags": "architecture romantic historical landmark", "cost": 25, "time_required": 2, "rating": 4.7},
            {"id": 2, "destination_id": "paris", "name": "Louvre Museum", "category": "museums", 
             "tags": "art historical cultural", "cost": 15, "time_required": 4, "rating": 4.8},
            {"id": 3, "destination_id": "paris", "name": "Notre-Dame Cathedral", "category": "historical", 
             "tags": "architecture spiritual historical", "cost": 0, "time_required": 1.5, "rating": 4.7},
            {"id": 4, "destination_id": "paris", "name": "Montmartre", "category": "sightseeing", 
             "tags": "cultural artistic neighborhood", "cost": 0, "time_required": 3, "rating": 4.6},
            {"id": 5, "destination_id": "paris", "name": "Seine River Cruise", "category": "relaxation", 
             "tags": "romantic sightseeing relaxation", "cost": 30, "time_required": 1, "rating": 4.5},
            
            # Tokyo
            {"id": 6, "destination_id": "tokyo", "name": "Tokyo Skytree", "category": "sightseeing", 
             "tags": "modern landmark technology", "cost": 20, "time_required": 2, "rating": 4.5},
            {"id": 7, "destination_id": "tokyo", "name": "Senso-ji Temple", "category": "historical", 
             "tags": "spiritual cultural historical", "cost": 0, "time_required": 1.5, "rating": 4.7},
            {"id": 8, "destination_id": "tokyo", "name": "Shibuya Crossing", "category": "sightseeing", 
             "tags": "urban modern landmark", "cost": 0, "time_required": 1, "rating": 4.6},
            {"id": 9, "destination_id": "tokyo", "name": "Tsukiji Fish Market", "category": "food", 
             "tags": "culinary food cultural", "cost": 0, "time_required": 2, "rating": 4.8},
            {"id": 10, "destination_id": "tokyo", "name": "Akihabara", "category": "shopping", 
             "tags": "technology shopping modern", "cost": 0, "time_required": 3, "rating": 4.6},
            
            # New York
            {"id": 11, "destination_id": "new-york", "name": "Statue of Liberty", "category": "sightseeing", 
             "tags": "landmark historical", "cost": 25, "time_required": 3, "rating": 4.7},
            {"id": 12, "destination_id": "new-york", "name": "Central Park", "category": "nature", 
             "tags": "nature outdoor relaxation", "cost": 0, "time_required": 2, "rating": 4.8},
            {"id": 13, "destination_id": "new-york", "name": "Metropolitan Museum of Art", "category": "museums", 
             "tags": "art cultural historical", "cost": 25, "time_required": 3, "rating": 4.9},
            {"id": 14, "destination_id": "new-york", "name": "Times Square", "category": "sightseeing", 
             "tags": "urban modern nightlife shopping", "cost": 0, "time_required": 1, "rating": 4.7},
            {"id": 15, "destination_id": "new-york", "name": "Broadway Show", "category": "cultural", 
             "tags": "entertainment cultural nightlife", "cost": 120, "time_required": 3, "rating": 4.8},
            
            # Add more attractions for other destinations...
            # Delhi
            {"id": 16, "destination_id": "delhi", "name": "Red Fort", "category": "historical", 
             "tags": "historical architecture cultural", "cost": 10, "time_required": 2, "rating": 4.6},
            {"id": 17, "destination_id": "delhi", "name": "Qutub Minar", "category": "historical", 
             "tags": "historical architecture landmark", "cost": 7, "time_required": 1.5, "rating": 4.7},
            
            # Mumbai
            {"id": 18, "destination_id": "mumbai", "name": "Gateway of India", "category": "sightseeing", 
             "tags": "historical landmark architecture", "cost": 0, "time_required": 1, "rating": 4.6},
            {"id": 19, "destination_id": "mumbai", "name": "Marine Drive", "category": "sightseeing", 
             "tags": "urban relaxation scenic", "cost": 0, "time_required": 1.5, "rating": 4.8},
        ]
        
        # Sample activities
        activities = [
            {"id": 1, "name": "City Tour", "category": "sightseeing", "tags": "city tour guided sightseeing", 
             "description": "A guided tour around the city's main attractions."},
            {"id": 2, "name": "Food Tasting Tour", "category": "food", "tags": "food culinary local cuisine", 
             "description": "Explore local cuisine through a guided food tour."},
            {"id": 3, "name": "Museum Visit", "category": "museums", "tags": "art history culture education", 
             "description": "Visit to a local museum or art gallery."},
            {"id": 4, "name": "Hiking", "category": "adventure", "tags": "outdoor nature active adventure", 
             "description": "Hiking in nearby natural areas."},
            {"id": 5, "name": "Shopping Trip", "category": "shopping", "tags": "shopping retail market", 
             "description": "Visit to local markets or shopping districts."},
            {"id": 6, "name": "Nightlife Experience", "category": "nightlife", "tags": "nightlife entertainment bars clubs", 
             "description": "Experience the local nightlife scene."},
            {"id": 7, "name": "Relaxation Day", "category": "relaxation", "tags": "spa wellness relaxation", 
             "description": "Day of relaxation at a spa or wellness center."},
            {"id": 8, "name": "Historical Tour", "category": "historical", "tags": "history guided tour landmarks", 
             "description": "Guided tour of historical sites and landmarks."},
            {"id": 9, "name": "Cultural Performance", "category": "cultural", "tags": "culture performance arts entertainment", 
             "description": "Attend a local cultural performance or show."},
            {"id": 10, "name": "Nature Excursion", "category": "nature", "tags": "nature outdoor park wildlife", 
             "description": "Visit to a natural park or wildlife sanctuary."},
        ]
        
        # Create DataFrames
        self.destinations_df = pd.DataFrame(destinations)
        self.attractions_df = pd.DataFrame(attractions)
        self.activities_df = pd.DataFrame(activities)
    
    def _build_tfidf_matrix(self):
        """Build TF-IDF matrix for content-based filtering"""
        # Combine tags for destinations
        self.destinations_df['combined_features'] = self.destinations_df['name'] + ' ' + \
                                                   self.destinations_df['country'] + ' ' + \
                                                   self.destinations_df['tags']
        
        # Create TF-IDF vectorizer
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        
        # Build TF-IDF matrix
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.destinations_df['combined_features'])
    
    def _calculate_cost_per_day(self, budget, duration, destination_id):
        """Calculate the daily budget based on total budget, duration, and destination cost factor"""
        destination = self.destinations_df[self.destinations_df['id'] == destination_id].iloc[0]
        cost_factor = destination['cost_factor']
        
        # Base cost calculations
        daily_budget = budget / duration
        
        # Adjust based on destination cost factor
        adjusted_daily_budget = daily_budget * cost_factor
        
        return adjusted_daily_budget
    
    def _get_destination_attractions(self, destination_id, interests, budget_per_day, duration):
        """Get attractions for a destination filtered by interests and budget"""
        # Filter attractions by destination
        dest_attractions = self.attractions_df[self.attractions_df['destination_id'] == destination_id]
        
        # If no attractions found, return empty DataFrame
        if dest_attractions.empty:
            return pd.DataFrame()
        
        # Score attractions based on interests match
        dest_attractions['interest_score'] = dest_attractions['tags'].apply(
            lambda tags: sum(1 for interest in interests if interest in tags.split())
        )
        
        # Sort by interest score and rating
        dest_attractions = dest_attractions.sort_values(by=['interest_score', 'rating'], ascending=False)
        
        # Filter based on available budget and time
        total_cost = 0
        total_time = 0
        selected_attractions = []
        
        # Budget allocation: 30% for attractions
        attraction_budget = budget_per_day * duration * 0.3
        
        for _, attraction in dest_attractions.iterrows():
            if total_cost + attraction['cost'] <= attraction_budget and total_time + attraction['time_required'] <= duration * 8:
                selected_attractions.append(attraction)
                total_cost += attraction['cost']
                total_time += attraction['time_required']
        
        return pd.DataFrame(selected_attractions)
    
    def _allocate_activities(self, interests, duration):
        """Allocate activities based on interests and duration"""
        # Filter activities by interests
        relevant_activities = []
        
        for interest in interests:
            matching_activities = self.activities_df[
                (self.activities_df['category'] == interest) | 
                (self.activities_df['tags'].str.contains(interest))
            ]
            relevant_activities.extend(matching_activities.to_dict('records'))
        
        # Remove duplicates
        unique_activities = []
        unique_ids = set()
        
        for activity in relevant_activities:
            if activity['id'] not in unique_ids:
                unique_activities.append(activity)
                unique_ids.add(activity['id'])
        
        # Limit number of activities based on trip duration
        max_activities = min(len(unique_activities), duration * 2)
        selected_activities = random.sample(unique_activities, max_activities) if len(unique_activities) > max_activities else unique_activities
        
        return selected_activities
    
    def _create_daily_itinerary(self, attractions, activities, start_date, duration):
        """Create a day-by-day itinerary"""
        daily_itinerary = []
        current_date = datetime.strptime(start_date, '%Y-%m-%d')
        
        # Distribute attractions across days
        attractions_per_day = len(attractions) // duration
        remaining_attractions = len(attractions) % duration
        
        attraction_index = 0
        
        for day in range(duration):
            day_attractions = attractions_per_day
            if remaining_attractions > 0:
                day_attractions += 1
                remaining_attractions -= 1
            
            # Assign activities for the day
            day_activities = []
            for i in range(day_attractions):
                if attraction_index < len(attractions):
                    attr = attractions.iloc[attraction_index].to_dict()
                    day_activities.append({
                        "name": attr['name'],
                        "type": "attraction",
                        "category": attr['category'],
                        "time_required": attr['time_required'],
                        "cost": attr['cost']
                    })
                    attraction_index += 1
            
            # Add a general activity
            if day < len(activities):
                activity = activities[day]
                day_activities.append({
                    "name": activity['name'],
                    "type": "activity",
                    "category": activity['category'],
                    "description": activity['description']
                })
            
            # Create the daily plan
            daily_plan = {
                "day": day + 1,
                "date": current_date.strftime('%Y-%m-%d'),
                "activities": day_activities
            }
            
            daily_itinerary.append(daily_plan)
            current_date += timedelta(days=1)
        
        return daily_itinerary
    
    def suggest_destinations(self, interests, budget, duration):
        """Suggest destinations based on user interests, budget, and duration"""
        # Convert interests to a single string for vectorization
        if interests:
            user_interests = ' '.join(interests)
        else:
            user_interests = ""
        
        # Transform user interests using the same vectorizer
        user_vector = self.tfidf_vectorizer.transform([user_interests])
        
        # Calculate similarity with destinations
        sim_scores = cosine_similarity(user_vector, self.tfidf_matrix).flatten()
        
        # Get top matches
        sim_scores_with_index = list(enumerate(sim_scores))
        sim_scores_with_index.sort(key=lambda x: x[1], reverse=True)
        
        # Calculate budget per day
        budget_per_day = budget / duration
        
        # Filter destinations by affordability
        affordable_destinations = []
        
        for idx, score in sim_scores_with_index:
            destination = self.destinations_df.iloc[idx]
            if budget_per_day * destination['cost_factor'] >= 50:  # Minimum daily budget
                affordable_destinations.append({
                    "id": destination['id'],
                    "name": destination['name'],
                    "country": destination['country'],
                    "similarity_score": float(score),
                    "cost_factor": float(destination['cost_factor']),
                    "estimated_daily_cost": float(budget_per_day * destination['cost_factor'])
                })
            
            if len(affordable_destinations) >= 5:
                break
        
        return affordable_destinations
    
    def create_itinerary(self, destination_id, interests, budget, duration, start_date):
        """Create a complete itinerary for a destination"""
        # Validate destination
        if not self.destinations_df[self.destinations_df['id'] == destination_id].shape[0]:
            return {"error": "Destination not found"}
        
        # Get destination details
        destination = self.destinations_df[self.destinations_df['id'] == destination_id].iloc[0]
        
        # Calculate daily budget
        daily_budget = self._calculate_cost_per_day(budget, duration, destination_id)
        
        # Get attractions for the destination
        selected_attractions = self._get_destination_attractions(destination_id, interests, daily_budget, duration)
        
        # Allocate activities
        selected_activities = self._allocate_activities(interests, duration)
        
        # Create daily itinerary
        daily_itinerary = self._create_daily_itinerary(selected_attractions, selected_activities, start_date, duration)
        
        # Calculate budget breakdown
        budget_breakdown = {
            "accommodation": round(budget * 0.4),
            "transportation": round(budget * 0.2),
            "food": round(budget * 0.2),
            "attractions": round(budget * 0.15),
            "shopping": round(budget * 0.05)
        }
        
        # Create full itinerary
        full_itinerary = {
            "destination": {
                "id": destination['id'],
                "name": destination['name'],
                "country": destination['country']
            },
            "duration": duration,
            "start_date": start_date,
            "end_date": (datetime.strptime(start_date, '%Y-%m-%d') + timedelta(days=duration-1)).strftime('%Y-%m-%d'),
            "total_budget": budget,
            "daily_budget": round(daily_budget),
            "budget_breakdown": budget_breakdown,
            "daily_itinerary": daily_itinerary
        }
        
        return full_itinerary

# Singleton model instance to be used by API endpoints
_model_instance = None

def get_model_instance():
    """Get or create the model instance"""
    global _model_instance
    
    if _model_instance is None:
        # Try to load a pre-trained model
        model_path = os.path.join(os.path.dirname(__file__), '../data/model.pkl')
        
        if os.path.exists(model_path):
            try:
                print(f"Attempting to load model from {model_path}")
                with open(model_path, 'rb') as f:
                    _model_instance = pickle.load(f)
                print("Loaded pre-trained model successfully")
            except Exception as e:
                print(f"Error loading model: {e}")
                print("Creating new model instance instead")
                _model_instance = ItinerarySuggestionModel()
        else:
            # Create a new model instance
            print(f"Model file not found at {model_path}")
            print("Creating new model instance")
            _model_instance = ItinerarySuggestionModel()
    
    return _model_instance

# API endpoints
def suggest_destinations_api(interests, budget, duration, budget_flexibility=None, accommodation=None, travel_style=None, num_adults=1, num_children=0, requirements=None):
    """API endpoint for suggesting destinations"""
    model = get_model_instance()
    
    # Apply modifiers based on additional parameters
    adjusted_budget = int(budget)
    
    # Budget flexibility adjustment
    if budget_flexibility == "flexible":
        adjusted_budget = int(budget * 1.1)  # 10% increase for flexible budget
    elif budget_flexibility == "very_flexible":
        adjusted_budget = int(budget * 1.2)  # 20% increase for very flexible budget
    
    # Apply accommodation preference to interest matching
    extended_interests = list(interests)
    if accommodation == "luxury" or accommodation == "ultra_luxury":
        extended_interests.append("luxury")
    elif accommodation == "budget":
        extended_interests.append("budget")
    
    # Apply travel style to interest matching
    if travel_style == "slow_paced":
        extended_interests.append("relaxation")
    elif travel_style == "fast_paced":
        extended_interests.append("adventure")
    
    destinations = model.suggest_destinations(extended_interests, adjusted_budget, duration)
    
    # Add additional information to response
    response = {
        "destinations": destinations,
        "query_info": {
            "interests": interests,
            "budget": budget,
            "adjusted_budget": adjusted_budget,
            "duration": duration,
            "budget_flexibility": budget_flexibility,
            "accommodation": accommodation,
            "travel_style": travel_style,
            "travelers": {
                "adults": num_adults,
                "children": num_children
            },
            "requirements": requirements
        }
    }
    
    return json.dumps(response)

def create_itinerary_api(destination_id, interests, budget, duration, start_date, 
                       budget_flexibility=None, accommodation=None, travel_style=None, 
                       num_adults=1, num_children=0, requirements=None):
    """API endpoint for creating an itinerary"""
    model = get_model_instance()
    
    # Apply modifiers based on additional parameters
    adjusted_budget = int(budget)
    
    # Budget flexibility adjustment
    if budget_flexibility == "flexible":
        adjusted_budget = int(budget * 1.1)  # 10% increase for flexible budget
    elif budget_flexibility == "very_flexible":
        adjusted_budget = int(budget * 1.2)  # 20% increase for very flexible budget
    
    # Adjust per-person if traveling with multiple people
    total_travelers = int(num_adults) + int(num_children) * 0.75  # Children count as 0.75 adults
    if total_travelers > 1:
        # Scale budget for multiple travelers - some expenses are shared
        adjusted_budget = int(adjusted_budget * (1 + (total_travelers - 1) * 0.7))
    
    # Apply accommodation preference to interest matching
    extended_interests = list(interests)
    if accommodation == "luxury" or accommodation == "ultra_luxury":
        extended_interests.append("luxury")
    elif accommodation == "budget":
        extended_interests.append("budget")
    
    # Apply travel style to interest matching
    if travel_style == "slow_paced":
        extended_interests.append("relaxation")
    elif travel_style == "fast_paced":
        extended_interests.append("adventure")
    
    # Create the itinerary with extended interests and adjusted budget
    itinerary = model.create_itinerary(destination_id, extended_interests, adjusted_budget, int(duration), start_date)
    
    # Add additional information to response
    itinerary["query_info"] = {
        "original_budget": int(budget),
        "adjusted_budget": adjusted_budget,
        "budget_flexibility": budget_flexibility,
        "accommodation": accommodation,
        "travel_style": travel_style,
        "travelers": {
            "adults": num_adults,
            "children": num_children,
            "total_equivalent": total_travelers
        },
        "requirements": requirements
    }
    
    return json.dumps(itinerary)

if __name__ == "__main__":
    # For testing
    model = ItinerarySuggestionModel()
    
    # Test destination suggestions
    interests = ["cultural", "food", "museums", "historical"]
    budget = 100000
    duration = 7
    
    print("Suggested Destinations:")
    destinations = model.suggest_destinations(interests, budget, duration)
    for dest in destinations:
        print(f"{dest['name']}, {dest['country']} - Similarity: {dest['similarity_score']:.2f}, Est. Daily Cost: {dest['estimated_daily_cost']:.2f}")
    
    # Test itinerary creation
    if destinations:
        dest_id = destinations[0]['id']
        start_date = "2023-09-15"
        
        print("\nCreating Itinerary for:", destinations[0]['name'])
        itinerary = model.create_itinerary(dest_id, interests, budget, duration, start_date)
        
        print(f"\nItinerary for {itinerary['destination']['name']}, {itinerary['destination']['country']}")
        print(f"Duration: {itinerary['duration']} days ({itinerary['start_date']} to {itinerary['end_date']})")
        print(f"Total Budget: {itinerary['total_budget']}, Daily Budget: {itinerary['daily_budget']}")
        
        print("\nBudget Breakdown:")
        for category, amount in itinerary['budget_breakdown'].items():
            print(f"  {category.capitalize()}: {amount}")
        
        print("\nDaily Itinerary:")
        for day in itinerary['daily_itinerary']:
            print(f"\nDay {day['day']} - {day['date']}:")
            for activity in day['activities']:
                print(f"  - {activity['name']} ({activity['category']})")
