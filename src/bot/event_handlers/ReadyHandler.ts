import EventHandler from "bot.eventhandlers.EventHandler";

export default class ReadyHandler implements EventHandler {
    public event = "ready";

    public async handle():Promise<void> {
        console.log("BeepBoop o0/");
    }
}
