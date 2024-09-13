#!/usr/bin/python3
import google.generativeai as genai
from dotenv import load_dotenv
from os import getenv

load_dotenv()

genai.configure(api_key=getenv('AI_KEY'))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_city_desc(city_name):
	prompt = f'I need you to give me a brief description of {city_name}, it should not be greater than 1020 letters/characters'
	response = model.generate_content(prompt)
	return response.text


def generate_city_keyword(city_name):
	prompt = f'I need 3 to 5 keywords of this place, {city_name}. Send your response in this format (compulsory)e.g A, B, C, D separated by comma'
	response = model.generate_content(prompt)
	data = (response.text).strip('\n')
	return data
