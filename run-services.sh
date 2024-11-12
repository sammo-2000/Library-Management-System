#!/bin/bash

cd services

cd reservation
echo "PORT=\"3004\"" >> .env
echo "DATABASE_URL=file:./reservation.db" >> .env
docker compose up -d
cd ../