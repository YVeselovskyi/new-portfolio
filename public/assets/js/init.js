(function($) {
    $(function() {

        $('.button-collapse').sideNav();


    }); // end of document ready
})(jQuery); // end of jQuery name space

function displaySocial(){

  var menu = document.getElementsByClassName('flaticon-menu')[0];

  menu.addEventListener('click' , function(){
    var socialMenu = document.getElementsByClassName('icons');
    for(var i=0; i<socialMenu.length; i++){
        socialMenu[i].classList.remove('hidden');
    }
    console.log('Hi')
  })
}


displaySocial();
