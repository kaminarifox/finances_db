import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import { Duration } from 'luxon';
import { parseFile } from 'fast-csv';

const BASE_PATH = '/home/node/extractions';
const WEEK_IN_MS = Duration.fromObject({ weeks: 1 }).as('milliseconds');

export class Helpers {
    static async sha256sum(data, isFilePath): Promise<string> {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');

            if (!isFilePath) {
                hash.update(data);
                return resolve(hash.digest('hex'));
            }

            const stream = fs.createReadStream(data);
            stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => resolve(hash.digest('hex')));
        });
    }

    static async listExtractions(dir: string, filetype: string) {
        const files: any = await fs.readdirSync(`${BASE_PATH}/${dir}`)
            .filter(file => fs.statSync(`${BASE_PATH}/${dir}/${file}`).mtime.getTime() - Date.now() < WEEK_IN_MS)
            .filter(file => file.endsWith(`.${filetype}`))
            .map(file => ({
                path: `${BASE_PATH}/${dir}/${file}`,
            }))

        for (const file of files) {
            file.checksum = await Helpers.sha256sum(file.path, true)
        }

        return files;
    }

    static async parseCsv(filepath: string, headers, nullStr = ''): Promise<Record<string, unknown>[]> {
        return new Promise((resolve, reject) => {
            const entities = []
            parseFile(filepath, { headers, renameHeaders: true })
                .transform(row => {
                    Object.keys(row).forEach(key => {
                        row[key] = row[key] === nullStr ? null : row[key]
                    })
                    return row
                })
                .on('error', error => { reject(error) })
                .on('data', row => {
                    entities.push(row)
                })
                .on('end', (rowCount: number) => {
                    resolve(entities)
                });
        })
    }
}