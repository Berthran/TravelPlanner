# Travel Planner

Travel Planner is a handy tool to get travellers up to speed with travel preparations for unfamiliar locations or destinations.

## Funtionalities
- User registration: users can create unique accounts to manage their travel plans
- User Login: users can access their accounts
- User Dashboard: a board that contains all travel plans a user has created
- Travel Planner: a guide to planning travels

## APIs Used
  - [OpenWeatherMap](https://openweathermap.org/)
  - [Google Gemini API](https://ai.google.dev/)

https://github.com/user-attachments/assets/f5c0c628-83f3-4472-b2a9-f015f1927ed2


  - [Google Maps API](https://developers.google.com/maps/documentation)
 
  ## Contributors
  - Daniel Berthran
  - Felsi Vasitha
  - Wiseman Umanah
  - Gilbert Henyo <kofidaba@gmail.com>
  - Castro Omondi
  - Oluwamayowa Musa


## EXAMPLE OF DATA EXPECTED IN THE .ENV file

# DATABASE
DB_PORT=3306
DB_USER=traveller
DB_PASSWORD=traveller
DB_NAME=travel_planner
DB_HOST=localhost
SECRET_KEY=traveller

# WEATHER PARAMS
LOCATION_API_URL=https://api.openweathermap.org/geo/1.0/direct
WEATHER_KEY=?
WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather

# AI KEY
AI_KEY=?

# GOOGLE MAP PARAMS
REACT_APP_GOOGLE_MAPS_API_KEY=?
MAP_LOCATION_URL=https://maps.googleapis.com/maps/api/place/findplacefromtext/json
MAP_PICTURE_URL=https://maps.googleapis.com/maps/api/place/photo
MAP_API_KEY=?

# APP
IMAGE_URL=http://127.0.0.1:5000/api/v1/get_image
IMAGE_LOCATION=api/v1/images
PLACE_INFO_LOCATION=api/v1/place_info

## STEPS to run 

- run the install script (Not using docker) [terminal 0]
```
cd backend
chmod +x scripts/.init_db_docker.sh
sudo scripts/.init_db_docker.sh
```

- create virtual environment

`python3 -m venv .venv`

- install packages

`pip3 install -r requirements.txt`

- setup up your .env keys

- run code

`python3 -m api.v1.app`

- access swagger file at for testing api endpoints, if necessary

`/swagger`


- run frontend [terminal 1]

- Be sure to have the environment variable also present in the frontend directory

- start the program

```
cd frontend
npm install
npm start
```


- NOTE: THE ENVIRONMENT VARIABLES MUST BE SAME IN BOTH LOCATIONS .i.e

@ backend/ and frontend/

- to stop the docker container

`sudo docker stop travel_planner_db`
