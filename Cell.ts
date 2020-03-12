/**
 * Represents a cell of particles
 */
export class CellOfParticles {
  numberOfParticles: number;
  totalChance: number;

  readonly TRESHOLD_FOR_SPLIT = 1000;

  chances = {
    left: 20,
    right: 20,
    down: 30,
    up: 5,
    stay: 25
  };

  constructor(numberOfParticles: number) {
    this.numberOfParticles = numberOfParticles;
    this.totalChance = this.sumUpChances(this.chances);
  }

  act(): void {
    let randomChance = floor(Math.random() * 100);
  }

  sumUpChances(chances: object): number {
    let totalChance = 0;
    const enteries = Object.values(chances);
    enteries.forEach(value => {
      totalChance += value;
    });
    return totalChance;
  }

  calculateSplitCell() {
    if (this.numberOfParticles > this.TRESHOLD_FOR_SPLIT) {
      let right = (this.numberOfParticles * this.chances.right) / 100;
      let left = (this.numberOfParticles * this.chances.left) / 100;
      let down = (this.numberOfParticles * this.chances.down) / 100;
      let up = (this.numberOfParticles * this.chances.up) / 100;

      let rightCell = this.splitCell(right);
      let leftCell = this.splitCell(left);
      let downCell = this.splitCell(down);
      let upCell = this.splitCell(up);

      return { rightCell, leftCell, downCell, upCell };
    }
  }

  private splitCell(numberToSplitAway: number): CellOfParticles {
    this.numberOfParticles -= numberToSplitAway;
    return new CellOfParticles(numberToSplitAway);
  }
}
