import { CellOfParticles } from './CellOfParticles'
import { GridPosition } from './GridPosition'

let resolution = 20
let cols: number
let rows: number
let grid: any[]
let firstCell: CellOfParticles

function setup() {
	createCanvas(600, 400)
	cols = floor(width / resolution)
	rows = floor(height / resolution)
	grid = create2dgrid(cols, rows)
	// populateGrid();
	firstCell = new CellOfParticles(10000, new GridPosition(floor(rows / 2), 0))

	placeFirstCell(firstCell)
}

function placeFirstCell(cell: CellOfParticles) {
	grid[cell.position.x][cell.position.y] = cell
}

function draw() {
	background(255)

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * resolution
			let y = j * resolution
			if (grid[i][j]) {
				fill(51)
				stroke(0)
				rect(x, y, resolution - 1, resolution - 1) // -1 pixle to get boarders
			}
		}
	}
}

function populateGrid() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = floor(random(2))
		}
	}
}

function create2dgrid(cols: number, rows: number) {
	let arr = new Array(cols)
	for (let col = 0; col < arr.length; col++) {
		arr[col] = new Array(rows)
	}
	return arr
}
