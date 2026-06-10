const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 2;
ctx.strokeStyle = "#222";

function drawLeaf(x, y, w, h, angle = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-w / 2, 0);

    ctx.quadraticCurveTo(
        0,
        -h / 2,
        w / 2,
        0
    );

    ctx.quadraticCurveTo(
        0,
        h / 2,
        -w / 2,
        0
    );

    ctx.stroke();

    // center vein
    ctx.beginPath();
    ctx.moveTo(-w / 2, 0);
    ctx.lineTo(w / 2, 0);

    // side veins
    for (let i = -2; i <= 2; i++) {
        ctx.moveTo(i * w / 6, 0);
        ctx.lineTo(i * w / 6 + 8, -8);
    }

    ctx.stroke();
    ctx.restore();
}

function drawSquareFlower(x, y, size) {
    // stem
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(x, y + 220);
    ctx.stroke();

    // flower box
    ctx.beginPath();

    ctx.moveTo(x - size / 2 + 10, y - size / 2);
    ctx.lineTo(x + size / 2 - 10, y - size / 2);

    ctx.quadraticCurveTo(
        x + size / 2,
        y - size / 2,
        x + size / 2,
        y - size / 2 + 10
    );

    ctx.lineTo(x + size / 2, y + size / 2 - 10);

    ctx.quadraticCurveTo(
        x + size / 2,
        y + size / 2,
        x + size / 2 - 10,
        y + size / 2
    );

    ctx.lineTo(x - size / 2 + 10, y + size / 2);

    ctx.quadraticCurveTo(
        x - size / 2,
        y + size / 2,
        x - size / 2,
        y + size / 2 - 10
    );

    ctx.lineTo(x - size / 2, y - size / 2 + 10);

    ctx.quadraticCurveTo(
        x - size / 2,
        y - size / 2,
        x - size / 2 + 10,
        y - size / 2
    );

    ctx.stroke();

    // sketch shading
    for (let i = -size / 2; i < size / 2; i += 8) {
        ctx.beginPath();
        ctx.moveTo(x - size / 2 + 5, y + i);
        ctx.lineTo(x - size / 2 + 20, y + i + 10);
        ctx.stroke();
    }

    // center circle
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.stroke();

    // petals
    const petals = 16;

    for (let i = 0; i < petals; i++) {
        const a = (Math.PI * 2 * i) / petals;

        ctx.beginPath();
        ctx.moveTo(
            x + Math.cos(a) * 14,
            y + Math.sin(a) * 14
        );

        ctx.lineTo(
            x + Math.cos(a) * 40,
            y + Math.sin(a) * 40
        );

        ctx.stroke();
    }
}

function drawDandelion(x, y) {
    // stem
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 250);
    ctx.stroke();

    // center
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.stroke();

    // fuzzy rays
    for (let i = 0; i < 60; i++) {
        const a = (Math.PI * 2 * i) / 60;
        const len = 50 + Math.random() * 25;

        ctx.beginPath();
        ctx.moveTo(
            x + Math.cos(a) * 18,
            y + Math.sin(a) * 18
        );

        ctx.lineTo(
            x + Math.cos(a) * len,
            y + Math.sin(a) * len
        );

        ctx.stroke();
    }
}

// LEFT FLOWERS
drawSquareFlower(300, 180, 130);
drawSquareFlower(340, 360, 110);

// leaves
drawLeaf(210, 450, 70, 35, -0.7);
drawLeaf(330, 620, 95, 40, -0.3);

// RIGHT DANDELION
drawDandelion(800, 160);

drawLeaf(900, 340, 70, 30, -0.2);
drawLeaf(900, 460, 75, 30, -0.3);
drawLeaf(720, 520, 100, 35, 0.1);
