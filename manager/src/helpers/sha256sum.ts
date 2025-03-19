import * as crypto from 'node:crypto';
import * as fs from 'node:fs';

export const sha256sum = async (data, isFilePath): Promise<string> => {
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