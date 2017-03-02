/**
 * Created by esierra on 2/2/2017.
 */

// Main Javascript File

// Call your code.
$(document).ready(function() {

    updateTable();
});

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveItemButton = $('#saveItem');
saveItemButton.on("click", isValid);

function updateTable() {
    var url = "api/name_list_get";
    var rowsInTable = '';
    var populatedTable = '';

    $.getJSON(url, null, function(json_result) {


            for (var i = 0; i < json_result.length; i++) {
                rowsInTable = '';
                rowsInTable += '<tr>';
                rowsInTable += '<td>' + json_result[i].id + '</td>';
                rowsInTable += '<td>' + json_result[i].first + '</td>';
                rowsInTable += '<td>' + json_result[i].last + '</td>';
                rowsInTable += '<td>' + json_result[i].email + '</td>';
                var phoneString = json_result[i].phone;
                var cleanUpPhoneString = phoneString.substring(0,3)+'-' + phoneString.substring(4,7)+'-' +
                    phoneString.substring(6,10);
                rowsInTable += '<td>' + cleanUpPhoneString + '</td>';
                rowsInTable += '<td>' + json_result[i].birthday + '</td>';
                rowsInTable += '</tr>';
                populatedTable += rowsInTable + '\n';
            }
            document.getElementById("table_list").innerHTML = populatedTable;
            console.log("Populated Table: " + populatedTable);
            console.log("Done populating table.xx");
        }
    );
}

function showDialogAdd() {
    cleanForm();

    $('#myModal').modal('show');
    // Print that we got here
    console.log("Opening add item dialog");
}

function saveItem() {
    var url = "api/name_list_edit";
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var email = $("#email").val();
    var phoneNumber = $("#phoneNumber").val();
    var dob = $("#birthday").val();
    console.log("Save items: " + fName+lName+email+phoneNumber+dob);
    var dataToServer = {fName : fName,
                        lName : lName,
                        email : email,
                        phoneNumber : phoneNumber,
                        dob : dob };

    $.ajax({
        type: 'POST',
        url: url,
        data: dataToServer,
        success: function(dataFromServer) {
            console.log(dataFromServer);
            location.reload();
        },
        // contentType: "application/json",
        // dataType: 'text' // Could be JSON or whatever too
    });
    console.log("Save Item Function");
    $('#myModal').modal('hide');
}

