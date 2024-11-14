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

cd inventory
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3003\"" >> .env
echo "DB_PORT=\"5001\"" >> .env
echo "DB_HOST=\"localhost\"" >> .env
echo "DB_USER=\"myUser\"" >> .env
echo "DB_PASSWORD=\"myPassword\"" >> .env
echo "DB_NAME=\"inventoryDB\"" >> .env
docker compose docker-compose.inventory.db.yml up -d
docker compose up -d
cd ../