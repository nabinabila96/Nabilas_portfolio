document.addEventListener("DOMContentLoaded", function () {
    /*** Game 1: Irradiate the Molecule ***/
    const canvas1 = document.getElementById("game1");
    const ctx1 = canvas1.getContext("2d");
    const shutterButton = document.getElementById("shutterButton");
    let bubbleHit = false;
    let handleX = 200;
    let shutterActive = false;
    let isMoving = true;

    const canvasWidth = canvas1.width; // Define canvasWidth
    const canvasHeight = canvas1.height; // Define canvasHeight

    const bubble = { x: canvasWidth / 2, y: 50, radius: 20 }; // Adjusted bubble position

    function drawGame1() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

        // Draw shooter
        ctx1.fillStyle = "blue";
        ctx1.beginPath();
        ctx1.moveTo(canvasWidth / 2 - 20, canvasHeight - 50); // Adjusted shooter position
        ctx1.lineTo(canvasWidth / 2 + 20, canvasHeight - 50);
        ctx1.lineTo(canvasWidth / 2, canvasHeight - 100);
        ctx1.closePath();
        ctx1.fill();

        // Draw handle (pneumatic stage)
        ctx1.fillStyle = "grey";
        ctx1.fillRect(bubble.x - 30, bubble.y - 30, 60, 10);

        // Draw bubble (or square if hit)
        ctx1.fillStyle = bubbleHit ? "black" : "white";
        ctx1.beginPath();
        if (bubbleHit) {
            ctx1.fillRect(bubble.x - bubble.radius, bubble.y - bubble.radius, bubble.radius * 2, bubble.radius * 2);
        } else {
            ctx1.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx1.fill();
        }

        // Draw laser
        if (shutterActive) {
            ctx1.fillStyle = "green";
            ctx1.fillRect(canvasWidth / 2.02, canvasHeight - 100, 5, canvasHeight - bubble.y - 600); // Adjusted laser position
        }

        // Draw labels
        ctx1.fillStyle = "black";
        ctx1.font = "12px Arial";
       ctx1.fillText("Pneumatic Stage", bubble.x - 125, bubble.y - 21);
        ctx1.fillText("Organic Liquid Precursor", bubble.x - 60, bubble.y + 35);
    }

    function checkAlignment() {
        if (Math.abs(handleX - bubble.x) < 5) {
            shutterButton.style.display = 'block';
        } else {
            shutterButton.style.display = 'none';
        }
    }

    canvas1.addEventListener("mousemove", function (e) {
        if (isMoving) {
            const rect = canvas1.getBoundingClientRect();
            handleX = e.clientX - rect.left;
            bubble.x = handleX;
            drawGame1();
            checkAlignment();
        }
    });

    canvas1.addEventListener("click", function () {
        isMoving = !isMoving;
    });


const graphiticText = document.getElementById("graphiticText");
shutterButton.addEventListener("click", function () {
    shutterActive = true;
    bubbleHit = false; // Ensure bubble starts as white
    drawGame1(); // Show laser immediately

    setTimeout(function () {
        // Check if laser hits the bubble
        const laserX = canvasWidth / 2.02; // Laser's x-position
        const bubbleTop = bubble.y - bubble.radius;
        const bubbleBottom = bubble.y + bubble.radius;
        const bubbleLeft = bubble.x - bubble.radius;
        const bubbleRight = bubble.x + bubble.radius;

        if (laserX >= bubbleLeft && laserX <= bubbleRight) {
            bubbleHit = true; // Change to black square
graphiticText.classList.add("show"); // Ensure class is added
        }

        drawGame1(); // Redraw with black square

        setTimeout(function () {
            shutterActive = false; // Turn off laser
            drawGame1();
        }, 500); // Keep laser on briefly before turning it off

    }, 500); // Short delay before bubble turns black
});



    drawGame1();
    checkAlignment();





    /*** Game 2: Push the Balls ***/
    const canvas2 = document.getElementById("game2");
    const ctx2 = canvas2.getContext("2d");
    const pressureButton = document.getElementById("pressureButton");
    const gaugeBar = document.getElementById("gaugeBar");
    const temperatureButton = document.getElementById("temperatureButton");

    let balls = [];
    for (let i = 0; i < 20; i++) {
        balls.push({
            x: Math.random() * 380 + 10,
            y: Math.random() * 380 + 10,
            radius: 5,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            enteredHole: false,
            colorTransition: 0,
            moveTowardsHole: false, // Track if balls should move towards hole
        });
    }

    let pressure = 0;
    const targetPressure = 100;
    let temperatureRampedUp = false;
    let ballsMovedIntoHole = false;

function drawGame2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    // Draw box with rounded corners
    ctx2.fillStyle = "gray";
    ctx2.beginPath();
    ctx2.roundRect(100, 100, 200, 200, 20); // Rounded corners with radius 10
    ctx2.fill();

    // Draw narrow hole
    if (temperatureRampedUp && ballsMovedIntoHole) {
        const transitionColor = `rgb(${150 * balls[0].colorTransition}, 0, 0)`;
        ctx2.fillStyle = transitionColor;
    } else {
        ctx2.fillStyle = "white";
    }
    ctx2.fillRect(190, 100, 20, 200);

    // Draw balls
    if (!temperatureRampedUp || (temperatureRampedUp && !ballsMovedIntoHole)) {
        ctx2.fillStyle = "red";
        balls.forEach((ball) => {
            ctx2.beginPath();
            ctx2.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx2.fill();
        });
    }
}

    function moveBalls() {
        balls.forEach((ball) => {
            // Apply random vibration
            ball.vx += (Math.random() - 0.5) * 0.5;
            ball.vy += (Math.random() - 0.5) * 0.5;

            // Apply friction
            ball.vx *= 0.98;
            ball.vy *= 0.98;

            // Move the ball
            ball.x += ball.vx;
            ball.y += ball.vy;

            // Keep balls inside the canvas
            if (ball.x < ball.radius) {
                ball.x = ball.radius;
                ball.vx *= -1;
            }
            if (ball.x > canvas2.width - ball.radius) {
                ball.x = canvas2.width - ball.radius;
                ball.vx *= -1;
            }
            if (ball.y < ball.radius) {
                ball.y = ball.radius;
                ball.vy *= -1;
            }
            if (ball.y > canvas2.height - ball.radius) {
                ball.y = canvas2.height - ball.radius;
                ball.vy *= -1;
            }

            // Force ball entry or move towards hole
            if (pressure >= targetPressure) {
                if (ball.x > 190 && ball.x < 210 && ball.y > 100 && ball.y < 300) {
                    if (temperatureRampedUp && !ballsMovedIntoHole) {
                        ball.moveTowardsHole = true;
                    }
                    if (ball.moveTowardsHole) {
                        ball.vx = (200 - ball.x) * 0.1;
                        ball.vy = (200 - ball.y) * 0.1;
                    } else if (!ball.enteredHole) {
                        ball.vx = 0;
                        ball.vy = 0;
                        ball.enteredHole = true;
                    }
                }
            }
        });

        drawGame2();
        requestAnimationFrame(moveBalls);
    }

    pressureButton.addEventListener("click", function () {
        pressure += 20;
        gaugeBar.style.height = `${pressure}%`; // Height increases from the bottom

        if (pressure >= targetPressure) {
            pressureButton.disabled = true;
            temperatureButton.style.display = "block";
        }
    });

    temperatureButton.addEventListener("click", function () {
        temperatureRampedUp = true;
        temperatureButton.disabled = true;
        animateBallsIntoHole(); // Start the ball movement
    });

    function animateBallsIntoHole() {
        let allBallsMoved = true;
        balls.forEach((ball) => {
            if (ball.moveTowardsHole && (Math.abs(ball.x - 200) > 1 || Math.abs(ball.y - 200) > 1)) {
                allBallsMoved = false;
            }
        });

        if (allBallsMoved) {
            ballsMovedIntoHole = true;
            startColorTransition();
        } else {
            requestAnimationFrame(animateBallsIntoHole);
        }
    }

function startColorTransition() {
    let transitionStep = 0;
    const totalSteps = 200;

// Ensure the text is hidden at the start
    document.getElementById("hpcvdText").style.display = "none";

    function animateTransition() {
        balls.forEach((ball) => {
            ball.colorTransition = transitionStep / totalSteps;
        });
        drawGame2();

        if (transitionStep < totalSteps) {
            transitionStep++;
            requestAnimationFrame(animateTransition);
        } else {
            // Transition complete, show hpcvdtext
            document.getElementById("hpcvdText").style.display = "block";
        }
    }

    animateTransition();
}



    drawGame2();
    moveBalls();
});