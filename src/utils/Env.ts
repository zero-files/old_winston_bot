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
}
