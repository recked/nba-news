<?php 

/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/

/*error_reporting(E_ALL);
ini_set('display_errors', '1');*/

    $id = $_POST['id'];

    
    
   $news = "http://api.espn.com/v1/sports/basketball/nba/teams/".$id."/news/?apikey=8z7sf3xbpt3xfu47fgzrn85t";
  
       
    $json = file_get_contents($news);
    
    $espn = fopen('../data/about.json', 'w');
    fwrite($espn,$json);
    fclose($espn);


?>