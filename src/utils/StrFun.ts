export default class StrFun{
    /**
     * Strips the content of a message of its prefix and trigger
     * and returns it as an array without spaces.
     * @param content The original content string of the message.
     */
    public static strip(content:string):string[] {
        return content.replace(/!\s*/, "").split(" ").splice(1);
    }

    public static capitalize(str:string):string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public static normalize(str:string):string{
        return str
            .replace(/ /g,"%20")
            .normalize("NFD")
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
            .normalize();
    }
}
