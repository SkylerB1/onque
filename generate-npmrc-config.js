import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config();

const PQINA_NPM_KEY = process.env.VITE_PQINA_NPM_KEY;
// const PQINA_NPM_KEY = import.meta.env.VITE_PQINA_NPM_KEY;

const npmrcContent = `
@pqina:registry=https://npm.pqina.nl/
//npm.pqina.nl/:_authToken=${PQINA_NPM_KEY}
`;

fs.writeFileSync(path.join(process.cwd(), '.npmrc'), npmrcContent.trim());
