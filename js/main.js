/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/



(function () {


    var httpRequest;

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
        httpRequest.onreadystatechange = fillSidebar;
        httpRequest.open('GET', url);
        httpRequest.send();
    } //makeRequest

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
                    elements.onclick = function () { //If team name is clicked, request info about team
                        console.log('Clicked ' + this.id);
                        //requestContent('data/about.json'); 
                        document.getElementById('content').innerHTML = loadView('views/news.html');
                        //Store which team it is
                        var team = this.id;
                        //Send it out of the function
                        return team;
                    }
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


    /*

    document.getElementById("").onclick = function () {
        requestContent('data/news.json');
    };

    //Requsting team news from API for content panel 
    function requestContent(url) {
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
        httpRequest.onreadystatechange = fillContent;
        httpRequest.open('GET', url);
        httpRequest.send();
    } //requestContent

    function fillContent() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var news = JSON.parse(httpRequest.responseText);
            } else {
                alert('Shit broke.');
            }
        }
    }
    */




})();