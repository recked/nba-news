<?php 

/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/



/*
error_reporting(E_ALL);
ini_set('display_errors', '1');
*/


//Getting the var from JavaScript
if (isset($_POST['conference'])) {
    
    $conference = $_POST["conference"];
    
    // Eastern Conference with venue
    $east = "http://api.espn.com/v1/sports/basketball/nba/teams/?enable=venues&groups=eastern&apikey=8z7sf3xbpt3xfu47fgzrn85t";
    // Western Conference with venue
    $west = "http://api.espn.com/v1/sports/basketball/nba/teams/?enable=venues&groups=western&apikey=8z7sf3xbpt3xfu47fgzrn85t";

    //Conditional that checks for conference
    if ($conference == "east"){
        
        $json = file_get_contents($east); 

        $espn = fopen('../data/espn.json', 'w');
        fwrite($espn,$json);
        fclose($espn);

    }
    else if ($conference == "west"){
        
        $json = file_get_contents($west); 

        $espn = fopen('../data/espn.json', 'w');
        fwrite($espn,$json);
        fclose($espn);

    }
}

?>