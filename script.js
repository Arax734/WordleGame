const solution = "hacks";
let lives = 5;

const letters = [
    document.querySelector("#letter0"),
    document.querySelector("#letter1"),
    document.querySelector("#letter2"),
    document.querySelector("#letter3"),
    document.querySelector("#letter4")
];

function resolver(guess, solution) {
    let answer = "";
    let found = false;
    let corrected_g = [false, false, false, false, false];
    let corrected_letters = 0;

    for (let a = 0; a < 5; a++) {
        if (guess[a] == solution[a]) {
            answer += "g";
            letters[a].style.background = "green";
            corrected_g[a] = true;
            corrected_letters++;
        } else {
            answer += "x";
        }
    }
    lives_number = document.querySelector("#lives-number");
    if (corrected_letters == 5) {
        lives_number.style.color = "green";
        document.body.onkeyup = null;
        for (let x = 0; x < 5; x++) {
            letters[x].setAttribute("readonly", "readonly");
        }
        return;
    }
    else {
        lives--;
        lives_number.innerHTML = lives;
        if (lives <= 0) {
            document.body.onkeyup = null;
            lives_number.style.color = "red";
            for (let x = 0; x < 5; x++) {
                letters[x].setAttribute("readonly", "readonly");
            }
        }
    }

    for (let x = 0; x < 5; x++) {
        if (answer[x] == 'g') {
            continue;
        }
        for (let y = 0; y < 5; y++) {
            if (guess[x] == solution[y] && y != x && corrected_g[y] != true) {
                answer = answer.substring(0, x) + "y" + answer.substring(x + 1);
                found = true;
                corrected_g[y] = true;
                letters[x].style.background = "yellow";
                break;
            }
        }
        if (found == false) {
            answer = answer.substring(0, x) + "b" + answer.substring(x + 1);
        }
        found = false;
    }
}

function handleKeyPress(event) {
    // enter button
    if (event.keyCode === 13) {
        let guess = "";
        for (let x = 0; x < 5; x++) {
            guess += letters[x].value;
            letters[x].style.background = "gray";
        }
        resolver(guess, solution);
    }
    // left arrow button
    if (event.keyCode === 37) {
        const currInput = document.activeElement;
        const currInputIndex = letters.indexOf(currInput);
        let previousinputIndex = (currInputIndex - 1);
        if (previousinputIndex < 0) {
            previousinputIndex = 4;
        }
        const input = letters[previousinputIndex];
        input.focus();
    }
    // right arrow button
    if (event.keyCode === 39) {
        const currInput = document.activeElement;
        const currInputIndex = letters.indexOf(currInput);
        const nextinputIndex = (currInputIndex + 1) % letters.length;
        const input = letters[nextinputIndex];
        input.focus();
    }
}

