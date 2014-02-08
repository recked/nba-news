/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/



(function () {


    var httpRequest;
    var xhr;

    //Document Ready
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            makeRequest('data/espn.json');
        }
    };
    /*-------------------------------------------------------------*/

    //Requsting team info from API for sidebar 
    function makeRequest(url) {
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = fillSidebar; //sidebar
        httpRequest.open('GET', url);
        httpRequest.send();
    } //makeRequest


    //Print name/venue/location
    function teamInfo(id) {
        var result = JSON.parse(httpRequest.responseText);
        var name = document.createElement("h2");
        name.innerHTML = result.sports[0].leagues[0].teams[id].location + ' ' + result.sports[0].leagues[0].teams[id].name;

        var venue = document.createElement("h3");
        venue.innerHTML = result.sports[0].leagues[0].teams[id].venues[0].name + ', ' + result.sports[0].leagues[0].teams[id].venues[0].city + ', ' + result.sports[0].leagues[0].teams[id].venues[0].state;

        var heading = document.getElementById("heading");
        heading.appendChild(name);
        heading.appendChild(venue);
    }

    //Fill json file with news for the right team
    function jsonNews(id) {


        var news = new XMLHttpRequest();

        var sendId = "id=" + id;

        news.open("POST", "includes/news.php");
        news.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        news.send(sendId);

        news.onreadystatechange = requestContent;

    }

    //listening for click of names in sidebar
    function checkClick(i) {
        return function () {
            document.getElementById('content').innerHTML = loadView('views/news.html');
            //Store which team it is
            var team = this.id;
            //Print name and venue info
            teamInfo(team);
            //fire json function
            var result = JSON.parse(httpRequest.responseText);
            var info = result.sports[0].leagues[0].teams[i].id;
            jsonNews(info);
        };
    }



    //Filling the sidebar with team names
    function fillSidebar() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var result = JSON.parse(httpRequest.responseText);

                var names = null;

                //Loop through the json and put the location + name of team into list elements
                for (var i = 0; i < result.sports[0].leagues[0].teams.length; i++) {

                    //Creating the li node
                    var elements = document.createElement("li");
                    names = result.sports[0].leagues[0].teams[i].location + ' ' + result.sports[0].leagues[0].teams[i].name;
                    elements.id = [i];
                    //Node filled with team name
                    elements.innerHTML = names;

                    //Print the result
                    if (names !== null) { //Working finally
                        var list = document.getElementById("names");
                        list.appendChild(elements);
                    }
                    //onclick of name
                    elements.addEventListener("click", checkClick(i));
                }

            } else {
                alert('Something broke.');
            }
        }
    }

    /*-------------------------------------------------------------*/

    //Requesting the news. Figure out how to get the urls after user clicks team name



    //Load html for the content section
    function loadView(html) {
        var view = new XMLHttpRequest();
        view.open("GET", html, false);
        view.send();
        return view.responseText;
    }

    //Requsting team news from json file for content panel 
    function requestContent() {
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }


        xhr.open('GET', 'data/about.json');
        xhr.onreadystatechange = fillContent;
        xhr.send();

    } //requestContent


    function fillContent() {
        if ((xhr.readyState === 4) && (xhr.status === 200)) {
            var about = JSON.parse(xhr.responseText);

            var headline = null;


        } else {
            alert('Something broke in fillContent.');
        }
    }




    /*

    document.getElementById("").onclick = function () {
        requestContent('data/about.json');
    };
*/






})();