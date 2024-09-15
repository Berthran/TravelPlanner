#!/usr/bin/python3
import urllib.parse
import requests
from dotenv import load_dotenv
from os import getenv, mkdir
from api.v1.utils.ai import generate_city_desc

load_dotenv()

# Weather Parameters
LOCATION_URL = getenv("LOCATION_API_URL")
API_KEY = getenv("WEATHER_KEY")
WEATHER_URL = getenv("WEATHER_API_URL")

# Map Parameters
MAP_LOCATION_URL = getenv("MAP_LOCATION_URL")
MAP_API_KEY = getenv("MAP_API_KEY")
MAP_PICTURE_URL = getenv("MAP_PICTURE_URL")

# IMAGE_URL
IMAGE_URL = getenv("IMAGE_URL")
IMAGE_LOCATION = getenv("IMAGE_LOCATION")


def get_lat_lon(city_name: str) -> tuple:
    """Get city latitude and longitude

    Args:
            city_name (str): the city name

    Returns:
            tuple: (lat, lon)
    """

    r = requests.get(f"{LOCATION_URL}?q={city_name}&appid={API_KEY}")
    data = r.json()
    lat = data[0].get("lat")
    lon = data[0].get("lon")
    return (lat, lon)


def get_weather_details(latitude: float,
                        longitude: float,
                        city_name: str) -> dict:
    """get the weather details of location

    Args:
            latitude (float): the latitude of the place
            longitude (float): the longitude of the place

    Returns:
            dict: dictionary rep of weather condition
    """
    weather = {}
    r = requests.get(f"{WEATHER_URL}?lat={latitude}&lon={longitude}&appid={API_KEY}")
    data = r.json()
    weather["temperature"] = data.get("main").get("temp")
    weather["weather"] = data.get("weather")[0].get("main")
    weather["wind_speed"] = data.get("wind").get("speed")
    weather["humidity"] = data.get("main").get("humidity")
    weather["description"] = generate_city_desc(city_name)
    return weather


def get_picture_of_places(city_places):
    """
        Get the picture of places in city

    Args:
        city_places(dict): Dict containing city and places

    Returns:
        Dict containing information and pictures
        about places in the city

    """
    city = city_places["city"]
    places = city_places["places"]

    try:
        file_path = f"{IMAGE_LOCATION}/{city}"
        mkdir(file_path)
    except FileExistsError:
        pass

    information = {"city": city, "places": []}

    for place in places:
        desc = generate_city_desc(city, place)
        information["places"].append(get_picture_of_place(city, place))
        information["places"][-1]["Description"] = desc

    return information


def get_picture_of_place(city, place):
    """
        Get the picture of a place using the
        Google maps API and save the picture

    Args:
        city(str): City in which place is located
        place(str): Place in which picture is required

    Returns:
        Dict containing place and image name
    """
    response = requests.get(
        MAP_LOCATION_URL,
        params={
            "fields": "formatted_address,name,place_id,photos",
            "input": f"{place} {city}",
            "inputtype": "textquery",
            "key": MAP_API_KEY,
        },
    )

    if response.status_code != 200:
        return None

    photos = response.json()["candidates"][0]["photos"]
    photo_reference = photos[0]["photo_reference"]

    response = requests.get(
        MAP_PICTURE_URL,
        params={
            "maxwidth": 400,
            "maxheight": 400,
            "photo_reference": photo_reference,
            "key": MAP_API_KEY,
        },
    )

    file_name = f"{place.split(" ")[0]}.png"
    save_image(city, file_name, response.content)
    url_link = create_url_link(city, file_name)

    return {"Place": place, "url_link": url_link}


def save_image(dir, file_name, image_data):
    """
        Save image data with file_name

    Args:
        dir(str): Directory to save image
        file_name(str): Name of the image
        image_data(bytes): Image Data
    """
    with open(f"{IMAGE_LOCATION}/{dir}/{file_name}", "wb") as image:
        image.write(image_data)


def create_url_link(dir, file_name):
    """
        Create Url link to access image

    Args:
        file_name(str): Name of the image
        dir(str): Directory to save image

    Returns:
        Url link
    """
    params = {"city": dir, "place": file_name[:-4]}
    query_string = urllib.parse.urlencode(params,
                                          quote_via=urllib.parse.quote)

    return f"{IMAGE_URL}?{query_string}"
