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
