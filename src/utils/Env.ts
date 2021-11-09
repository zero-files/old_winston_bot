class UndefinedEnvVar extends Error {
    constructor(variable:string) {
        super(`Undefined environment variable: ${variable}`);
        this.name = "UndefinedEnvVar";
    }
}

export default class Env {
    public static get BOT_TOKEN():string {
        const token = process.env.BOT_TOKEN;
        if (token === undefined) throw new UndefinedEnvVar("BOT_TOKEN");

        return token;
    }

    public static get FIREBASE_PRIVATE_KEY_ID():string {
        const private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;
        if (private_key_id === undefined) throw new UndefinedEnvVar("FIREBASE_PRIVATE_KEY_ID");

        return private_key_id;
    }

    public static get FIREBASE_PRIVATE_KEY():string {
        const private_key_base64 = process.env.FIREBASE_PRIVATE_KEY;
        if (private_key_base64 === undefined) throw new UndefinedEnvVar("FIREBASE_PRIVATE_KEY");

        const is_base64 = private_key_base64.match(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/);
        if(!is_base64) throw new Error("FIREBASE_PRIVATE_KEY is not a valid base64 string");

        try {
            return Buffer.from(private_key_base64, "base64").toString("ascii").replace(/\\n/g, "\n");
        } catch {
            throw new Error("FIREBASE_PRIVATE_KEY is not a valid base64 string");
        }
    }

    public static get GOOGLE_API_KEY():string {
        const api_key = process.env.GOOGLE_API_KEY;
        if (api_key === undefined) throw new UndefinedEnvVar("GOOGLE_API_KEY");

        return api_key;
    }

    public static get GOOGLE_ENGINE_ID():string {
        const engine_id = process.env.GOOGLE_ENGINE_ID;
        if (engine_id === undefined) throw new UndefinedEnvVar("GOOGLE_ENGINE_ID");

        return engine_id;
    }

    public static get OWM_API_KEY():string {
        const api_key = process.env.OWM_API_KEY;
        if (api_key === undefined) throw new UndefinedEnvVar("OWM_API_KEY");

        return api_key;
    }
}
