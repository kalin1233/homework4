/*
File: index.js
GUI Assignment: Creating an Interactive Dynamic Table
Kalin Toussaint, UMass Lowell Computer Science, Kalin_Toussaint@student.uml.edu
Copyright (c) 2024 by Kalin. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by KT on June 17, 2024
*/

$(document).ready(function () {
    // jQuery Validation plugin initialization
    $('#multiplication-form').validate({
        rules: {
            'start-horizontal': {
                required: true,
                number: true,
                range: [-50, 50]
            },
            'end-horizontal': {
                required: true,
                number: true,
                range: [-50, 50]
            },
            'start-vertical': {
                required: true,
                number: true,
                range: [-50, 50]
            },
            'end-vertical': {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            'start-horizontal': {
                required: "Please enter a start horizontal number.",
                number: "Please enter a valid number. Text is not allowed.",
                range: "The start horizontal number must be between -50 and 50."
            },
            'end-horizontal': {
                required: "Please enter an end horizontal number.",
                number: "Please enter a valid number. Text is not allowed.",
                range: "The end horizontal number must be between -50 and 50."
            },
            'start-vertical': {
                required: "Please enter a start vertical number.",
                number: "Please enter a valid number. Text is not allowed.",
                range: "The start vertical number must be between -50 and 50."
            },
            'end-vertical': {
                required: "Please enter an end vertical number.",
                number: "Please enter a valid number. Text is not allowed.",
                range: "The end vertical number must be between -50 and 50."
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            event.preventDefault();

            // Get the input values
            const startHorizontal = parseInt($('#start-horizontal').val());
            const endHorizontal = parseInt($('#end-horizontal').val());
            const startVertical = parseInt($('#start-vertical').val());
            const endVertical = parseInt($('#end-vertical').val());

            // Validate the input values
            const errorMessage = validateInputs(startHorizontal, endHorizontal, startVertical, endVertical);

            if (errorMessage) {
                // Display an error message if validation fails
                $('#output').html(`<p style="color: red;">${errorMessage}</p>`);
                return;
            }

            // Generate the multiplication table
            generateTable(startHorizontal, endHorizontal, startVertical, endVertical);
        }
    });
    //Input Validation
    function validateInputs(startH, endH, startV, endV) {
        if (isNaN(startH) || isNaN(endH) || isNaN(startV) || isNaN(endV)) {
            return "All inputs must be valid numbers.";
        }

        if (startH > endH) {
            return "Start Horizontal must be less than or equal to End Horizontal.";
        }

        if (startV > endV) {
            return "Start Vertical must be less than or equal to End Vertical.";
        }
        return null;
    }

    function generateTable(startH, endH, startV, endV) {
        let table = '<table>';
        table += '<tr><th></th>'; // Empty top-left corner

        // Generate header row
        for (let h = startH; h <= endH; h++) {
            table += `<th>${h}</th>`;
        }
        table += '</tr>';

        // Generate the table rows
        for (let v = startV; v <= endV; v++) {
            table += `<tr><th>${v}</th>`;
            for (let h = startH; h <= endH; h++) {
                table += `<td>${h * v}</td>`;
            }
            table += '</tr>';
        }
        table += '</table>';

        // Insert the table into the page
        $('#output').html(table);
    }
});



