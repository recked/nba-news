<?php 

/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/


//?apikey=8z7sf3xbpt3xfu47fgzrn85t

//Make and if else statement that checks for conference in the database?

// Eastern Conference with venue
$json = file_get_contents('http://api.espn.com/v1/sports/basketball/nba/teams/?enable=venues&groups=eastern&apikey=8z7sf3xbpt3xfu47fgzrn85t'); 

$espn = fopen('data/espn.json', 'w');
fwrite($espn,$json);
fclose($espn);



?>