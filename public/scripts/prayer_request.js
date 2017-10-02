var prayerRequests = [];

function getPrayerRequests() { 
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

function postPrayerRequest() {
    var prayerRequestString = $('#prayerRequestInput').val();
    if (prayerRequestString && prayerRequestString != " ") {
        $.ajax({
            url: '/prayerRequestData',
            type: 'POST',
            data: jQuery.param({ 
                prayer_request: $('#prayerRequestInput').val()
            }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               console.log(response);
               $('#prayerRequestInput').val('');
               getPrayerRequests();
            },
            error: function () {
                console.log("error posting prayer request");
            }
        }); 
    } else { 
        $('#prayerRequestInput').val('');
    }
}

function setup() { 
    $( ".fa-arrow-circle-right" ).click(function() {
        postPrayerRequest();
    });
}

$(document).ready(function() { 
    setup();
    getPrayerRequests();

    var interval = setInterval(function() {
        getPrayerRequests();
    }, 20000)
});