var str = "a I cant believe it already a year together Time goes so fast when I am with you This year has been only amazing, all because of you I am so happy waking up knowing I have you every day the cutest most beautiful girl in the world"
var words = str.split(" ");

var start = false;
var startSpeedrun = false;

var right = 0;
var wrong = 0;

var speedrunTime = 60; //in seconds
var timeElapsed = 0;
var myTimer;

function tick(){
	var minutes;

    if(start){
    	timeElapsed++;
    	var minutes = timeElapsed/60;
    }

    else if(startSpeedrun){
    	timeElapsed--;
    	var minutes = (speedrunTime-timeElapsed)/60;
    	if(timeElapsed==0){
    		stoptimer();
    		alert("Time's up!\nCorrect: "+right+"\nIncorrect: "+wrong+"\nAccuracy: "+ (right+wrong==0?"0.00":(right/(right+wrong)).toFixed(4)*100)+"%\nWords per Minute: "+(right/minutes).toFixed());
    	}
    }
    
    document.getElementById("time").innerHTML = Math.floor(timeElapsed/60) +':' +("0" + (timeElapsed%60)).slice(-2);
    document.getElementById("wpm").innerHTML = (right/minutes).toFixed() +" WPM";
}

function starttimer(){
    //call the first setInterval
    myTimer = setInterval(tick, 1000);
}

function stoptimer(){
    clearInterval(myTimer);
    start = false;
    startSpeedrun = false;
    timeElapsed = 0;
}

var currentword = "start";
var index = 1;
var nextword = words[index];

function beginPractice() {
	console.log("start");
	start = true;
	begin();
}
/*window.onload=function(){
  const box = document.getElementById('inputbox');
	box.addEventListener('input', checktext);
}
*/

function beginSpeedrun(){
	console.log("Start speedrun");
	timeElapsed =speedrunTime;
	startSpeedrun = true;
	begin();
	
	document.getElementById("time").innerHTML = Math.floor(speedrunTime/60) +':' +("0" + (speedrunTime%60)).slice(-2);
}

function begin(){

	for(var i=0; i<length-2; i++){ //clears the list of completed words
		document.getElementById("wordlog").removeChild(document.getElementById("wordlog").lastChild);
	}

	document.getElementById('backButton').style.display = "inline";
	document.getElementById('startPracticeButton').style.display = "none";
	document.getElementById('startSpeedrunButton').style.display = "none";
	document.getElementById('inputbox').value = "";
	starttimer();
	document.getElementById("inputbox").focus();
	document.getElementById("nextword").innerHTML = nextword;
}

function checktext(){
	if(start || startSpeedrun){
		console.log("update");
		const textbox = document.getElementById('inputbox');

		console.log(textbox.value);
		if (textbox.value == currentword) {
			console.log("correct");
			right++;
			correctadd();
			newword();
			textbox.style.color = "black";
			textbox.value = "";
			
		}
		else{
			wrong++;
			incorrectadd();
			textbox.style.color = "red";
			
		}
	}
	else{
		alert("please click start");
	}
	
}

function newword(){
	if(index == words.length){
		alert("hehe thanks for completing your daily typing practice");
		window.location.href = "anne/puzzle.html";
	}
	currentword = nextword;
	index++;
	nextword = words[index];
	console.log(currentword);
	document.getElementById("word").innerHTML = currentword;
	document.getElementById("nextword").innerHTML = nextword;
}

function correctadd(){
	document.getElementById("correct").innerHTML = right + ' correct';

	add = document.createElement('div');
	add.innerHTML = currentword;
	add.classList.add("loggedwordcorrect"); 
	document.getElementById("wordlog").appendChild(add);
}

function incorrectadd(){
	document.getElementById("incorrect").innerHTML = wrong + ' incorrect';

	add = document.createElement('div');
	add.innerHTML = currentword;
	add.classList.add("loggedwordincorrect"); 
	document.getElementById("wordlog").appendChild(add);
}

function backButton(){
	stoptimer();
	var length = document.getElementById("wordlog").children.length;
	
	document.getElementById('startPracticeButton').style.display = "inline";
	document.getElementById('startSpeedrunButton').style.display = "inline";
	document.getElementById('backButton').style.display = "none";
	document.getElementById('inputbox').value = "";
	document.getElementById("time").innerHTML = '0:00';
	document.getElementById("word").innerHTML = "start";
	document.getElementById("wpm").innerHTML = "0 WPM";
	document.getElementById("incorrect").innerHTML = '0 incorrect';
	document.getElementById("correct").innerHTML = '0 correct';
	currentword = "start";
	right = 0;
	wrong = 0;
}