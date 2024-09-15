#!/usr/bin/bash

# This script will make the app setup easy

create_env() {
    echo "
DB_PORT=3306
DB_USER=traveller
DB_PASSWORD=traveller
DB_NAME=travel_planner
DB_HOST=localhost
SECRET_KEY=traveller
LOCATION_API_URL=https://api.openweathermap.org/geo/1.0/direct
WEATHER_KEY=?
WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
AI_KEY=?
    " > .env
}


sudo service mysql start
cat migrations/db_prep.sql | sudo mysql
if [ $? -ne 0 ]; then
    echo "Error occurred while creating DB"
else
    create_env

    python3 -m venv .venv
    source .venv/bin/activate
    pip3 install -r requirements.txt

    # Run the app
    echo "
		Please be sure to add your WEATHER_KEY and AI_KEY in the .env file
		You can get the WEATHER_KEY from https://api.openweathermap.org
		Get your AI_KEY from Gemini https://ai.google.dev/gemini-api/docs/quickstart
		Feel Free to run python3 -m backend.api.v1.app to get the api started
	"
fi
