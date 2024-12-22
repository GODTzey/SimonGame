var spielLauft = false;

var arrSpielergedrueckt = [];
var arrRichtige = [];
var level = 0;

$(document).keypress(function () {
    if (!spielLauft) {
        startGame();
    }
});

$(".btn").click(function (event) {
    var buttonGedrueckt = $(event.target).attr("id");
    arrSpielergedrueckt.push(FarbeInZahl(buttonGedrueckt));
    buttonDruecken(buttonGedrueckt);

    // Überprüfen, ob die Eingabe korrekt ist
    ueberpruefeEingabe();
});

function startGame() {
    spielLauft = true;
    level = 0;
    arrSpielergedrueckt = [];
    arrRichtige = [];
    $("h1").text("Level " + level);
    naechsteSequenz();
}

function naechsteSequenz() {
    arrSpielergedrueckt = [];
    level++;
    $("h1").text("Level " + level);
    
    var zufallsZahl = Math.floor(Math.random() * 4) + 1;
    arrRichtige.push(zufallsZahl);

    // Zeige nur das neue Element
    var farbe = ZahlInFarbe(zufallsZahl);
    buttonDruecken(farbe);
}

function ueberpruefeEingabe() {
    // Überprüfe die gesamte Eingabe nach jeder Aktion
    for (let i = 0; i < arrSpielergedrueckt.length; i++) {
        if (arrSpielergedrueckt[i] !== arrRichtige[i]) {
            spielBeenden();
            return;
        }
    }

    // Wenn die gesamte Eingabe korrekt ist, zur nächsten Sequenz
    if (arrSpielergedrueckt.length === arrRichtige.length) {
        setTimeout(naechsteSequenz, 1000);
    }
}

function spielBeenden() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 400);
    spielLauft = false;
}

function ZahlInFarbe(zahl) {
    var farbe = "";
    switch (zahl) {
        case 1:
            farbe = "green";
            break;
        case 2:
            farbe = "red";
            break;
        case 3:
            farbe = "yellow";
            break;
        case 4:
            farbe = "blue";
            break;
    }
    return farbe;
}

function FarbeInZahl(farbe) {
    var zahl = 0;
    switch (farbe) {
        case "green":
            zahl = 1;
            break;
        case "red":
            zahl = 2;
            break;
        case "yellow":
            zahl = 3;
            break;
        case "blue":
            zahl = 4;
            break;
    }
    return zahl;
}

function buttonDruecken(farbe) {
    $("#" + farbe).addClass("pressed");
    setTimeout(function () {
        $("#" + farbe).removeClass("pressed");
    }, 100);
}