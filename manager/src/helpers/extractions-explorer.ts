import * as fs from 'node:fs';
import * as crypto from 'node:crypto';

const BASE_PATH = '/home/node/app/extractions';
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export class ExtractionsExplorer {
    static async listExtractions(dir: 'monobank' | 'privatbank') {
        const files = await fs.readdirSync(`${BASE_PATH}/${dir}`);
        return files
            .filter(file => fs.statSync(`${BASE_PATH}/${dir}/${file}`).mtime.getTime() - Date.now() < WEEK_IN_MS)
            .filter(file => file.endsWith('.csv'))
            .map(file => ({
                path: `${BASE_PATH}/${dir}/${file}`,
                sha256sum: this.checksumFile(`${BASE_PATH}/${dir}/${file}`)
            }))
    }

    static async checksumFile(path) {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(path);
            stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => resolve(hash.digest('hex')));
        });
    }
}