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
                html += "<li class='prayer_request'>";
                html += "<p class='text'>"
                html += prayerRequests[i].request
                html += "</p>"
                html += "<div class='hearts_parent'><div class='hearts_container' onClick='heartClicked("
                html += prayerRequests[i].id
                html += ")'>"
                html += "<i class='fa fa-heart-o heart' aria-hidden='true'></i>"
                html += "<p class='heart_text heart' id='" 
                html += prayerRequests[i].id
                html += "'>"
                html += prayerRequests[i].hearts.toString()
                html += "</p>"
                html += "</div></div>"
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
    $( "#postButton" ).click(function() {
        postPrayerRequest();
    });
}

function heartClicked(prayerRequestId) { 
    console.log(prayerRequestId);
    console.log($("#" + prayerRequestId).text());
    $("#" + prayerRequestId).text((parseInt($("#" + prayerRequestId).text()) + 1).toString());
    if (prayerRequestId) {
        $.ajax({
            url: '/heart',
            type: 'POST',
            data: jQuery.param({ 
                id: prayerRequestId
            }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
               console.log(response);
            },
            error: function () {
                console.log("error posting heart increment");
            }
        }); 
    } else { 
        $('#prayerRequestInput').val('');
    }
}

$(document).ready(function() { 
    setup();
    getPrayerRequests();

    var interval = setInterval(function() {
        getPrayerRequests();
    }, 20000)
});