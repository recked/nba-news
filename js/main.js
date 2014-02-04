/* 
Project 1 - Ajax
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/




//http://snippetrepo.com/snippets/perform-ajax-like-operations-without-jquery
(function () {
    var httpRequest;

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            makeRequest('json.txt');
        }
    }

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
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    function alertContents() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var result = JSON.parse(httpRequest.responseText);
                console.log(result.sports[0].leagues[0].teams[0]);

                var names;
                for (var i = 0; i < result.sports[0].leagues[0].teams.length; i++) {
                    names += '<li>' + result.sports[0].leagues[0].teams[i].location + ' ' + result.sports[0].leagues[0].teams[i].name + '</li>';
                }


                document.getElementById("sidebar").innerHTML = '<ul>' + names + '</ul';


            } else {
                alert('Shit broke.');
            }
        }
    }
})();

//Document Ready
/*
window.onload = function () {
    makeRequest('json.txt');
};*/