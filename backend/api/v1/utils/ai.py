#!/usr/bin/python3
import logging
import google.generativeai as genai
from dotenv import load_dotenv
from os import getenv

load_dotenv()

genai.configure(api_key=getenv("AI_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

log = logging.getLogger()


def generate_city_desc(city):
    """
        Generate a description about city

    Args:
        city(str): Name of city

    Returns:
        description of city
    """
    log.info(f"Generating information about {city}")
    prompt = f"I need you to give me a brief description of {city}, it should not be greater than 1020 letters/characters"

    try:
        response = model.generate_content(prompt)
        log.info(f"Generated information about {city}")
        return response.text
    except Exception as e:
        log.info(f"Unable to generate information about {city}: {e}")
        return None


def generate_city_keyword(city):
    """
        Generate keywords about city

    Args:
        city(str): Name of city

    Returns:
        Keywords relating to the city
    """
    prompt = (
        f"I need 3 to 5 keywords of this place, {city}. "
        "Send your response in this format (compulsory)e.g "
        "A, B, C, D separated by comma"
    )

    log.info(f"Generating keywords about {city}")
    try:
        response = model.generate_content(prompt)
        data = (response.text).strip("\n")
        log.info(f"Generated keywords about {city}")
        return data
    except Exception as e:
        log.info(f"Unable to generate keywords about {city}: {e}")
        return None
