//array of different texts, randomly generate every time page loads or click start over
//high score board
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const newTextButton = document.querySelector("#new-text");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const textArray = ["The quick brown fox jumped over the lazy dog. I went to the store yesterday and bought some groceries. His tennis match dragged on for several hours. Type as fast as you can! Don't stop now, you're doing great. My favorite pizza place doesn't sell any pizza. Paper towels can clean up the mess you made. Although reciting her molecular biology textbook is her favorite pasttime, she often dabbles in multivariable calculus competitions as well.",
"You were Romeo and I was Juliet, but our paths never crossed. Sometimes, all you need to do is just type away your feelings. She decided she wouldn't cheat, but it was the hardest decision of her life. Don't step on broken glass, you may get a bruise. Wow, what are you doing with your life? This is a good environment for learning English. I was too sick to stay inside today, so I left.","If the Easter Bunny and the Tooth Fairy had babies would they take your teeth and leave chocolate for you? The river stole the gods. The stranger officiates the meal. I am counting my calories, yet I really want dessert. She works two jobs to make ends meet; at least, that was her reason for not having time to join us. A song can ruin a person’s day if they let it get to them.",
"She folded her handkerchief neatly. She always speaks to him in a loud voice. She only paints with bold colors; she does not like pastels. Writing a list of random sentences is harder than I initially thought it would be. Abstraction is often one floor above you. Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn’t and they don’t recommend anyone else do it either.",
"He was a lovely sight. She wrote him a long letter, but he didn't read it. I want to buy a onesie, but know it won’t suit me. Cats are good pets, for they are clean and are not noisy. The memory we used to share is no longer coherent. What was the person thinking when they discovered cow’s milk was fine for human consumption, and why did they do it in the first place?"]

var originText;
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;

// Generate random origin text
function generateText() {
    reset();
    var rand = Math.floor(Math.random() * 5);
    document.querySelector("#origin-text p").innerHTML = textArray[rand];
    originText = document.querySelector("#origin-text p").innerHTML;
    
}


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currTime;
    timer[3]++;
    timer[0] = Math.floor(timer[3]/100/60); // min
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60)); // sec
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); // ms
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    if (textEntered == originText) {
        testWrapper.style.borderColor = "green";
        clearInterval(interval);
        let speed = Math.round(75 / (timer[0] + (timer[1] / 60) + (timer[2] / 6000)));
        document.querySelector("#wpm").innerHTML = "<b>Your typing speed is " + speed + " words per minute.</b>";
    } else if (textEntered == originTextMatch) {
        testWrapper.style.borderColor = "blue";
    } else {
        testWrapper.style.borderColor = "red";
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0,];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    document.querySelector("#wpm").innerHTML = "";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
newTextButton.addEventListener("click", generateText, false);
resetButton.addEventListener("click", reset, false);
window.onload = generateText;