$(document).ready(function () {
    const nameAmenity = [];
    const maxDisplay = 3;

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
});
