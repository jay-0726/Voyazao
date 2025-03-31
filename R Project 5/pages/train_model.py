import os
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import sys
from ai import ItinerarySuggestionModel

def train_model():
    """
    Train the itinerary suggestion model and save its state
    """
    print("Training the AI Trip Planner model...")
    
    try:
        # Initialize the model
        model = ItinerarySuggestionModel()
        
        # The model is automatically initialized with sample data
        # and the TF-IDF vectorizer is fitted during initialization
        
        # Save the model to a pickle file
        data_path = os.path.join(os.path.dirname(__file__), '../data')
        model_path = os.path.join(data_path, 'model.pkl')
        
        # Create data directory if it doesn't exist
        if not os.path.exists(data_path):
            os.makedirs(data_path)
        
        # Save the model
        with open(model_path, 'wb') as f:
            pickle.dump(model, f)
        
        print(f"Model trained and saved to {model_path}")
        
        # Print model statistics
        print("\nModel Statistics:")
        print(f"Number of destinations: {model.destinations_df.shape[0]}")
        print(f"Number of attractions: {model.attractions_df.shape[0]}")
        print(f"Number of activity types: {model.activities_df.shape[0]}")
        
        # Test the model with a sample query
        test_interests = ["cultural", "historical", "food"]
        test_budget = 50000
        test_duration = 7
        
        print("\nTesting model with sample query:")
        print(f"Interests: {test_interests}")
        print(f"Budget: {test_budget}")
        print(f"Duration: {test_duration}")
        
        # Get destination suggestions
        suggested_destinations = model.suggest_destinations(
            test_interests, test_budget, test_duration
        )
        
        print("\nTop suggested destinations:")
        for i, dest in enumerate(suggested_destinations[:3], 1):
            print(f"{i}. {dest['name']}, {dest['country']} - Match: {dest['similarity_score']:.2f}")
        
        # Test itinerary creation
        if suggested_destinations:
            test_destination_id = suggested_destinations[0]['id']
            test_start_date = "2023-09-15"
            
            print(f"\nCreating sample itinerary for {suggested_destinations[0]['name']}...")
            
            itinerary = model.create_itinerary(
                test_destination_id, test_interests, test_budget, test_duration, test_start_date
            )
            
            print(f"Itinerary created with {len(itinerary['daily_itinerary'])} days")
            print(f"Daily budget: {itinerary['daily_budget']}")
            
            # Print first day's activities
            print("\nSample day (Day 1):")
            day1 = itinerary['daily_itinerary'][0]
            for activity in day1['activities']:
                print(f"- {activity['name']} ({activity['category']})")
        
        # Verify the model can be loaded
        print("\nVerifying model can be loaded properly...")
        with open(model_path, 'rb') as f:
            loaded_model = pickle.load(f)
        
        print("Model loaded successfully!")
        
        return True
    
    except Exception as e:
        print(f"Error during model training: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = train_model()
    if not success:
        print("\nERROR: Model training failed. Please check the errors above.")
        sys.exit(1)
    else:
        print("\nSUCCESS: Model training completed successfully.")
        sys.exit(0) 