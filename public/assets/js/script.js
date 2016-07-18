$(document).ready(function(){
    var firstName;
    var lastName;
    var eMail;
    var message;
    $('#email-form').submit(function(e){
        firstName=$('#first_name').val();
        lastName=$('#last_name').val();
        eMail=$('#email').val();
        message=$('#message').val();

        $.post('http://localhost:1927/send-email',{firstName: firstName,lastName: lastName, eMail: eMail}, function(data){
            if(data==='done')
            {
                console.log('login success');
            }
        });

        e.preventDefault();
    });
});





