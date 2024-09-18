#!/usr/bin/python3
"""Module handles all authentications"""
import logging
from api.v1.views import app_views
from models.trip import Trip
from models.weather import Weather
from models.plan_trip import PlanTrip
from models import storage
from flask import jsonify, request
from api.v1.utils.utils import (
	get_lat_lon,
	get_place_info,
	get_current_user,
	save_information,
	load_information,
)
from flask_jwt_extended import jwt_required

log = logging.getLogger()


@app_views.route("/plan_trip", methods=["POST"], strict_slashes=False)
@jwt_required()
def plan_trip():
	"""
	Plan trip to places
	"""
	data = request.get_json()

	city = data.get('city')
	start_date = data.get("startDate")
	end_date = data.get("endDate")
	no_of_people = int(data.get("numberOfPeople"))
	accommodation_name = data.get("accommodation")['name']
	accommodation_price = float(data.ge("accommodation")['price'])
	flight_departure_price = float(data.get("flight")['departure_price'])
	flight_return_price = float(data.get("flight")['return_price'])
	transport_cost = float(data.get("transport")['cost'])
	meals_snack_price = float(data.get("meals")['price'])
	activities = float(data.get("activities")["price"])
	total_budget = float(data.get('totalBudget'))

	try:
		plan_trip = PlanTrip( city=city,
			start_date=start_date, end_date=end_date,
			number_of_people=no_of_people, accommodation_name=accommodation_name,
			accommodation_price=accommodation_price, flight_departure_price=flight_departure_price,
			flight_return_price=flight_return_price, transport_cost=transport_cost,
			meals_snack_price=meals_snack_price, activities_tourist_sport_price=activities,
			total_budget=total_budget
		)

		print(plan_trip)
		return 'Trip saved successfully', 200
	except Exception as e:
		return f'Error while saving Trip {e}', 500


@app_views.route("/save_place", methods=["POST"], strict_slashes=False)
def save_place():
	"""
		Save information of a place

	Returns:
		Message - Status (information has been saved)
	"""

	data = request.get_json()
	city_name = data.get("city")

	log.info(f"Saving info about {city_name}")

	lat, lon = get_lat_lon(city_name)
	place_info = get_place_info(lat, lon, city_name)

	try:
		assert place_info is not None
		status = save_information(place_info, city_name)
		assert status == 0
		return (
			jsonify({"message": "Information saved"}),
			200,
		)
	except Exception as e:
		log.error(f"Unable to save information about {city_name}: {e}")
		return (jsonify({"mesage": "Unable to get information"}), 500)


@app_views.route("/load_place", methods=["GET"], strict_slashes=False)
def load_place():
	"""
	Load Information about place
	"""
	place = request.args.get("city")
	log.info(f"Loading information about {place}")
	data = load_information(place)
	if data is None:
		return (jsonify({"message": "No information"}), 200)

	log.info(f"Loaded information about {place}")
	return (jsonify(data), 200)


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
