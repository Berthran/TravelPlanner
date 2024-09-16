# Backend Architecture
* **This project is to be developed with the `Flask`, a micro web framework written in python.**
* **JSON Web token to be used for Authorization and Authentication**
* **MySQL as Database**

## Available Endpoints
### `/signup`
Register the user to be able to  the service. User information required:
 - **Username**
 - **Email**
 - **Password**
 > Response
 - **Status Code: 201**
 - **{"message": "User created successfully"}**
### `/login`
Log the user in to have access to service. User information required:
 - **email**
 - **Password**
 > Response
 - **{"access_token": "Token", "refresh_token": "Token"}**
### `/dashboard`
Shows the planned trips.
### `/place`
User information required:
 > **city_name**
 > **access_token**
 > Response
 - **{"city_places": {"city": str, "places": [{"Description": str, "Place": str, "url_link": str}]}, "message": {"Description": str, "humidity": int, "keywords": str, "temperature": int, "weather": str, "wind_speed": float}}**
* Provides a brief information about the place, keywords describing the place. 
Amount of money required to have a good time. (`Gemini API`)
* Provides information about the weather condition about the place (`weather API`)
* Provides information about tourist attractions about the place (`Google maps API`)
