let questionslist = {};
let trivia = {};

let questions;
let answers = ["B", "D", "A", "B", "D", "A", "B", "D"];

let intervalID;


timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        /*console.log("countdown");*/
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        /*console.log(currentTime);*/
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            /*$(".question-block").hide();*/
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
        /*console.log("Reset");*/
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};



function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "What color is Mario's hat?",
            A: "Blue",
            B: "Red",
            C: "Green",
            D: "Yellow",
        },
        q1: {
            question: "Who is Link's Nemesis?",
            A: "Tree gnomes",
            B: "Hyrule citizen",
            C: "Zelda",
            D: "Ganondorf",
        },
        q2: {
            question: "What game is not for XBOX One?",
            A: "Spider-Man",
            B: "Call-Of-Duty",
            C: "Lego Batman",
            D: "NBA 2K",
        },
        q3: {
            question: "What game console isnt real?",
            A: "XBOX",
            B: "QuadStar",
            C: "PlayStation",
            D: "SEGA Dreamcast",
        },
        q4: {
            question: "Who is a Hedgehog?",
            A: "Dr. Eggman",
            B: "Trunks",
            C: "Tails",
            D: "Sonic",
        },
        q5: {
            question: "Who is Luke's Father",
            A: "Anakin Skywalker(Darth Vadar)",
            B: "Obi-Wan Kenobi",
            C: "Jaba",
            D: "Darth Maul",
        },
        q6: {
            question: "Hardest Mario Kart Track?",
            A: "Shy Guy Beach",
            B: "Rainbow Road",
            C: "Donut Plains 3 ",
            D: "Wario's Gold Mine",
        },
        q7: {
            question: "What Character is Pink",
            A: "Falco",
            B: "Ice Climbers",
            C: "Captain Falcon",
            D: "Kirby",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    /*console.log($("input:radio[name='q0']:checked").val());*/
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time =======================================================================================================

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});