let resolution = 40;
let cols: number;
let rows: number;
let grid: any[];

let chanses = {
    left: 20,
    right: 20,
    down: 30,
    up: 5,
    stay: 25
};


function setup() {
    createCanvas(600,400);
    cols = windowWidth / resolution;
    rows = windowHeight / resolution;
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

function create2dgrid(cols: number, rows: number) {
    let arr = new Array(cols);
    for (let col = 0; col < arr.length; col++) {
        arr[col] = new Array(rows);
    }
    return arr;
}