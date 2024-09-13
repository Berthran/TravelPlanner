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
  - [Google Maps API](https://developers.google.com/maps/documentation)
 
  ## Contributors
  - Daniel Berthran
  - Felsi Vasitha
  - Wiseman Umanah
  - Gilbert Henyo
  - Castro Omondi
  - Oluwamayowa Mustapha


## EXAMPLE OF DATA EXPECTED IN THE .ENV file

DB_PORT=3306
DB_USER=traveller
DB_PASSWORD=traveller
DB_NAME=travel_planner
DB_HOST=localhost
SECRET_KEY=traveller (can be any unique key)
LOCATION_API_URL=https://api.openweathermap.org/geo/1.0/direct
WEATHER_KEY=befa9540 (create one from the openweathermap api)
WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
AI_KEY=AIzaSyB.... (create one from Gemini API)


## STEPS to run 
- create virtual environment

`python3 -m venv .venv`

- install packages

`pip3 install -r requirements.txt`

- setup up your .env keys
- setup database, run:

```
sudo service mysql start
cat db_prep.sql | sudo mysql
```

- run code

`python3 -m api.v1.app`

access swagger file at
`/swagger`