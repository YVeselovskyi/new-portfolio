var form = document.getElementById('email-form');
var thankMessage = document.getElementById('thanks-message');


var xhr = new XMLHttpRequest();

var progressMove = function () {
    var elem = document.getElementById('progress-bar');
    var width = 1;
    var id = setInterval(frame, 50);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width = width + 5;
            elem.style.width = width + '%';
        }
    }
};

form.addEventListener( 'submit' , function(e) {

    progressMove();

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

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('Success!');
        }
    };

    xhr.open('POST', 'http://localhost:1927/send-email', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(data);

    e.preventDefault();
});









