export class RandomDie {
    constructor(sides) {
        if (sides === undefined || sides === null) {
            sides = 6;
        }

        if (sides <= 0) {
            throw new Error("'sides' must be > 0");
        }

        this.sides = sides;
    }

    roll() {
        return 1 + Math.floor(this.sides * Math.random());
    }

    rollMany({ count }) {
        const result = [];
        for (let i = 0; i < count; ++i) {
            result.push(this.roll());
        }
        return result;
    }
}
