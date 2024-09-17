#!/usr/bin/python3
import json
import logging
import google.generativeai as genai
import typing_extensions as typing
from dotenv import load_dotenv
from os import getenv

load_dotenv()

genai.configure(api_key=getenv("AI_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

log = logging.getLogger()


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
    log.info(f"Generating Tourist Attractions in {city_name}")

    prompt = f"Generate five Tourist attractions in {city_name} \
            in json format containing the name only"
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema=TouristAttractions,
        ),
    )
    response = json.loads(response.text)
    response["city"] = city_name

    try:
        assert "city" in response
        assert "places" in response
        assert len(response["places"]) == 5

        log.info(f"Generated Tourist Attractions: {response}")
        return response
    except Exception:
        log.error(f"Failed to Generate TouristAttractions in {city_name}")
        return {"city": None, "places": None}


def generate_city_desc(city, place=None):
    if place is None:
        prompt = (
            f"I need you to give me a brief description of {city}, "
            "it should not be greater than 1020 letters/characters"
        )
    else:
        prompt = f"I need you to give a brief description of {place} in {city}"

    response = model.generate_content(prompt)
    return response.text


def generate_city_keyword(city_name):
    prompt = (
        f"I need 3 to 5 keywords of this place, {city_name}. "
        "Send your response in this format (compulsory)e.g "
        "A, B, C, D separated by comma"
    )
    response = model.generate_content(prompt)
    data = (response.text).strip("\n")
    return data
