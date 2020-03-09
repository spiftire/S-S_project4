let resolution = 40;
let cols;
let rows;

function setup() {
    createCanvas(600,400);
    cols = width / resolution;
    rows = height / resolution;
}

function draw() {
    create2dgrid(cols, rows);
}

function create2dgrid(cols, rows) {
    let grid = new Array(cols);
    for (let col = 0; col < cols.length; col++) {
        cols[col] = new Array(rows);
    }
    return grid;
}

