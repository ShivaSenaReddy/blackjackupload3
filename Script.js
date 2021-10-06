yourbox = document.querySelector(".your-box");
botbox = document.querySelector(".bot-box");

blackjackdb = {
    "cards": { 1: "A", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "J", 12: "Q", 13: "K" },
    "cardValue": { 'A': [1, 11], "2": 2, "3": 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, "J": 10, 'Q': 10, 'K': 10 },
    "your-score": 0,
    "bot-score": 0,
    "botspan": document.querySelector("#botscore"), 
    "yourspan": document.querySelector("#yourscore"),
    "wins": parseInt(localStorage.getItem("wins")),
    "losses": parseInt(localStorage.getItem("losses")),
    "draws": parseInt(localStorage.getItem("draws")),
    "isStand": false,
    "isDeal": false,
    }
document.querySelector(".youplay").addEventListener("click", yourfunction);
document.querySelector(".botplay").addEventListener("click", botfunction);
document.querySelector(".deal").addEventListener("click", dealfunction);
function yourfunction() {
    if (blackjackdb['your-score']<=21)
        pickACard(yourbox);
    blackjackdb["isStand"] = true;
}
function botfunction() {
    if (blackjackdb["isStand"]) {
        if (blackjackdb['bot-score'] <= 21) {
            while ((blackjackdb["bot-score"]) < 15) {
                pickACard(botbox);

            }
        }
        showWinner();
    }
    blackjackdb["isDeal"] = true;
    
}
yourscore = document.querySelector("#yourscore");
function pickACard(ActiveElement) {
    let img = document.createElement("img");
    let card = randomCardNumberGenerator();
    console.log("card value:" + card);
    //checkifcardisA(ActiveElement);
    if (card == "A") {
        checkIfCardIsA(ActiveElement,card);
    }
    console.log(blackjackdb['cardValue'][card]);
    
   // checkifcardisA(ActiveElement);
    if (ActiveElement == yourbox) {
        updateScore('your-score', blackjackdb['cardValue'][card],
            blackjackdb["yourspan"]
        );
    }
    else {
        updateScore('bot-score', blackjackdb['cardValue'][card],
            blackjackdb["botspan"]);

    }
    img.src = `blackjack_assets/images/${card}.png`;
    ActiveElement.appendChild(img);

    console.log("hi");
}

function updateScore(scorefor, cardvalue, span) {
    console.log(scorefor);
    blackjackdb[scorefor] += cardvalue;
    if (blackjackdb[scorefor] > 21) {
        span.textContent = "Busted";
    }
    else {
        span.textContent = blackjackdb[scorefor];
    }
}
function  randomCardNumberGenerator() {
    let index = Math.floor(Math.random() * 13 + 1);
    return  blackjackdb["cards"][index];
    
}

function checkIfCardIsA(Element,card) {
    if (Element == yourbox) {
        if (blackjackdb["your-score"] + 10 < 21)
            blackjackdb['cardValue'][card] = 10;
        else
            blackjackdb['cardValue'][card] = 1;
    }
    else {
        if (blackjackdb["bot-score"] + 10 < 21)
            blackjackdb['cardValue'][card] = 10;
        else
            blackjackdb['cardValue'][card] = 1;
    }

}

function dealfunction() {
    if (blackjackdb["isDeal"]) {
        blackjackdb["your-score"] = 0;
        blackjackdb["bot-score"] = 0;
        blackjackdb['botspan'].textContent = 0;
        blackjackdb['yourspan'].textContent = 0;
        images = yourbox.querySelectorAll('img');
        for (i = 0; i <= images.length - 1; i++) {
            images[i].remove();
        };
        images = botbox.querySelectorAll('img');
        for (i = 0; i <= images.length - 1; i++) {
            images[i].remove();
        };
        document.querySelector("#result").textContent = "Let's Play"
        document.querySelector("#result").style.color = "gold";
        blackjackdb["isStand"] = false;
        blackjackdb["isDeal"] = false;
    }
}

function showWinner() {
    result = document.querySelector("#result");
    let y_Score = blackjackdb["your-score"];
    let b_Score = blackjackdb["bot-score"];
    if (blackjackdb["isStand"])
    if (y_Score <= 21) {
        if ((y_Score > b_Score) || (b_Score > 21)) {
            console.log("you won");
            result.textContent = "you won";
            blackjackdb["wins"] += 1;
        }
        else if (b_Score > y_Score) {
            console.log("you lost");
            result.textContent = "you lost";
            blackjackdb["losses"] += 1;
        }
        else if (b_Score == y_Score) {
            console.log("tie");
            result.textContent = "Tie";
            blackjackdb["draws"] += 1;
        }
    }
    else if (y_Score > 21) {
        if (b_Score <= 21) {
            console.log("lost");
            result.textContent = "you lost";
            blackjackdb["losses"] += 1;
        }
        else if (b_Score > 21) {
            result.textContent = "Tie";
            blackjackdb["draws"] += 1;
        }
    }
    if (result.textContent == "you lost") {
        result.style.color = "red";
        localStorage.setItem("losses", blackjackdb["losses"]);
        document.getElementById("losses").textContent = localStorage.getItem("losses");
    }
    else if (result.textContent == "Tie") {
        result.style.color = "yellow";
        localStorage.setItem("draws", blackjackdb["draws"]);
        document.getElementById("draws").textContent = localStorage.getItem("draws")
    }
    else {
        result.style.color = "magenta"
        localStorage.setItem("wins", blackjackdb["wins"]);
        document.getElementById("wins").textContent = blackjackdb["wins"];

    }

}

function resetScore() {
    console.log("hi");
    blackjackdb["isStand"] = false;
    localStorage.setItem("wins", 0);
    localStorage.setItem("draws", 0);
    localStorage.setItem("losses", 0);
    blackjackdb["wins"] = 0;
    blackjackdb["losses"] = 0;
    blackjackdb["draws"] = 0;
    document.getElementById("losses").textContent = localStorage.getItem("losses");
    document.getElementById("wins").textContent = localStorage.getItem("wins");
    document.getElementById("draws").textContent = localStorage.getItem("draws");

    document.querySelector("#result").textContent = "Lets Play";
    document.querySelector("#result").style.color = "gold";
    dealfunction();
   
}

function showscore() {
    document.getElementById("losses").textContent = localStorage.getItem("losses");
    document.getElementById("wins").textContent = localStorage.getItem("wins");
    document.getElementById("draws").textContent = localStorage.getItem("draws")
}

showscore();