import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import { sha256sum } from './sha256sum';

const BASE_PATH = '/home/node/app/extractions';
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export class ExtractionsExplorer {
    static async listExtractions(dir: 'monobank' | 'privatbank') {
        const files: any = await fs.readdirSync(`${BASE_PATH}/${dir}`)
            .filter(file => fs.statSync(`${BASE_PATH}/${dir}/${file}`).mtime.getTime() - Date.now() < WEEK_IN_MS)
            .filter(file => file.endsWith('.csv'))
            .map(file => ({
                path: `${BASE_PATH}/${dir}/${file}`,
            }))

        for (const file of files) {
            file.checksum = await sha256sum(file.path, true)
        }

        return files;
    }


}