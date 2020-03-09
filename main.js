let resolution = 40;
let cols;
let rows;
let grid;

function setup() {
    createCanvas(600,400);
    cols = width / resolution;
    rows = height / resolution;
    grid = create2dgrid(cols, rows);
    populateGrid();
}


function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] == 1) {
                fill(51);
                stroke(0);
                rect(x, y, resolution, resolution);
            }
        }
    }
}

function populateGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function create2dgrid(cols, rows) {
    let arr = new Array(cols);
    for (let col = 0; col < arr.length; col++) {
        arr[col] = new Array(rows);
    }
    return arr;
}