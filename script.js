var block = document.getElementById("block");
var hole = document.getElementById("hole");
var score = document.getElementById("score");
var start = document.getElementById("start");
var restart = document.getElementById("restart");
var modal = document.getElementById("modal");
var root = document.querySelector(":root");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

// random top function for block hole
hole.addEventListener("animationiteration", () => {
    var random = Math.random() * 300 + 150;
    hole.style.top = random + "px";
    counter++;
});

// game interval
setInterval(() => {
    var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (
        jumping == 0 &&
        parseInt(window.getComputedStyle(character).getPropertyValue("left")) ==
        50
    ) {
        character.style.top = characterTop + 3 + "px";
    }
    var blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
    );
    var holeTop = parseInt(
        window.getComputedStyle(hole).getPropertyValue("top")
    );
    if (
        characterTop > 535 ||
        (blockLeft < 125 &&
            blockLeft > -50 &&
            (characterTop < holeTop || characterTop > holeTop + 85))
    ) {
        gameOver();
    }
    score.innerHTML = counter;
}, 10);


// character jump function
function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function() {
        var characterTop = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = characterTop - 5 + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

// game starts
function startGame() {
    modal.style.display = "none";
    character.style.animation = "showchr 0.7s forwards linear";
    block.style.animation = "block 3s infinite linear";
    hole.style.animation = "block 3s infinite linear";
}

// game over
function gameOver() {
    character.style.top = 540 + "px";
    modal.style.display = "block";
    start.style.display = "none";
    restart.style.display = "block";
    block.style.animationPlayState = "paused";
    hole.style.animationPlayState = "paused";
}