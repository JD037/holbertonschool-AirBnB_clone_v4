$(document).ready(function () {
    // Function to fetch and populate amenities
    function loadAmenities() {
        $.get('http://172.26.49.18:5001/api/v1/amenities/', function (data) {
            // Empty current amenities
            $('.amenities .popover ul').empty();
    
            // Loop through each amenity and append to the list
            data.forEach(function (amenity) {
                let listItem = `<li><input type="checkbox" data-id="${amenity.id}" data-name="${amenity.name}" style="margin-right: 20px;">${amenity.name}</li>`;
                $('.amenities .popover ul').append(listItem);
            });
        });
    }
    
    // Call the function to fetch and display amenities
    loadAmenities();
    
    const nameAmenity = [];
    const maxDisplay = 2;

    // Checkbox click behavior to store the amenity names
    $('.amenities .popover ul').on('click', 'input:checkbox', function () {
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

    // Check the status of the API
    $.get('http://172.26.49.18:5001/api/v1/status/', function (data, textStatus, jqXHR) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Search button click handler
    $('#search_button').click(function () {
        const amenityIds = [];
        $('input:checked').each(function () {
            amenityIds.push($(this).attr('data-id'));
        });
        fetchPlaces(amenityIds);
    });

    // Fetch places function
    function fetchPlaces(amenityIds) {
        $.ajax({
            type: 'POST',
            url: 'http://172.26.49.18:5001/api/v1/places_search/',
            data: JSON.stringify({ amenities: amenityIds }),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                $('.places').empty();

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
    }

    // Initial fetch for all places on page load
    fetchPlaces([]);
});