function isValid(){
    var isValid = false;
    var invalidField='';

    var fName = $("#firstName").val();
    var nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if(nameRegex.test(fName)){
        isValid = true;
        $('#firstNameDive').addClass("has-success");
        $('#firstNameDive').removeClass("has-error");

        $('#firstNameGlyph').removeClass("glyphicon-remove");
        $('#firstNameGlyph').addClass("glyphicon-ok");

        $('firstNameStatus').val("(success)");
    }else{
        console.log("firstName is not Valid");
        $('#firstNameDiv').addClass("has-error");
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('firstNameStatus').val("(failure)");
        isValid=false;
        invalidField = 'first name';
        document.getElementById('invalidMessage').innerHTML = 'Your ' + invalidField + ' is invalid.'
        console.log(document.getElementById('invalidMessage'));
        return;
        }

    var lName = $("#lastName").val();
    if(isValid && nameRegex.test(lName)){
        isValid = true;
        $('#lastNameDive').addClass("has-success");
        $('#lastNameDive').removeClass("has-error");

        $('#lastNameGlyph').removeClass("glyphicon-remove");
        $('#lastNameGlyph').addClass("glyphicon-ok");

        $('lastNameStatus').val("(success)");
    }else {
        console.log("Last Name is not Valid");
        $('#lastNameDive').addClass("has-error");
        $('#lastNameDive').removeClass("has-success");
        $('#lastNameGlyph').addClass("glyphicon-remove");
        $('#lastNameGlyph').removeClass("glyphicon-ok");
        $('lastNameStatus').val("(failure)");
        console.log("lastName is not Valid");
        isValid=false;
        invalidField = 'last name';
        document.getElementById('invalidMessage').innerHTML = 'Your ' + invalidField + ' is invalid.'
        return;

    }

    var email = $("#email").val();
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(isValid && emailRegex.test(email)){
        isValid=true;
        $('#emailDive').addClass("has-success");
        $('#emailDive').removeClass("has-error");

        $('#emailGlyph').removeClass("glyphicon-remove");
        $('#emailGlyph').addClass("glyphicon-ok");

        $('emailStatus').val("(success)");
    }else{
        console.log("Email is not Valid");
        $('#emaildive').addClass("has-error");
        $('#emaildive').removeClass("has-success");
        $('#emailGlyph').addClass("glyphicon-remove");
        $('#emailGlyph').removeClass("glyphicon-ok");
        $('emailStatus').val("(failure)");
        console.log("email is not Valid");
        isValid=false;
        invalidField = 'email';
        document.getElementById('invalidMessage').innerHTML = 'Your ' + invalidField + ' is invalid.'
        return;

    }


    var phoneNumber = $("#phoneNumber").val();
    var phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(isValid && phoneNumberRegex.test(phoneNumber)){
        isValid=true;
        $('#phoneNumberDive').addClass("has-success");
        $('#phoneNumberDive').removeClass("has-error");

        $('#phoneNumberGlyph').removeClass("glyphicon-remove");
        $('#phoneNumberGlyph').addClass("glyphicon-ok");

        $('phoneNumberStatus').val("(success)");
    } else {
        console.log("Phone Number is not Valid");
        $('#phoneNumberDive').addClass("has-error");
        $('#phoneNumberDive').removeClass("has-success");
        $('#phoneNumberGlyph').addClass("glyphicon-remove");
        $('#phoneNumberGlyph').removeClass("glyphicon-ok");
        $('phoneNumberGlyph').val("(failure)");
        console.log($("phoneNumberDiv").className);
        console.log("phone number is not Valid");
        isValid=false;
        invalidField = 'phone number';
        document.getElementById('invalidMessage').innerHTML = 'Your ' + invalidField + ' is invalid.'
        return;

    }

    var birthday = $("#birthday").val();
    var birthdayRegex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
    if(isValid && birthdayRegex.test(birthday)){
        isValid=true;
        $('#birthdayDive').addClass("has-success");
        $('#birthdayDive').removeClass("has-error");

        $('#birthdayGlyph').removeClass("glyphicon-remove");
        $('#birthdayGlyph').addClass("glyphicon-ok");

        $('birthdayStatus').val("(success)");
    }else{
        console.log("Birthday is not Valid");
        $('#birthdayDive').addClass("has-error");
        $('#birthdayDive').removeClass("has-success");
        $('#birthdayGlyph').addClass("glyphicon-remove");
        $('#birthdayGlyph').removeClass("glyphicon-ok");
        $('birthdayStatus').val("(failure)");
        console.log("Birthday is not valid is not Valid");
        invalidField = 'Birthday';
        isValid=false;
        document.getElementById('invalidMessage').innerHTML = 'Your ' + invalidField + ' is invalid.'


        return;

    }

    if(isValid){
        saveItem()
    }else {
        $('#invalidMessage').innerHTML = 'Make sure to enter valid data.'
        console.log("Something is not Valid");
    }

}

function cleanForm(){
    $('#id').val("");

    //FirstName cleanup
    $('#firstName').val("");
    $('#firstNameDive').removeClass("has-success");
    $('#firstNameDive').removeClass("has-error");

    $('#firstNameGlyph').removeClass("glyphicon-remove");
    $('#firstNameGlyph').removeClass("glyphicon-ok");
    //LastName cleanup
    $('#lastName').val("");
    $('#lastNameDive').removeClass("has-success");
    $('#lastNameDive').removeClass("has-error");

    $('#lastNameGlyph').removeClass("glyphicon-remove");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    //Email cleanup
    $('#email').val("");
    $('#emailDive').removeClass("has-success");
    $('#emailDive').removeClass("has-error");

    $('#emailGlyph').removeClass("glyphicon-remove");
    $('#emailGlyph').removeClass("glyphicon-ok");
    //PhoneNumber cleanup
    $('#phoneNumber').val("");
    $('#phoneNumberDive').removeClass("has-success");
    $('#phoneNumberDive').removeClass("has-error");

    $('#phoneNumberGlyph').removeClass("glyphicon-remove");
    $('#phoneNumberGlyph').removeClass("glyphicon-ok");
    //Birthday cleanup
    $('#birthday').val("");
    $('#birthdayDive').removeClass("has-success");
    $('#birthdayDive').removeClass("has-error");

    $('#birthdayGlyph').removeClass("glyphicon-remove");
    $('#birthdayGlyph').removeClass("glyphicon-ok");

}
function jqueryPostButtonAction() {


}
