#!/bin/bash

cd services

cd payment
npm run build
docker compose -f docker-compose.yml up -d
cd ../