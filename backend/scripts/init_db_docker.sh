#!/usr/bin/env bash

set -x # Enable xtrace
set -eo pipefail # Causes the script to exit on error


# Check if docker is installed and running
if ! [ -x "$(command -v docker)" ]; then
	echo >&2 "Error: docker is not installed and running"
	exit 1
fi

# Check if  a custom user has been set, Otherwise default to `traveller`
DB_USER=${MYSQL_USER:=traveller}
# Check if a custom password has been set, Otherwise default to `traveller`
DB_PASSWORD="${MYSQL_PASSWORD:=traveller}"
# Check if a custom database name has been set, Otherwise default to `travel_planner`
DB_NAME="${MYSQL_DB:=travel_planner}"
# Check if a custom port has been set, Otherwise default to `3306`
DB_PORT="${MYSQL_PORT:=3306}"
# Check if a host has been set, Otherwise default to localhost
DB_HOST="${MYSQL_HOST:=localhost}"
# pymysql host(I don't know why)
PYMYSQL_HOST=192.168.65.1

# Allow to skip docker if a dockerized mysql database is already running
if [[ -z "${SKIP_DOCKER}" ]] 
then
	# Run image 
	docker run \
		--rm --name travel_planner_db \
		-e MYSQL_ROOT_PASSWORD="${DB_PASSWORD}" \
		-e MYSQL_DATABASE="${DB_NAME}" \
		-e MYSQL_HOST="${DB_HOST}" \
		-e MYSQL_PASSWORD="${DB_PASSWORD}" \
		-d -p "${DB_PORT}":3306 mysql 
	echo "Database Container running!!" 
fi

# Keep Pinging mysql until it's ready to accept commands
export MYSQLPASSWORD="${DB_PASSWORD}" # Used by mysql 
until docker exec travel_planner_db mysql -h "${DB_HOST}" --password="${DB_PASSWORD}" -e "quit"; do
	>&2 echo "mysql is still unavailable --sleeping"
	sleep 1
done

# Prepare user
docker exec travel_planner_db mysql \
	-h "${DB_HOST}" \
	--password="${DB_PASSWORD}" \
	-e "CREATE USER '${DB_USER}'@'${PYMYSQL_HOST}' IDENTIFIED BY '${DB_PASSWORD}';"

docker exec travel_planner_db mysql \
	-h "${DB_HOST}" \
	--password="${DB_PASSWORD}" \
	-e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'${PYMYSQL_HOST}';"


docker exec travel_planner_db mysql \
	-h "${DB_HOST}" \
	--password="${DB_PASSWORD}" \
	-e "FLUSH PRIVILEGES;"

echo "mysql has migrate, ready to go"
