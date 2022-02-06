import { randomBytes } from "crypto";

export default class RandomFuns {
    /**
     * Generates a cryptographically secure pseudorandom number from 0 to 255,
     * as specified by (`min`,`max`)
     * @param min A minimum expected number ─ *default: `0`*
     * @param max A maximum expected number ─ *default: `255`*
     */
    public static randomUInt8(min = 0, max = 255): number {
        //parameters check
        if (min === max) return max;
        if (min > max) {
            const minAux = min; //auxiliary const
            min = max;
            max = minAux;
        }
        if (max > 255) max = 255;

        const randomByte = randomBytes(1)[0];

        if(min === 0 && max === 255) return randomByte;

        const range = max - min + 1;
        const max_range = 256;

        if (randomByte >= Math.floor(max_range / range) * range)
            return this.randomUInt8(min, max);

        return min + (randomByte % range);
    }

    public static randomFloat():number {
        return randomBytes(4).readUInt32LE() / 0xFFFFFFFF;
    }
}
