#!/bin/bash

# Start the servers in the background
# * Start the server back-end
echo "Starting the server back-end..."
cd ./E-commerce-Back/
npm run dev &

# * Start the server front-end
cd ../E-commerce-front/
echo "Startin the server front-end ..."
npm run dev