$(document).ready(function(){
    $('#email-form').submit(function(e){
        var firstName=$('#first_name').val();
        var lastName=$('#last_name').val();
        var eMail=$('#email').val();
        var message=$('#message').val();

        $.post('http://localhost:1927/send-email',{
            firstName: firstName,
            lastName: lastName,
            eMail: eMail,
            message: message
        }, function(data){
            if(data==='done')
            {
                console.log('login success');
            }
        });

        e.preventDefault();
    });
});





