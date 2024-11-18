#!/bin/bash

cd services

cd Authentication
echo "PORT=3002">> .env
echo "DB_PORT=5432">> .env
echo "HOST=localhost" >> .env
echo "USER=user123" >> .env
echo "PASSWORD=password123" >> .env
echo "DATABASE=db123" >> .env
echo "JWT_SECRET=d62f8bfa4c62a2dcc860d7a424dbc9859dba0bf204f3f0dbfab900361474c36da13bded3b298eff7922d8f56b07f728579bae297dbddc60e9645b8a10046927c" >> .env
echo "STAGE=development" >> .env
npm run build
docker compose -f docker-compose.yml up -d
cd ../

cd reservation
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3004\"" >> .env
echo "DATABASE_URL=file:./reservation.db" >> .env
docker compose up -d
cd ../

cd borrow
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