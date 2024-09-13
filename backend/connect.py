import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='traveller',
                             password='traveller',
                             database='travel_planner',
                             cursorclass=pymysql.cursors.DictCursor)

with connection:
    print("Musa")
