#!/usr/bin/python3
import json
import requests
import google.generativeai as genai
import typing_extensions as typing
from dotenv import load_dotenv
from os import getenv

load_dotenv()

genai.configure(api_key=getenv("AI_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


class TouristAttractions(typing.TypedDict):
    city: str
    places: list[str]


def generate_tourist_places(city_name):
    """
        Generate Tourist attractions in a place

    Args:
        city_name(str): Name of place

    Returns:
        Tourist attractions in json format

    """

    prompt = f"Generate five Tourist attractions in {city_name} \
            in json format containing the name only"
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json", response_schema=TouristAttractions
        ),
    )
    return json.loads(response.text)["places"]


def get_picture_of_place(place, city_name):
    """
        Get the picture of a place using the
        Google maps API

    Args:
        place(str): Place in which picture is required

    Returns:
        Picture reference if available else None
    """
    base_location_url = getenv("MAP_LOCATION_URL")
    map_api_key = getenv("MAP_API_KEY")
    response = requests.get(
        base_location_url,
        params={
            "fields": "formatted_address,name,place_id,photos",
            "input": f"{place} {city_name}",
            "inputtype": "textquery",
            "key": map_api_key,
        },
    )

    if response.status_code != 200:
        return None

    photos = response.json()["candidates"][0]["photos"]
    photo_reference = photos[0]["photo_reference"]
    print(photo_reference)

    photo_url = getenv("MAP_PICTURE_URL")
    response = requests.get(
        photo_url,
        params={
            "maxwidth": 400,
            "maxheight": 400,
            "photo_reference": photo_reference,
            "key": map_api_key,
        },
    )

    file_name = f"{place.split(" ")[0]}.png"
    save_image(file_name, response.content)

    return {"Place": place, "file": file_name}


def save_image(file_name, image_data):
    """
        Save image data with file_name

    Args:
        file_name(str): Name of the image
        image_data(bytes): Image Data
    """
    with open(f"Images/{file_name}", "wb") as image:
        image.write(image_data)


result = generate_tourist_places("Lagos")
print(result)
get_picture_of_place(result[1], "lagos")
