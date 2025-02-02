<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>bladsteenschaar.be :: yahtzee</title>
    <link rel="icon" href="favicon.gif" type="image/gif" />
    <link href="css/main.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.5.1/jquery.min.js" integrity="sha512-P4RKBldxaN4FsYfnJ90HuaIM8EU80A4orv3u/PeD3GgOvZQezXmlOrJlEK8fhVmEwt3HdWXvDbEdS6bkb1nXSA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="js/functions.js" type="text/javascript" defer></script>
    <script src="js/yahtzee.js" type="text/javascript" defer></script>
</head>

<body>
	
	<div id="preload"><img src="img/dobbelsteen.png" alt="dobbelsteenSprite" /></div>
    
    <div id="score-tabel">
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


    <div id="spelbord">
        <div class="restart-button">
            <button class="button gray" id="restart-button">Begin opnieuw</button>
        </div>
        <div class="throw-button">
            <button class="button gray" id="throw-button">Gooien</button>
        </div>
        <div class="dice" id="dice1">
            <button disabled="disabled" class="hold-button" id="hold1">Houden</button>
            <span class="dice-image-holder"></span>
        </div>
        <div class="dice" id="dice2">
            <button disabled="disabled" class="hold-button" id="hold2">Houden</button>
            <span class="dice-image-holder"></span>
        </div>
        <div class="dice" id="dice3">
            <button disabled="disabled" class="hold-button" id="hold3">Houden</button>
            <span class="dice-image-holder"></span>
        </div>
        <div class="dice" id="dice4">
            <button disabled="disabled" class="hold-button" id="hold4">Houden</button>
            <span class="dice-image-holder"></span>
        </div>
        <div class="dice" id="dice5">
            <button disabled="disabled" class="hold-button" id="hold5">Houden</button>
            <span class="dice-image-holder"></span>
        </div>
    </div>

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
            <a href="#" id="show-all-scores">Alle scores</a>
            <div id="loadingGif2">
                <img src="img/laden.gif" alt="laden..." />
            </div>
        </div>
    </div>


</body>
</html>
