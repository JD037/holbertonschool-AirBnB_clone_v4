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
    $.get('http://:5001/api/v1/status/', function (data, textStatus, jqXHR) {
        console.log(data);
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});


$.ajax({
    type: "POST",
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
        $('.places').empty(); // Clear existing places
        for (const place of data) {
            const placeHTML = `
            <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                </div>
                <div class="user">
                    <div class="description">${place.description}</div>
                </div>
            </article>`;
            $('.places').append(placeHTML);
        }
    }
});