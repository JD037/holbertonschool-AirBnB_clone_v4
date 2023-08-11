$(document).ready(function () {
    const nameAmenity = [];
    const maxDisplay = 2;

    $('input:checkbox').click(function () {
        if ($(this).is(":checked")) {
            nameAmenity.push($(this).attr('data-name'));
        } else {
            const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
            nameAmenity.splice(nameIndex, 1);
        }

        let displayText;
        if (nameAmenity.length > maxDisplay) {
            displayText = nameAmenity.slice(0, maxDisplay).join(', ') + '...';
        } else {
            displayText = nameAmenity.join(', ');
        }

        $('.amenities h4').text(displayText);
    });

    // Request to check the status of the API
    $.get('http://localhost:5001/api/v1/status/', function (data, textStatus, jqXHR) {
        console.log(data);
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});


$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
        alert(data)
        for (let i = 0; i < data.length; i++) {
            let place = data[i];
            $('.places').append('<article><h2>' + place.name +
                '</h2><div class="price_by_night"><p>$' + place.price_by_night +
                '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
                place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
                place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
                place.number_bathrooms + '</p></div></div><div class="description"><p>' +
                place.description + '</p></div></article>');
        }
    }
});
