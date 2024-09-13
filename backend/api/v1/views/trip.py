#!/usr/bin/python3
"""Module handles all authentications"""
from api.v1.views import app_views
from backend.models.trip import Trip
from backend.models import storage
from flask import jsonify, request
from api.v1.utils.utils import get_lat_lon, get_weather_details

from flask_jwt_extended import create_access_token, get_jwt_identity, create_refresh_token, jwt_required


@app_views('/place', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_weather_condition():
	data = request.get_json()
	city_name = data.get('city_name')

	lat, lon = get_lat_lon(city_name)
	weather_data = get_weather_details(lat, lon, city_name)
	return jsonify({"message": weather_data}), 200

