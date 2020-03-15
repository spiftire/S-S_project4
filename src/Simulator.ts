import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";
import { Grid } from "./Grid";

export class Simulator {
  readonly TRESHOLD_FOR_SPLIT = 10;
  readonly RIGHT_EDGE: number;
  readonly LEFT_EDGE: number = 0;
  readonly TOP_EDGE: number = 0;
  readonly BOTTOM_EDGE: number;
  totalChanse = 0;
  cells: Array<CellOfParticles>;
  grid: Grid;

  chances: Map<Direction, number>;

  constructor(grid: Grid) {
    this.chances = new Map();
    this.chances.set(Direction.Left, 20);
    this.chances.set(Direction.Right, 20);
    this.chances.set(Direction.Down, 30);
    this.chances.set(Direction.Up, 5);
    this.chances.set(Direction.Stay, 25);

    this.grid = grid;
    this.RIGHT_EDGE = this.grid.numberOfColums;
    this.BOTTOM_EDGE = this.grid.numberOfRows;

    this.totalChanse = this.sumUpChances();
    let firstCell = new CellOfParticles(10000, new GridPosition(8, 0));

    grid.setContentAtPosition(
      firstCell.position.x,
      firstCell.position.y,
      firstCell
    );
  }

  init() {
    // todo create array of cells
  }

  step() {
    let oldGrid = this.grid;
    // console.table(oldGrid.grid);
    // create new array from old
    const newGrid = new Grid(oldGrid.numberOfRows, oldGrid.numberOfColums);

    let numbOfColums = oldGrid.numberOfColums;
    let numbOfRows = oldGrid.numberOfRows;
    /// loop thoough old array
    let counter = 0;
    for (let y = 0; y < numbOfColums; y++) {
      for (let x = 0; x < numbOfRows; x++) {
        counter++;
        // console.warn("loop counter" + counter);
        let cell = oldGrid.getPositionContent(x, y);
        if (cell != null && cell.numberOfParticles > 0) {
          // console.log(cell);

          const numberOfParticles = cell.numberOfParticles;

          // looping through all the chanses to get split amount
          this.chances.forEach((_: number, direction: Direction) => {
            // calculate split
            const splitAmount = this.calculateAmountToSplit(
              numberOfParticles,
              direction
            );

            // put new cells into position
            let newPosition = this.getNewCellPosition(
              <Direction>(<unknown>direction),
              cell.position
            );

            // if there is something at that position add it
            let newCell = this.splitCell(splitAmount, cell, newPosition);
            if(cell.numberOfParticles<=0) {cell = null};
            this.mergeParticleInCell(newCell, oldGrid, newGrid);
          });
        }
      }
    }
    console.table(newGrid.grid);
    this.grid = newGrid;
  }

  mergeParticleInCell(newCell: CellOfParticles, oldGrid: Grid, newGrid: Grid) {
    //check if there already is a cell at new position
    // if yes merge them, if no insert new cell.
    // if it is not posible to move stay on current position, check if there is particles in ocupied spot (in new grid)
    // if yes merge them, if not insert.

    const x: number = newCell.position.x;
    const y: number = newCell.position.y;
    let result: CellOfParticles = newCell;
    // console.log(newCell);

    const cellAlreadyThere = oldGrid.getPositionContent(x, y);
    const cellInNewGrid = newGrid.getPositionContent(x, y);
    // console.log("The Old cell" + cellAlreadyThere);

    if (cellAlreadyThere != null && cellAlreadyThere.numberOfParticles > 0) {
      // console.log(`NewCell.Particles = ${newCell.numberOfParticles}`);
      let particles =
        newCell.numberOfParticles + cellAlreadyThere.numberOfParticles;
      let position = newCell.position;
      result = new CellOfParticles(particles, position);

      // newCell.numberOfParticles += cellAlreadyThere.numberOfParticles;
    } else if (cellInNewGrid != null) {
      // const tempGrid = new Grid(newGrid.numberOfRows, newGrid.numberOfColums);
      // this.mergeParticleInCell(newCell, newGrid, tempGrid);
      // newGrid = tempGrid;
      // newCell.numberOfParticles += cellInNewGrid.numberOfParticles + cellAlreadyThere.numberOfParticles;
    }
    // console.log(`NewCell.Particles = ${newCell.numberOfParticles}`);
    newGrid.setContentAtPosition(x, y, result);
  }

  getNewCellPosition(
    direction: Direction,
    startPosition: GridPosition
  ): GridPosition {
    const x = startPosition.x;
    const y = startPosition.y;
    // console.log("y: " + y);
    // console.log("x: " + x);
    // console.log(direction);

    let newX: number = x,
      newY: number = y;
    switch (direction) {
      case Direction.Right:
        if (x < this.RIGHT_EDGE) {
          newX = x + 1;
        }
        break;

      case Direction.Left:
        if (x > this.LEFT_EDGE) {
          newX = x - 1;
        }
        break;

      case Direction.Up:
        if (y > this.TOP_EDGE) {
          newY = y - 1;
        }
        break;

      case Direction.Down:
        if (y < this.BOTTOM_EDGE) {
          newY = y + 1;
        }
        break;
      case Direction.Stay:
        newX = x;
        newY = y;
        break;
      default:
        console.log("Default state in getNewCellPosition not implemented");

        break;
    }
    // console.log(`ǸewX: ${newX}, newY: ${newY}`);

    return new GridPosition(newX, newY);
  }

  calculateAmountToSplit(orgAmount: number, direction: Direction): number {
    let chance = 0;
    if (orgAmount > this.TRESHOLD_FOR_SPLIT) {
      chance = this.chances.get(direction);
    }

    return (orgAmount * chance) / this.totalChanse;
  }

  splitCell(
    numberToSplitAway: number,
    cellToSplit: CellOfParticles,
    positionOfNewCell: GridPosition
  ): CellOfParticles {
    cellToSplit.numberOfParticles -= numberToSplitAway;
    return new CellOfParticles(numberToSplitAway, positionOfNewCell);
  }

  sumUpChances(): number {
    let totalChance = 0;
    this.chances.forEach((chance, _) => {
      totalChance += chance;
    });
    return totalChance;
  }
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
  Stay
}
