/**
 * Represents a group of particles
 */
export class Cell {
    numberOfParticles: number;

    chances = {
        left: 20,
        right: 20,
        down: 30,
        up: 5,
        stay: 25
    };

    constructor(numberOfParticles: number) {
        this.numberOfParticles = numberOfParticles;
    }

    act() : void {
        let randomChance = floor(Math.random()*100);
        
    }

    sumUpChances(chances:object):number {
        let totalChance = 0;
        const enteries = Object.values(chances);
        enteries.forEach((value) => {
            totalChance += value;
        })
        return totalChance;
    }

}