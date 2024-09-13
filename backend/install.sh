#!/usr/bin

# This script will make the app setup easy

cat db_prep.sql | sudo mysql
if "$? != 0" then
	echo "Error occurred, while creating db";
else
	echo "Done"
endif
