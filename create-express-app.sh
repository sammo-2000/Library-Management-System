#!/bin/bash

PORT=3004

# Check if a project name was provided
if [ -z "$1" ]; then
  echo "Please provide a project name."
  exit 1
fi

# Create and navigate to the project folder
PROJECT_NAME=$1
cd services
mkdir "$PROJECT_NAME" && cd "$PROJECT_NAME"

# Initialize a new Node.js project
npm init -y

# Install Express, dotenv, and TypeScript dependencies
npm install express dotenv zod
npm install -D typescript ts-node @types/node @types/express

# Initialize TypeScript configuration
npx tsc --init

# Configure TypeScript settings for "rootDir", "outDir", and other recommended rules
cat <<EOT > tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOT

# Create folder structure and files
mkdir src
touch src/index.ts
touch .env

# Populate .env file with a default PORT variable
echo "PORT=$PORT" > .env

# Create .gitignore file
echo "node_modules/
dist/
.env
.DS_Store
" > .gitignore

# Add dotenv config and a simple Express server to src/index.ts
echo '// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { env } from "./types/envTypes";

const app = express();
const PORT = env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Calling /");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

' > src/index.ts

# Create a types folder and add a file for environment variables
mkdir src/types
touch src/types/envTypes.ts

echo 'import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().min(1),
});

export const env = envSchema.parse(process.env);

' > src/types/envTypes.ts

# Add start scripts to package.json
jq '.scripts.build = "tsc" | .scripts.start = "node dist/index.js" | .scripts.dev = "ts-node src/index.ts"' package.json > temp.json && mv temp.json package.json

# Create Dockerfile
cat <<EOT > Dockerfile
# Base Image
FROM node:14-alpine

WORKDIR /usr/app
# install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
EOT

# Create docker-compose.yml file
cat <<EOT > docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "$PORT:$PORT"
    volumes:
      - .:/usr/src/app
    environment:
      - NODE_ENV=development
      - PORT=$PORT
EOT

# Create .dockerignore file
cat <<EOT > .dockerignore
/src
EOT

echo "Express app with TypeScript, dotenv, Docker, and Docker Compose setup complete."
echo "Use 'docker-compose up --build' to start the server in a Docker container, or 'npm run dev' for local development."