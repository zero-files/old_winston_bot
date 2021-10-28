import * as admin from "firebase-admin";
import FirebaseConfig from "./FirebaseConfig";
import Env from "../utils/Env";

export default class FirebaseDatabase {
    private static _instance: FirebaseDatabase;
    private app:admin.app.App;
    public database:admin.firestore.Firestore;

    private constructor() {
        const private_key_id = Env.FIREBASE_PRIVATE_KEY_ID;
        const private_key = Env.FIREBASE_PRIVATE_KEY;

        const config = new FirebaseConfig(private_key_id, private_key);

        this.app = admin.initializeApp({
            credential: admin.credential.cert(config as admin.ServiceAccount)
        });

        this.database = this.app.firestore();
    }

    public static get instance():FirebaseDatabase {
        if (!FirebaseDatabase._instance) {
            FirebaseDatabase._instance = new FirebaseDatabase();
        }

        return FirebaseDatabase._instance;
    }
}
