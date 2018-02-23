var questionArray = [
		question1 = {
			question : "What Olympics did the most UC Davis athletes compete in?",
			correct : "London, 2012",
			answerArray : ["London, 2012", "Los Angeles, 1984", "Pyeoncheng, 2018", "Sydney, 2000"],
			pubImage : "<img src='images/deveres.jpg' alt='Devere's, Davis'>",
			answerImage : "<img src='images/KingEddies.jpg' alt='King Eddies, Stratford, London'>",
		},

		question2 = {
			question : "What country has the most Winter Olympic medals?",
			correct : "Norway",
			answerArray : ["USA", "Norway", "Sweden", "Russia", "Germany", "Canada"],
			pubImage : "<img src='images/hairyLemon.jpg' alt='Hairy Lemon Pub, Dublin, Ireland'>",
			answerImage : "<img src='images/Oslo_Mikrobryggeri.jpg' alt='Oslo Mikrobryggeri, Oslo, Norway'>",
		},

		question3 = {
			question : "Ireland has 16 Olympic medals in what sport?",
			correct : "Boxing",
			answerArray : ["Boxing", "Swiming", "Hammer Throw", "Sking", "Sailing"],
			pubImage : "<img src='images/kytelersInn.jpg' alt='Kyteler's Inn, Kilkenny, Ireland>",
			answerImage : "<img src='images/kateKerneys.jpg' alt='Kate Kerney's Cottage, Gap of Duloe, Ireland>",
		},

		question4 = {
			question : "All the Scotish athletes at the Sochi games compeated in what sport?",
			correct : "Curling",
			answerArray : ["Curling", "Biatholon", "Ski Cross", "Hockey", "Figure Skateing"],
			pubImage : "<img src='images/worldsEnd.jpg' alt='The World's End, Edinburgh>",
			answerImage : "<img src='images/sparklehorse.jpg' alt='The Sparkle Horse, Glasgow'>",
		},

		question5 = {
			question : "What country is compeating in Bobsled for the first time this year?",
			correct : "Nigeria",
			answerArray : ["Nigeria", "Cuba", "South Africa", "Mexico", "Argentina", "Bolivia"],
			pubImage : "<img src='images/mcelroy.jpg' alt='Shay McElroy's Pub, Huston, Texas>",
			answerImage : "<img src='images/yellowChilli.jpg' alt='The Yellow Chilli, Lagos, Nigeria'>",
		},

		// question6 = {
		// 	question : "",
		// 	correct : "",
		// 	answerArray : "",
		// 	pubImage : "<img src='' alt=''>",
		// 	answerImage : "<img src='' alt=''>",
		// },

		// question7 = {
		// 	question : "",
		// 	correct : "",
		// 	answerArray : "",
		// 	pubImage : "<img src='' alt=''>",
		// 	answerImage : "<img src='' alt=''>",
		// },

		// question8 = {
		// 	question : "",
		// 	correct : "",
		// 	answerArray : "",
		// 	pubImage : "<img src='' alt=''>",
		// 	answerImage : "<img src='' alt=''>",
		// },

		// question9 = {
		// 	question : "",
		// 	correct : "",
		// 	answerArray : "",
		// 	pubImage : "<img src='' alt=''>",
		// 	answerImage : "<img src='' alt=''>",
		// },

		// question10 = {
		// 	question : "",
		// 	correct : "",
		// 	answerArray : "",
		// 	pubImage : "<img src='' alt=''>",
		// 	answerImage : "<img src='' alt=''>",
		// }
	];
var i = 0;
var myTimer;
var currentQuestion;
var questions = 0;
var questionsRight = 0;
var questionsWrong = 0;
var questionsUnanswered = 0;
var right = "";

function shuffle (array) {
  var a = 0;
  var j = 0;
  var temp = null;

  for (a = array.length - 1; a > 0; a -= 1) {
    j = Math.floor(Math.random() * (a + 1));
    temp = array[a];
    array[a] = array[j];
    array[j] = temp;
  }
}

shuffle(questionArray);
console.log(questionArray);


$("#startButton").on("click", function(){
	console.log("startButton clicked");
	$("#startButton").attr("style", "display:none;");
	//get object
	getQuestion();
});

//get object
function getQuestion() {
	console.log("getQuestion");

	if (questions === questionArray.length){
		gameOver();
	}
	else {
	currentQuestion = questionArray[i];
	console.log(currentQuestion);
	questions++;
	printQuestion(currentQuestion);
	}
}


//put prts in divs 
function printQuestion() {
	console.log("printQuestion");
	$("#questionArea").append("<p>" + currentQuestion.question + "</p>");
	$("#pictureArea").html(currentQuestion.pubImage);
	shuffle(currentQuestion.answerArray);

	for (var j = 0; j < currentQuestion.answerArray.length; j++) {
		$("#answerArea").append("<p class='answers'>" + currentQuestion.answerArray[j] + "</p>");
	}

	//timer
	startTimer();
}

//timer

function startTimer() {
	var t = 30;
	myTimer = setInterval(function(){
		t--;
		displayTime(t);
		
		if (t <= 0){
		console.log("times up");
		questionsUnanswered++;
		clearInterval(myTimer);
		var right = "time";
		displayAnswer();
		}
	},1000);
}

function displayTime(count) {
	console.log("displayTime triggered " + count);
	$("#countdownArea").html(count + " seconds left!");
}

function displayAnswer () {
	i++;
	$("#countdownArea").empty();
	$("#answerArea").empty();
	$("#pictureArea").html(currentQuestion.answerImage);

	if (right == "time") {
		$("#questionArea").html("<p>Out of time! The correct answer was " + currentQuestion.correct + "</p>");
	}
	else if (right == "right") {
		$("#questionArea").html("<p>That's right!</p>");
	}
	else if (right == "wrong"){
		questionsWrong++;
		$("#questionArea").html("<p>Nope. Sorry, the correct answer is " + currentQuestion.correct + "</p>");
	}

	displayAnswer();

	setTimeout(function() {
		$("#questionArea").empty();
		getQuestion();
		}, 3000);
}

$(document).on("click", ".answers", function(){
	console.log("answer clicked");

	var answerPicked = $(this).text();
	console.log(answerPicked);

	clearInterval(myTimer);

	console.log(answerPicked);
	console.log(currentQuestion.correct);
	
	if (answerPicked.toString() == currentQuestion.correct) {
		questionsRight++;
		right="right";
	}
	else {
		questionsWrong++;
		right = "wrong";
	}
});

function gameOver(){
	$("#countdownArea").empty();
	$("answerArea").empty();
	shuffle(questionArray);
	i=0;
	questions=0;
	$("#startButton").html("Restart?");
	$("#startButton").attr("style", "display:block;");

	$("#answerArea").html("<h2>Score</h2> <p>Correct Answers: " + questionsRight + "</p> <p>Incorect Answers: " + questionsWrong + "</p> <p>Unanswerd Questions: " + questionsUnanswered + "</p>");
}

