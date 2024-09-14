#!/usr/bin/python3
"""Module handles all authentications"""
from backend.api.v1.views import app_views
from backend.models.user import User
from backend.models import storage
from flask import jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, create_refresh_token, jwt_required


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
	"""Tries to log in user

	Returns:
		json: returns a json format with the token
	"""
	data = request.get_json()
	email = data.get('email')
	password = data.get('password')

	if not email or not password:
		return jsonify({'message': 'Email and password are required'}), 400

	user = storage.get_user_by_email(email)

	if not user or not user.check_password(password):
		return jsonify({'message': 'Invalid credentials'}), 401

	access_token = create_access_token(identity={'id': user.id})
	refresh_token = create_refresh_token(identity={'id': user.id})
	return jsonify({'access_token': access_token, 'refresh_token': refresh_token}), 200


@app_views.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
	"""Signs up a new user

	Returns:
		json: message with status if successfully or failed
	"""
	data = request.get_json()
	email = data.get('email')
	password = data.get('password')
	username = data.get('username')

	if not email or not password or not username:
		return jsonify({'message': 'Email, password, username are required'}), 400

	if storage.get_user_by_email(email=email):
		return jsonify({'message': 'Email address already exists'}), 400
	try:
		new_user = User(
			email=email, password=password,
			username=username)
		storage.new(new_user)
		storage.save()
		return jsonify({'message': 'User created successfully'}), 201
	except Exception as e:
		return jsonify({'message': str(e)}), 500

@app_views.route('/refresh', methods=['POST', 'OPTIONS'], strict_slashes=False)
@jwt_required(refresh=True)
def refresh():
	current_user = get_jwt_identity()
	new_access_token = create_access_token(identity=current_user)
	return jsonify({'access_token': new_access_token}), 200
