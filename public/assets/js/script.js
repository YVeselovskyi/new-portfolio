var form = document.getElementById('email-form');

var xhr = new XMLHttpRequest();

form.addEventListener( 'submit' , function(e) {

    var firstName=document.getElementById('first_name').value;
    var lastName=document.getElementById('last_name').value;
    var eMail=document.getElementById('email').value;
    var message=document.getElementById('message').value;

    var data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        eMail: eMail,
        message: message
    });

    xhr.open('POST', 'https://yveselovskyi.herokuapp.com/send-email', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(data);

    e.preventDefault();
});









