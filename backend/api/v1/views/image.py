#!/usr/bin/python3
"""Module handle image request"""
from api.v1.views import app_views
from flask import request, send_file


@app_views.route("/get_image", methods=["GET"], strict_slashes=False)
def get_image():
    """
    Send image to frontend client. Image
    is gotten using query parameters
    """
    city = request.args.get("city")

    file_path = f"images/{city}.png"
    return send_file(file_path, mimetype="image/png")
