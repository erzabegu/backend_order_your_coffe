import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { join } from 'path';

const initFirebaseAdmin = async () => {
    try {
        const serviceAccountPath = join(process.cwd(), 'src', 'config', 'firebase-admin.json');
        const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

    } catch (error) {
        throw new Error()
    }
};

export default initFirebaseAdmin;
