import { Client, ClientOptions } from "discord.js";
import EventHandler from "bot.eventhandlers.EventHandler";

export default class Bot {
    private _client:Client;

    constructor(options:ClientOptions) {
        this._client = new Client(options);
    }

    public get client():Client {
        return this.client;
    }

    public add_event_handler(event_handler:EventHandler):this {
        this._client.on(event_handler.event, (...args) => event_handler.handle(...args));
        return this;
    }

    public async start(token:string):Promise<string> {
        return this._client.login(token);
    }
}
