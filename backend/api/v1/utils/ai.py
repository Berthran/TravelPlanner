#!/usr/bin/python3
import google.generativeai as genai
from dotenv import load_dotenv
from os import getenv

load_dotenv()

genai.configure(api_key=getenv('AI_KEY'))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_weather_desc(weather_dic, city_name):
	prompt = f'I need you to give me a brief description of {city_name} from the weather status: {weather_dic}'
	response = model.generate_content(prompt)
	return response.text
