import fs from 'fs/promises';
import path from 'path';

export const swaggerDocument = await (async () =>
  JSON.parse(await fs.readFile(`${path.resolve()}/swagger.json`)))();
