#!/bin/bash

docker network create shared-network

cd frontend
echo BASE_URL=\""http://localhost:3000/"\">> .env
echo AUTH_SERVICE_BASE_URL=\""http://localhost:3002/api/"\">> .env
echo NEXT_PUBLIC_STRIPE_PUBLIC_KEY=\""pk_test_51QNYr3Amxc9dTyf5oQqnf8sLRipuduamkaeSpoH38t0yVI453kmi50sgH7em6x4ctIPKPWEeC1fXk9OVtnjK5B2d00QsQHiGgK"\">> .env
cd ../

cd services

cd payment
if [ -f .env ]; then
    rm .env
fi
echo BASE_URL=\""http://localhost:3001/api/"\">> .env
echo SUCCESS_URL=\""http://localhost:3000/success"\">> .env
echo CANCEL_URL=\""http://localhost:3000/cancel"\">> .env
echo YEAR_PRICE=\""5000"\">> .env
echo MONTH_PRICE=\""500"\">> .env
echo SECRET_KEY=\""sk_test_51QNYr3Amxc9dTyf5gulVLTq9zTBDPAiUgz3EgrgpRRvpNLRXw6APaEbE09MRavcug4vHYfpo5HIcgp7Tt4R0A29H00EYSys4KB"\">> .env
echo WEBHOOK_KEY=\""whsec_WClTvTHsvHP0fyYgI1Tn9ss7sIBDP4P3"\">> .env
echo DATABASE_URL=\""postgres://neondb_owner:4EcwB6vWLbfe@ep-orange-star-a2dfwhpn-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"\">> .env
echo NODE_ENV=\""production"\">> .env
echo "AUTH_SERVICE_BASE_URL=\"http://app:3002/api/\"" >> .env
cd ../

cd Authentication
if [ -f .env ]; then
    rm .env
fi
echo "PORT=3002">> .env
echo "DB_PORT=5432">> .env
echo "HOST=localhost" >> .env
echo "USER=user123" >> .env
echo "PASSWORD=password123" >> .env
echo "DATABASE=db123" >> .env
echo "JWT_SECRET=d62f8bfa4c62a2dcc860d7a424dbc9859dba0bf204f3f0dbfab900361474c36da13bded3b298eff7922d8f56b07f728579bae297dbddc60e9645b8a10046927c" >> .env
echo "STAGE=development" >> .env
npm install
npm run build
docker compose -f docker-compose.yml up -d
cd ../

cd reservation
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3004\"" >> .env
echo "DATABASE_URL=\"file:./reservation.db\"" >> .env
echo "AUTH_SERVICE_BASE_URL=\"http://app:3002/api/\"" >> .env
docker compose up -d
cd ../

cd borrow
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3005\"" >> .env
echo "DATABASE_URL=\"file:./borrowing.db\"" >> .env
echo "AUTH_SERVICE_BASE_URL=\"http://app:3002/api/\"" >> .env
docker compose up -d
cd ../

cd inventory
if [ -f .env ]; then
    rm .env
fi
echo "PORT=\"3003\"" >> .env
echo "DB_PORT=\"5432\"" >> .env
echo "DB_HOST=\"db\"" >> .env
echo "DB_USER=\"myUser\"" >> .env
echo "DB_PASSWORD=\"myPassword\"" >> .env
echo "DB_NAME=\"inventoryDB\"" >> .env
docker compose up -d
cd ../

cd ../
cd frontend
npm install --legacy-peer-deps
npm run dev