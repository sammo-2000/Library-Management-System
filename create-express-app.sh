#!/bin/bash

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
npm install express dotenv
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
    "noImplicitThis": true,
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
echo "PORT=3000" > .env

# Create .gitignore file
echo "node_modules/
dist/
.env
" > .gitignore

# Add dotenv config and a simple Express server to src/index.ts
echo "import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});
" > src/index.ts

# Add start scripts to package.json
jq '.scripts.build = "tsc" | .scripts.start = "node dist/index.js" | .scripts.dev = "ts-node src/index.ts"' package.json > temp.json && mv temp.json package.json

echo "Express app with TypeScript, dotenv, .gitignore, and tsconfig setup complete."
echo "Use 'npm run dev' to start the development server."