<?php

function connect(): PDO
{
    $dsn = 'sqlite:yahtzee.sqlite';
    
    try {
        $db = new PDO($dsn);
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    return $db;
}

function addScore(string $naam, int $score): void
{
	$dbh = connect();
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$sql = "INSERT INTO scores (naam, score) VALUES (:naam, :score)";
	$stm = $dbh->prepare($sql);
	$stm->bindValue(':naam',$naam, PDO::PARAM_STR);
	$stm->bindValue(':score',$score, PDO::PARAM_INT);
	$stm->execute();
	
	$dbh = null;
}

function getScores($laatstBehaaldeScore = null): string
{
    $dbh = connect();
    $sql = "SELECT naam, score FROM scores ORDER BY score DESC LIMIT 10";
	
	$i = 1;
	$r = '<table>';

    foreach ($dbh->query($sql) as $row){
        $naam = stripslashes(html_entity_decode($row['naam']));
        $score = $row['score'];
		$klasse = ($i === 10) ? "id='laagsteScore'" : "";
		$klasseVoorLaatstBehaaldeScore = ($score === $laatstBehaaldeScore) ? "class='spelersLaatstBehaaldeScore'" : "";
		
		$r .= "<tr $klasseVoorLaatstBehaaldeScore>";
        $r .= "<td class='nummering'>$i.</td>";
        $r .= "<td class='namen'>".ucfirst($naam)."</td>";
        $r .= "<td class='topScoresSquare' $klasse>".$score."</td>";
        $r .= "</tr>";
		$i++;
    }
    $r .= "</table>";
    $dbh = null;
	
	return $r;
}

/* Deze functie schrijft alle scores behalve de eerste 10
 *  */
function getRestScores(){
    $dbh = connect();
	$sql = "SELECT naam,score FROM scores ORDER BY score DESC LIMIT 10, 90";	

    $i = 11;
	$r = '';
	$r .= '<table id="restScores">';            
	foreach ($dbh->query($sql) as $row){
        $naam = stripslashes(html_entity_decode($row['naam']));
        $score = $row['score'];
		
        $r .= "<tr>";
        $r .= "<td class='nummering'>$i.</td>";
        $r .= "<td class='namen'>".ucfirst($naam)."</td>";
        $r .= "<td class='topScoresSquare'>".$score."</td>";
        $r .= "</tr>";
		$i++;
    }
    $r .= "</table>";
    $dbh = null;
	
	return $r;
}

$wat = isset($_GET['w']) ? $_GET['w'] : '';
$laatstBehaaldeScore = isset($_GET['s']) ? $_GET['s'] : ''; // Om deze lijn te kunnen kleuren in de score-tabel

if($wat == 'post'){
    $newNaam = trim($_POST['naam']);
    $newScore = $_POST['score'];
	addScore($newNaam, $newScore);
} else if($wat == 'extra'){
	$r = '';
	$r .= getRestScores();
	
    echo $r;
} else{
	$r = '';
	$r .= getScores($laatstBehaaldeScore);
	
    echo $r;	
}