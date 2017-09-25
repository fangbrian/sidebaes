function onReady() { 
	if (window.localStorage.refreshToken) {
		if (window.localStorage.refreshToken) { 
			$.ajax({
		        type: 'GET',
		        datatype: 'json',
		        url: '/refresh?refresh_token=' + window.localStorage.refreshToken
		    }).done(function (data) {
		        console.log(data);
		        if (data.access_token) {
		        	ll('tagEvent', 'Token refresh', { 'Token' : data.access_token});
		        	window.location.replace("/playlist?access_token=" + data.access_token + "&refresh_token=" + window.localStorage.refreshToken);
		        }
		    }).fail(function (e) { 
		        
		    });
		}
	}
}

function getQueryString() {
    var queryString= [];
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        var queryParam = { 
        	query: hash[0],
        	token: hash[1]
        };
        queryString.push(queryParam);
    }
    return queryString;
}

function getQueryParam(qs, param) { 
	for(var i = 0; i < qs.length; i++) { 
		if(qs[i].query == param) return qs[i].token;
	}
}

$(document).ready(function() { 
	onReady();

	var qString = getQueryString();
    matchUser = getQueryParam(qString, 'match');
    window.localStorage.matchUser = matchUser;

	$(".login").on("click", function() {
		ll('tagEvent', 'Login');
		window.location.replace("/login");
	});
});