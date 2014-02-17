/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/



(function () {


    var httpRequest;
    var xhr;


    /*-------------------------------------------------------------*/


    //Requsting team list from json for sidebar 
    function makeRequest() {
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
        httpRequest.open('GET', 'data/espn.json');
        httpRequest.send();

        console.log('Fired makeRequest');

    } //makeRequest

    //Filling json file with the correct conference
    function jsonTeams(conference) {

        var teams = new XMLHttpRequest();

        //send conference to php file
        var sendTeam = "conference=" + conference;

        teams.open("POST", "includes/espn.php", true);
        teams.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        teams.send(sendTeam);

        teams.onreadystatechange = function () {
            if (teams.readyState === 4) {
                if (teams.status == 200) {
                    console.log('sendTeam ready ' + sendTeam);
                    makeRequest();
                }
            }
        };


    }

    //listening for conference
    var east = document.getElementById("east");
    east.addEventListener("click", function () {

        jsonTeams("east");
        document.getElementById("in").innerHTML = "Select a team from the Eastern Conference.";
    });

    var west = document.getElementById("west");
    west.addEventListener("click", function () {

        jsonTeams("west");
        document.getElementById("in").innerHTML = "Select a team from the Western Conference.";
    });


    //Fill json file with news for the right team
    function jsonNews(id) {

        var news = new XMLHttpRequest();

        //send id to php file
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

            //Remove any active classes
            for (var x = 0; x < document.getElementsByTagName("li").length; x++) {
                document.getElementsByTagName("li")[x].setAttribute('class', ' ');

            }

            //Store which team it is
            var team = this.id;
            //Print name and venue info
            teamInfo(team);
            //fire json function
            var result = JSON.parse(httpRequest.responseText);
            var info = result.sports[0].leagues[0].teams[i].id;
            jsonNews(info);
            //Give it an active class
            var active = document.getElementById(this.id);
            active.className = "active";

            if (window.innerWidth <= 480) {
                var sidebar = document.getElementById("sidebar");
                sidebar.setAttribute("style", "left: -1000;");
            }

        };
    }



    //Filling the sidebar with team names
    function fillSidebar() {
        var loader = document.getElementById("spin");
        loader.setAttribute("style", "display: block;");

        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {

                var result = JSON.parse(httpRequest.responseText);

                var names = null;

                var teamList = document.createElement("ul");
                teamList.id = "names";

                var select = document.getElementById("select");
                var start = document.getElementById("start");
                var back = document.getElementById("back");
                start.setAttribute("style", "display: none;");
                back.setAttribute("style", "display: block;");
                //select.removeChild(start);
                select.appendChild(teamList);

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


                loader.setAttribute("style", "display: none;");

            } else {
                alert('Something broke.');
            }
        }
    }


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


    /*-------------------------------------------------------------*/

    //Requesting the news


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

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var about = JSON.parse(xhr.responseText);

                var headline = null;
                var link = null;
                var description = null;
                var date = null;

                for (var i = 0; i < about.headlines.length; i++) {
                    //creating news list elements
                    var articles = document.createElement("div");
                    articles.className = " articles";

                    var title = document.createElement("span");
                    title.className = " title";

                    var brief = document.createElement("p");
                    brief.className = " description";

                    var time = document.createElement("span");
                    time.className = " date";

                    var read = document.createElement("span");
                    read.className = " more";

                    //storing the news info
                    headline = about.headlines[i].headline;
                    link = '<a href="' + about.headlines[i].links.web.href + '" target="_blank">Read More</a>';
                    description = about.headlines[i].description;
                    date = about.headlines[i].published;
                    date = date.substr(0, date.length - 10);
                    date = 'Written on ' + date;

                    title.innerHTML = headline;
                    brief.innerHTML = description;
                    time.innerHTML = date;
                    read.innerHTML = link;


                    articles.appendChild(title);
                    articles.appendChild(brief);
                    articles.appendChild(time);
                    articles.appendChild(read);

                    //Print the result
                    if (articles !== null) { //Working finally
                        var fill = document.getElementById("news");
                        fill.appendChild(articles);
                    }

                }
                var loader = document.getElementById("spinner");
                loader.setAttribute("style", "display: none;");

            } else {
                alert('Something broke in fillContent.');
            }
        }
    }


    /*-------------------------------------------------------------*/

    //Go back
    document.getElementById("back").onclick = function () {
        
        var select = document.getElementById("select");
        var teams = document.getElementById("names");
        select.removeChild(teams);
        
        var start = document.getElementById("start");
        var back = document.getElementById("back");
        start.setAttribute("style", "display: block;");
        back.setAttribute("style", "display: none;");
    }
    //Mobile menu
    document.getElementById("mobile").onclick = function () {

        var sidebar = document.getElementById("sidebar");
        var value = window.getComputedStyle(sidebar).getPropertyValue("left");
        console.log(value);

        if (value == '-1000px') {
            sidebar.setAttribute("style", "left: 0;");
        } else if (value == '0px') {
            sidebar.setAttribute("style", "left: -1000;");
        }
    };



})();