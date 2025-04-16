#!/bin/bash

AUTH_SERVICE_BASE_URL="\"http://authservice:3000/api/auth/\""
STRIPE_PUBLIC_KEY="\"pk_test_51QNYr3Amxc9dTyf5oQqnf8sLRipuduamkaeSpoH38t0yVI453kmi50sgH7em6x4ctIPKPWEeC1fXk9OVtnjK5B2d00QsQHiGgK\""

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

# Add .env into inventory service
cd inventory
if [ -f .env ]; then
    rm .env
fi
# Application environment variables
echo "PORT=\"3000\"" >> .env
echo "DB_PORT=\"5432\"" >> .env
echo "DB_HOST=\"inventorydatabase\"" >> .env
echo "DB_USER=\"myUser\"" >> .env
echo "DB_PASSWORD=\"myPassword\"" >> .env
echo "DB_NAME=\"inventoryDB\"" >> .env

# PostgreSQL container environment variables
echo "POSTGRES_USER=\"myUser\"" >> .env
echo "POSTGRES_PASSWORD=\"myPassword\"" >> .env
echo "POSTGRES_DB=\"inventoryDB\"" >> .env
cd ../

# Add .env into frontend service
cd ../
cd frontend
if [ -f .env ]; then
    rm .env
fi
echo "BASE_URL=\"http://localhost:3000/\"" >> .env
echo "AUTH_SERVICE_BASE_URL=$AUTH_SERVICE_BASE_URL" >> .env
echo "NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY" >> .env
npm install --legacy-peer-deps

# Run docker compose for all services
cd ../
docker compose -f docker-compose.yml up -d
cd frontend
npm run dev