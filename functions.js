/* 
 * Yahtzee in javascript/jQuery
 * Made by Mathias De Gucht
 * december 2011
 */

/*
 * global variabels
 */
var dices = new Array(0,0,0,0,0);
var hold = new Array(0,0,0,0,0);
var scoreArray = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1);
var largeStraightArray = new Array(new Array(2,3,4,5,6),new Array(1,2,3,4,5));
var turn = 1;
var timesThrown = 0;
var scoreLock = true;
var yahtzeeBonus = 0;
var subtotal = new Array(0,0);
var total = 0;


/*
 * Start declaration of all the functions
 */
function throwDices(){
    for (i=0;i<5;i++) {
        var j = i+1;
        if(hold[i]==0){
            dices[i] = Math.floor(Math.random()*6)+1;
            var xWaarde = new Array(0,-45,-90,-135,-180,-225);
            $("#dice"+j+" .diceImgHolder").css("background-position",xWaarde[dices[i]-1]+"px 0px").slideUp(100).slideDown(100);        
        }
    }
}
function setHold(dsNummer){
    knop = $("#hold"+dsNummer);
    value = knop.html();
    i = parseInt(dsNummer)-1;
    if(hold[i]===0){
        hold[i]=1;
        $("#dice"+dsNummer).css("background-color","#341");
        knop.html("Lossen");
    } else{
        hold[i]=0;
        $("#dice"+dsNummer).css("background-color","#ddd");
        knop.html("Houden");
    }
}
function removeHoldColors(){
	for(i=1;i<6;i++){
            $("#hold"+i).html("Houden");
	}
    $(".dice").css("background","#ddd");
}
function setScore(veld, score){
	$("#"+veld).html(score);
}
function checkScore(eyes){
	var score=0;
		
	for(i=0;i<6;i++){
		if(dices[i]==eyes)
			score+=eyes;
	}
	return score;
}
function sortNumber(a,b){
	return a-b;
}

function checkXOfAKind(x){
	var same = 1;
	dices.sort(sortNumber);
	var last = dices[0];
	
	for(i=1; i<5; i++){
		if(same==x)
			break;
		if(last===dices[i])
			same++;
		else
			same=1;
			
		last = dices[i];
	}
	
	return same;
}
function threeOfAKind(){
	var score=0;
	var same = checkXOfAKind(3);
	
	if(same>=3)
		score=chance();
		
	return score;
}
function fourOfAKind(){
	var score=0;
	var same = checkXOfAKind(4);
	
	if(same>=4)
		score=chance();
		
	return score;
}
function fullHouse(){
	var score=0;
	dices.sort(sortNumber);
	var count = 1;
	var found3 = false, found2 = false;
	for (i=1; i < 5;i++)
	{
		if (dices[i] == dices[i-1]) 
			count++;
		else
		{
			if (count == 3)
				found3 = true;
			else if (count == 2)
				found2 = true;
			count=1;
		}
	}
	if (count == 3)
		found3 = true;
	else if (count == 2)
		found2 = true;
	if (found3 && found2)
		score=25;
	
	return score;
}
function smallStraight(){
	var score=0;
	var same = false;
	dices.sort(sortNumber);
	
	var curSeqLen=1;
    var lastDie=dices[0];
 	
    // if the lowest number is a 4, or the highest number is a 3, it cannot be small straight
    if (dices[0] >= 4 || dices[4] <= 3)
    	same = false;
 
    for (i = 1; i < 5; i++) {
        // the current die is one greater than the last one, the numbers are in sequence
        if (dices[i] == lastDie+1){
            curSeqLen++;
        }
        else if (dices[i] == lastDie){}
        // the consecutive dice are not in order, still might be a straight in there
        else{
            curSeqLen=1;
        }
        
        if (curSeqLen >=4)
        	same = true;
        	
        lastDie = dices[i];
    }

	if(same)
		score=30;
	
	return score;
}
function largeStraight(){
	var score=0;
	dices.sort(sortNumber);
	
	var same = false;
	var hetzelfde2 = false;
	
	for(i=0;i<5;i++){
		if(largeStraightArray[0][i]==dices[i]){
			same = true;
		}
		else {
			same = false;
			break;
		}
	}
	for(i=0;i<5;i++){
		if(largeStraightArray[1][i]==dices[i]){
			hetzelfde2 = true;
		}
		else {
			hetzelfde2 = false;
			break;
		}
	}
	if(same || hetzelfde2)
		score=40;
	
	return score;
}
//check whole dicesArray against it's first element, every element has to be the same
function checkYahtzee(){
	for(i=0;i<5;i++){
		if(dices[0]===dices[i])
			same = true;
		else {
			same = false;
			break;
		}
	}
	if(same)
		return true;
	else
		return false;
}
function chance(){
	var score=0;
	dices.forEach(function(x){score+=x;});
	
	return score;
}
function getSubtotal(id){
	var score = 0;
	var halt = 6;
	if(id===1){
		id=6;
		halt=13;
	}
	for(i=id;i<halt;i++){
		(scoreArray[i]===-1)? plusScore = 0 : plusScore = scoreArray[i];
		score += plusScore;
	}
	
	return score;
}
function getTotal(){
	return subtotal[0]+subtotal[1]+yahtzeeBonus;
}