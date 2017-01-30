/**
 * Created by esteban.sierra on 1/19/2017.
 */
function printHello() {
    console.log("Hello");
}

function addTwoValues(){
    var x = parseInt($('#field1').val());
    var y = parseInt($('#field2').val());
    var sum = x + y;

    //$('#field3').value = sum+"";
    document.getElementById("field3").value = sum + "";
    console.log(sum);
}

function toggleHideAndShow(){
    var x = document.getElementById('paragraphToHide');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}


function phonenumber() {
    var inputtxt = document.getElementById('phoneField').value;
    console.log(inputtxt);
    var phonevalidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phonevalidation))
    {
        console.log("OK");
        return true;
    }
    else
    {
        console.log("BAD");
        return false;
    }
}

function jsonstring() {
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');

    var jsonStr = '{'
        + '"First Name"'+ ' : "' + firstName.value + '",'
        + ' "Last Name"' + ' : "' + lastName.value + '",'
        + ' "Email"' + ' : "' + email.value + '",'
        +'}';

    document.getElementById('textOutput').innerHTML = jsonStr;
}