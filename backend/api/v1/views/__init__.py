#!/usr/bin/python3
"""Contains all Blueprint for API"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from backend.api.v1.views.auth import *
from backend.api.v1.views.trip import *

