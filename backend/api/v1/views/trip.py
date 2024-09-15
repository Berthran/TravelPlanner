#!/usr/bin/python3
"""Module handles all authentications"""
from api.v1.views import app_views
from models.trip import Trip
from models import storage
from flask import jsonify, request
from api.v1.utils.utils import get_lat_lon, get_weather_details, get_picture_of_places
from api.v1.utils.ai import generate_tourist_places

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    create_refresh_token,
    jwt_required,
)


@app_views.route("/place", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_weather_condition():
    data = request.get_json()
    city_name = data.get("city_name")

    city_places = generate_tourist_places(city_name)
    city_information = get_picture_of_places(city_places)

    lat, lon = get_lat_lon(city_name)
    weather_data = get_weather_details(lat, lon, city_name)
    return jsonify(
                {
                    "message": weather_data,
                    "city_places": city_information
                }
                ), 200
