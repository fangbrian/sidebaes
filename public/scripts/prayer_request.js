var prayerRequests = [];
function onReady() { 
	$.ajax({
        type: 'GET',
        datatype: 'json',
        url: '/prayerRequestData'
    }).done(function (data) {
        if (data.prayer_requests) {
        	prayerRequests = data.prayer_requests;

            $("#prayerRequestList").html("");
            var html = "";
            for (var i = prayerRequests.length - 1; i >= 0; i--) { 
                console.log(prayerRequests[i]);
                html += "<li class='prayer_request'>";
                html += "<p class='text'>"
                html += prayerRequests[i].request
                html += "</p>"
                html += "<hr/>"
                html += "</li>"
            }

            $("#prayerRequestList").append(html);
        }
    }).fail(function (e) { 
        
    });	
}

$(document).ready(function() { 
	onReady();
});