import Command from "bot/commands/Command";

export default class Commands {
    private command_map:Map<string, Command> = new Map();

    /**
     * Check if a command exists in the command map
     * @param name command name
     */
    public has(name:string):boolean {
        return this.command_map.has(name);
    }

    /**
     * Add a unique command to the command map
     * @param command
     */
    public add(command:Command):this {
        if(!this.has(command.name)) this.command_map.set(command.name, command);
        return this;
    }

    /**
     * Get a command from the command map
     * @param name command name
     */
    public get(name:string):Command | null {
        return this.command_map.get(name) || null;
    }

    /**
     * Get an IterableIterator from the command map
    */
    public get_all():Command[] {
        return Array.from(this.command_map.values());
    }

    /**
     * Remove a command from the command map
     * @param name command name
     */
    public remove(name:string):void {
        this.command_map.delete(name);
    }

    public match(command_attempt:string):Command | null {
        const commands = this.command_map.values();
        for(const command of commands) {
            if(command.triggers.includes(command_attempt)) return command;
        }

        return null;
    }
}
