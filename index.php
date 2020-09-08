<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
    <title>MathiasDeGucht.be &bull; Projecten &bull; Games &bull; Yahtzee</title>
    <link rel="icon" href="favicon.gif" type="image/gif" />
    <link href="stijl.css" rel="stylesheet" type="text/css" />
    <script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
    <script src="../Frameworks/jquery/1.5.1.min.js" type="text/javascript"></script>
    <script src="functions.js" type="text/javascript"></script>
    <script src="yahtzee.js" type="text/javascript"></script>
</head>

<body>
	
	<div id="preload"><img src="img/dobbelsteen.png" alt="dobbelsteenSprite" /></div>
    
    <div id="topscores">
    	<h3>Topscores</h3>
        <div id="loadingGif"><img src="img/laden.gif" alt="laden..." /></div>
        <div id="topscoresText">
            <?php
            	include("score.php");
            ?>
            <form id="addTopscoreForm">
                <input id="addTopscoreFormNaam" type="text" placeholder="Uw naam" name="naam" required="required" /><br />
                <input class="button gray medium" id="addTopscoreFormSubmit" type="submit" name="submit" value="Verzend" />
            </form>
            <a href="#" id="laatAlleScoresZien">Alle scores</a>
            <div id="loadingGif2"><img src="img/laden.gif" alt="laden..." /></div>
        </div>
    </div>

    <div id="dobbelStenenDiv">
        <div>
            <a class="button gray rechts" href="index.php">Begin opnieuw</a>
        </div>
        <div>
            <button class="button gray" id="throwButton">Gooien</button>
        </div>
        <div class="dice" id="dice1">
            <button disabled="disabled" class="holdButton" id="hold1">Houden</button>
            <span class="diceImgHolder"></span>
        </div>
        <div class="dice" id="dice2">
            <button disabled="disabled" class="holdButton" id="hold2">Houden</button>
            <span class="diceImgHolder"></span>
        </div>
        <div class="dice" id="dice3">
            <button disabled="disabled" class="holdButton" id="hold3">Houden</button>
            <span class="diceImgHolder"></span>
        </div>
        <div class="dice" id="dice4">
            <button disabled="disabled" class="holdButton" id="hold4">Houden</button>
            <span class="diceImgHolder"></span>
        </div>
        <div class="dice" id="dice5">
            <button disabled="disabled" class="holdButton" id="hold5">Houden</button>
            <span class="diceImgHolder"></span>
        </div>
    </div>
    <div id="scoreTabel">
        <h3>Score lijst</h3>
        <table>
            <tr>
                <td>E&eacute;nen</td>
                <td class="scoreSquare" id="0"></td>
            </tr>
            <tr>
                <td>Twee&euml;n</td>
                <td class="scoreSquare" id="1"></td>
            </tr>
            <tr>
                <td>Drie&euml;n</td>
                <td class="scoreSquare" id="2"></td>
            </tr>
            <tr>
                <td>Vieren</td>
                <td class="scoreSquare" id="3"></td>
            </tr>
            <tr>
                <td>Vijven</td>
                <td class="scoreSquare" id="4"></td>
            </tr>
            <tr>
                <td>Zessen</td>
                <td class="scoreSquare" id="5"></td>
            </tr>
            <tr>
                <td class="bold">&gt;63?</td>
                <td class="totalSquare" id="sixtyThree"></td>
            </tr>
            <tr>
                <td class="bold">+35</td>
                <td class="totalSquare" id="extra"></td>
            </tr>
            <tr>
                <td class="bold">Subtotaal</td>
                <td class="totalSquare" id="subtotal"></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>3 gelijken</td>
                <td class="scoreSquare" id="6"></td>
            </tr>
            <tr>
                <td>4 gelijken</td>
                <td class="scoreSquare" id="7"></td>
            </tr>
            <tr>
                <td>Full house</td>
                <td class="scoreSquare" id="8"></td>
            </tr>
            <tr>
                <td>Kleine straat</td>
                <td class="scoreSquare" id="9"></td>
            </tr>
            <tr>
                <td>Grote straat</td>
                <td class="scoreSquare" id="10"></td>
            </tr>
            <tr>
                <td>Yahtzee</td>
                <td class="scoreSquare" id="11"></td>
            </tr>
            <tr>
                <td>Chance</td>
                <td class="scoreSquare" id="12"></td>
            </tr>
            <tr>
                <td class="bold">Subtotaal</td>
                <td class="totalSquare" id="subtotal2"></td>
            </tr>
            <tr>
                <td class="bold">Yahtzee Bonus</td>
                <td class="totalSquare" id="yahtzeeBonus"></td>
            </tr>
            <tr id="totalScoreRow">
                <td class="bold">Totaal</td>
                <td class="totalSquare" id="totalScore"></td>
            </tr>
        </table>
    </div>
</body>
</html>