#!/usr/bin/python3
from api.v1.utils.ai import generate_weather_desc

weather_dic = {
  "coord": {
    "lon": 3.34,
    "lat": 6.4
  },
  "weather": [
    {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.33,
    "feels_like": 299.36,
    "temp_min": 298.33,
    "temp_max": 298.33,
    "pressure": 1014,
    "humidity": 94,
    "sea_level": 1014,
    "grnd_level": 1014
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.54,
    "deg": 230
  },
  "rain": {
    "1h": 0.69
  },
  "clouds": {
    "all": 40
  },
  "dt": 1726206996,
  "sys": {
    "type": 1,
    "id": 1185,
    "country": "NG",
    "sunrise": 1726205857,
    "sunset": 1726249655
  },
  "timezone": 3600,
  "id": 2332459,
  "name": "Lagos",
  "cod": 200
}

generate_weather_desc(weather_dic, "Lagos")


