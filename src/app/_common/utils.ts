export class Utils {

    public randomRangeInteger(min: number, max: number): number {
        const rnd = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rnd);
    }

}
