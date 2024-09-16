#!/usr/bin/python3
"""Module handles all authentications"""
from api.v1.views import app_views
from models.trip import Trip
from models.weather import Weather
from models import storage
from flask import jsonify, request
from api.v1.utils.utils import (
    get_lat_lon,
    get_weather_details,
    get_picture_of_places,
    get_current_user
)
from api.v1.utils.ai import generate_tourist_places

from flask_jwt_extended import jwt_required


@app_views.route("/place_unauth", methods=["POST"], strict_slashes=False)
@jwt_required()
def get_weather_condition():
    """Get weather condition of a place from city_name

    Returns:
            json: details about the place with weather details
    """
    data = request.get_json()
    city_name = data.get("city_name")

    lat, lon = get_lat_lon(city_name)
    weather_data = get_weather_details(lat, lon, city_name)


    city_places = generate_tourist_places(city_name)
    city_information = get_picture_of_places(city_places)

    return (
        jsonify({"message": weather_data, "city_places": city_information}),
        200,
    )


@app_views.route("/place", methods=["POST"], strict_slashes=False)
def get_weather_condition():
    """Get weather condition of a place from city_name

    Returns:
            json: details about the place with weather details
    """
    data = request.get_json()
    user = get_current_user()
    city_name = data.get("city_name")

    lat, lon = get_lat_lon(city_name)
    weather_data = get_weather_details(lat, lon, city_name)

    new_trip = Trip(
        city_name=city_name,
        latitude=lat,
        longitude=lon,
        description=weather_data["description"],
        keywords=weather_data["keywords"],
        user_id=user.id,
    )

    storage.new(new_trip)

    new_weather = Weather(
        temperature=weather_data["temperature"],
        weather_condition=weather_data["weather"],
        wind_speed=weather_data["wind_speed"],
        humidity=weather_data["humidity"],
        trip=new_trip,
    )

    storage.new(new_weather)

    city_places = generate_tourist_places(city_name)
    city_information = get_picture_of_places(city_places)

    storage.save()
    return (
        jsonify({"message": weather_data, "city_places": city_information}),
        200,
    )

@app_views.route("/query_place", methods=["POST"], strict_slashes=False)
def get_place_info():
    """Get weather condition of a place from city_name

    Returns:
            json: details about the place with weather details
    """
    data = request.get_json()
    city_name = data.get("city_name")

    lat, lon = get_lat_lon(city_name)
    weather_data = get_weather_details(lat, lon, city_name)

    city_places = generate_tourist_places(city_name)
    city_information = get_picture_of_places(city_places)

    return (
        jsonify({"message": weather_data, "city_places": city_information}),
        200,
    )


@app_views.route("/dashboard", methods=["GET"], strict_slashes=False)
@jwt_required()
def dashboard():
    """Get all trips and weather data associated to a user

    Returns:
            json: a list of trips and their weather condition
            as of when user made request
    """
    user = get_current_user()

    trips = storage.all(Trip).values()
    weathers = storage.all(Weather).values()

    list_trip = []

    if not trips:
        return (
            jsonify({"error": "No user trip found, try creating a trip"}),
            404,
        )

    for t in trips:
        if t.user_id == user.id:
            trip_data = t.to_dict()
            trip_data["weather"] = None

            for w in weathers:
                if w.trip_id == t.id:
                    trip_data["weather"] = w.to_dict()
                    break
            list_trip.append(trip_data)

    return jsonify(list_trip), 200
