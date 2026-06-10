const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

window.addEventListener("resize", resize);

function drawStem(x, y1, y2) {
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
}

function drawLeaf(x, y, size, side = 1) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(side * 0.5);

    ctx.beginPath();
    ctx.moveTo(0, 0);

    ctx.quadraticCurveTo(
        size * 0.6,
        -size * 0.45,
        size,
        0
    );

    ctx.quadraticCurveTo(
        size * 0.6,
        size * 0.45,
        0,
        0
    );

    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);

    for (let i = 0.2; i < 1; i += 0.2) {
        ctx.moveTo(size * i, 0);
        ctx.lineTo(size * i + 8, -8);
    }

    ctx.stroke();

    ctx.restore();
}

function drawSquareFlower(x, y, size) {

    const r = 22;

    ctx.beginPath();

    ctx.moveTo(x - size/2 + r, y - size/2);

    ctx.lineTo(x + size/2 - r, y - size/2);

    ctx.quadraticCurveTo(
        x + size/2,
        y - size/2,
        x + size/2,
        y - size/2 + r
    );

    ctx.lineTo(x + size/2, y + size/2 - r);

    ctx.quadraticCurveTo(
        x + size/2,
        y + size/2,
        x + size/2 - r,
        y + size/2
    );

    ctx.lineTo(x - size/2 + r, y + size/2);

    ctx.quadraticCurveTo(
        x - size/2,
        y + size/2,
        x - size/2,
        y + size/2 - r
    );

    ctx.lineTo(x - size/2, y - size/2 + r);

    ctx.quadraticCurveTo(
        x - size/2,
        y - size/2,
        x - size/2 + r,
        y - size/2
    );

    ctx.stroke();

    // sketch shading
    for (let i = -size/2 + 5; i < size/2 - 5; i += 8) {
        ctx.beginPath();
        ctx.moveTo(x - size/2 + 8, y + i);
        ctx.lineTo(x - size/2 + 30, y + i + 18);
        ctx.stroke();
    }

    // outer circle
    ctx.beginPath();
    ctx.arc(x, y, size * 0.22, 0, Math.PI * 2);
    ctx.stroke();

    // center
    ctx.beginPath();
    ctx.arc(x, y, size * 0.08, 0, Math.PI * 2);
    ctx.stroke();

    // petals
    for (let i = 0; i < 16; i++) {
        const a = i * Math.PI * 2 / 16;

        ctx.beginPath();
        ctx.moveTo(
            x + Math.cos(a) * size * 0.08,
            y + Math.sin(a) * size * 0.08
        );

        ctx.lineTo(
            x + Math.cos(a) * size * 0.22,
            y + Math.sin(a) * size * 0.22
        );

        ctx.stroke();
    }
}

function drawDandelion(x, y, radius) {

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    const rays = 55;

    for (let i = 0; i < rays; i++) {

        const a = i * Math.PI * 2 / rays;

        const len =
            radius + 25 + Math.random() * 25;

        ctx.beginPath();

        ctx.moveTo(
            x + Math.cos(a) * radius * 0.7,
            y + Math.sin(a) * radius * 0.7
        );

        ctx.lineTo(
            x + Math.cos(a) * len,
            y + Math.sin(a) * len
        );

        ctx.stroke();
    }
}

function drawSimpleFlower(x, y, radius) {

    // flower head
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // center circle
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.22, 0, Math.PI * 2);
    ctx.stroke();

    // sketchy lines around edge like your drawing
    const rays = 26;

    for (let i = 0; i < rays; i++) {

        const a = i * Math.PI * 2 / rays;

        const startR = radius - 4;
        const endR = radius + 18 + Math.random() * 8;

        ctx.beginPath();

        ctx.moveTo(
            x + Math.cos(a) * startR,
            y + Math.sin(a) * startR
        );

        ctx.lineTo(
            x + Math.cos(a) * endR,
            y + Math.sin(a) * endR
        );

        ctx.stroke();
    }

    // slightly curved stem
    ctx.beginPath();
    ctx.moveTo(x, y + radius);

    ctx.quadraticCurveTo(
        x + 10,
        y + radius + 120,
        x + 5,
        y + radius + 260
    );

    ctx.stroke();

    // leaves like the sketch
    drawLeaf(x + 5, y + radius + 90, 35, 1);
    drawLeaf(x + 5, y + radius + 150, 35, -1);
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#111";

    const leftX = canvas.width * 0.28;
    const middleX = canvas.width * 0.45;
    const rightX = canvas.width * 0.72;

    // Left flower
    drawSquareFlower(leftX, 160, 170);
    drawStem(leftX, 245, canvas.height - 40);

    drawLeaf(leftX, 420, 80, -1);
    drawLeaf(leftX, 590, 75, 1);

    // Middle flower
    drawSquareFlower(middleX, 330, 140);
    drawStem(middleX, 400, canvas.height - 40);

    drawLeaf(middleX, 700, 70, 1);

    // Right flower
    drawDandelion(rightX, 150, 55);
    drawStem(rightX, 205, canvas.height - 40);

    drawLeaf(rightX, 340, 85, 1);
    drawLeaf(rightX, 520, 85, 1);
    drawLeaf(rightX, 700, 90, -1);

    // Additional doodle flowers

drawSimpleFlower(
    canvas.width * 0.12,
    canvas.height * 0.75,
    35
);

drawSimpleFlower(
    canvas.width * 0.58,
    canvas.height * 0.18,
    30
);

drawSimpleFlower(
    canvas.width * 0.88,
    canvas.height * 0.78,
    38
);
}

resize();
