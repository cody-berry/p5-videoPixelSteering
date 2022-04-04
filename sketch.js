/**
 *  @author
 *  @date 2022.03.
 *
 *
 */
let font
let instructions

let squareWidth = 10


let vehicles = []


function preload() {
    font = loadFont('data/consola.ttf')
}


function setup() {
    let cnv = createCanvas(640, 360)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)

    rectMode(CORNER)

    for (let x = 0; x < width/squareWidth; x++) {
        for (let y = 0; y < height/squareWidth; y++) {
            vehicles.push(new Vehicle((x + 1/2)*squareWidth, (y + 1/2)*squareWidth, squareWidth/2, color(0, 0, 0)))
        }
    }
}


function draw() {
    background(234, 34, 24)

    for (let i = 0; i < vehicles.length; i++){
        let vh = vehicles[i]
        vh.show()
        vh.update()
        vh.behaviors()
    }

    displayDebugCorner()
}


/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    strokeWeight(0)

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}