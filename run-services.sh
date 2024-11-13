#!/bin/bash

cd services

cd reservation
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3004\"" >> .env
echo "DATABASE_URL=file:./reservation.db" >> .env
docker compose up -d
cd ../

cd borrowing
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3005\"" >> .env
echo "DATABASE_URL=file:./borrowing.db" >> .env
docker compose up -d
cd ../