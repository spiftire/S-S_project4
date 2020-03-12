/**
 * Represents a cell of particles
 */
export class CellOfParticles {
  numberOfParticles: number;

  constructor(numberOfParticles: number) {
    this.numberOfParticles = numberOfParticles;
  }

  act(): void {
    let randomChance = floor(Math.random() * 100);
  }
}
