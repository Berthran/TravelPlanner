<<<<<<< HEAD
#!/usr/bin/python3
"""Flask app to control API"""
from flask import Flask, make_response, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.v1.views import app_views
from dotenv import load_dotenv
from flask_swagger_ui import get_swaggerui_blueprint
import os
import datetime


load_dotenv()

app = Flask(__name__)


app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=10)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(days=30)

jwt = JWTManager(app)

# For images
try:
    os.mkdir("api/v1/images")
except FileExistsError:
    pass

app.register_blueprint(app_views)


CORS(app, resources={
    r"/api/v1/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})


SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Travel Planner'
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


@app.errorhandler(404)
def not_found(error):
    """Handle 404 error

    Args:
        error (str): The error message

    Returns:
        json: Not found
    """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 error

    Args:
        error (str): The error message

    Returns:
        json: Internal Server Error
    """
    return make_response(jsonify({'error': 'Internal Server Error'}), 500)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, threaded=True, debug=True)
=======
#!/usr/bin/python3
"""Flask app to control API"""
from flask import Flask, make_response, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.v1.views import app_views
from dotenv import load_dotenv
from flask_swagger_ui import get_swaggerui_blueprint
import os
import datetime


load_dotenv()

app = Flask(__name__)


app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=10)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(days=30)

jwt = JWTManager(app)

# For images
try:
    os.mkdir("api/v1/images")
except FileExistsError:
    pass

app.register_blueprint(app_views)


CORS(app, resources={
    r"/api/v1/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})


SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Travel Planner'
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


@app.errorhandler(404)
def not_found(error):
    """Handle 404 error

    Args:
        error (str): The error message

    Returns:
        json: Not found
    """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 error

    Args:
        error (str): The error message

    Returns:
        json: Internal Server Error
    """
    return make_response(jsonify({'error': 'Internal Server Error'}), 500)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, threaded=True, debug=True)
>>>>>>> 50c0143aa77cb335487aa77ee3a3b1276d760ec3
