/**
 * Created by esierra on 2/2/2017.
 */

// Main Javascript File

// Call your code.
updateTable();

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
            console.log("Done populating table");
        }
    );
}

function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");
    //Clearing values
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

    // Show the hidden dialog
    $('#myModal').modal('show');
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
        console.log($("firstNameDive").className);
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
        console.log("firstName is not Valid");
        $('#firstNameDiv').addClass("has-error");
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('firstNameStatus').val("(failure)");
        console.log($("firstNameDive").className);
        console.log("lastName is not Valid");

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
        console.log("firstName is not Valid");
        $('#firstNameDiv').addClass("has-error");
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('firstNameStatus').val("(failure)");
        console.log($("firstNameDive").className);
        console.log("email is not Valid");

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
        console.log("firstName is not Valid");
        $('#firstNameDiv').addClass("has-error");
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('firstNameStatus').val("(failure)");
        console.log($("firstNameDive").className);
        console.log("phone is not Valid");
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
        console.log("firstName is not Valid");
        $('#firstNameDiv').addClass("has-error");
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('firstNameStatus').val("(failure)");
        console.log($("firstNameDive").className);
        console.log("dob is not Valid");
    }

    if(isValid){saveItem()}else console.log("Something is not Valid");

}

function jqueryPostButtonAction() {


}
