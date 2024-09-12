# Backend Architecture
* **This project is to be developed with the `Flask`, a micro web framework written in python.**
* **JSON Web token to be used for Authorization and Authentication**
* **MySQL as Database**

## Available Endpoints
### `/register`
Register the user to be able to  the service. User information required:
 > **Name**
 > **Username**
 > **Email**
 > **Password**
### `/login`
Log the user in to have access to service. User information required:
 > **username**
 > **Password**
### `/dashboard`
Shows the planned trips.
### `/place`
User information required:
 > **place of interest**
* Provides a brief information about the place, keywords describing the place. 
Amount of money required to have a good time. (`Gemini API`)
* Provides information about the weather condition about the place (`weather API`)
* Provides information about tourist attractions about the place (`Google maps API`)
