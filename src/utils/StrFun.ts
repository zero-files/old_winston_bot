export default class StrFun{
    /**
     * Strips the content of a message of its prefix and trigger
     * and returns it as an array without spaces.
     * @param content The original content string of the message.
     */
    public static strip(content:string):string[] {
        return content.replace(/!\s*/, "").split(" ").splice(1);
    }
}
