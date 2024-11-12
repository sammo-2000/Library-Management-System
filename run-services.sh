#!/bin/bash

cd services

cd Authentication
npm run build
docker compose -f docker-compose.yml up -d
cd ../