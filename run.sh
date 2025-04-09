#!/bin/bash

AUTH_SERVICE_BASE_URL="\"http://authservice:3000/api/auth/\""

# Add .env into the auth service
cd services/auths
if [ -f .env ]; then
    rm .env
fi
echo "PORT=3000">> .env
echo "DATABASE_URL=\"file:./auth.db\"" >> .env
cd ../

# Add .env into borrow service
cd borrow
if [ -f .env ]; then
    rm .env
fi
echo "PORT=3000" >> .env
echo "DATABASE_URL=\"file:./borrowing.db\"" >> .env
echo "AUTH_SERVICE_BASE_URL=$AUTH_SERVICE_BASE_URL" >> .env
cd ../

# Add .env into reservation service
cd reservation
if [ -f .env ]; then
    rm .env
fi
echo "PORT=3000" >> .env
echo "DATABASE_URL=\"file:./reservation.db\"" >> .env
echo "AUTH_SERVICE_BASE_URL=$AUTH_SERVICE_BASE_URL" >> .env
cd ../

# TODO: Add inventory service into the API gateway

# Run docker compose
cd ../
docker compose -f docker-compose.yml up -d