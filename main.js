window.onload = function(){
  //Init animation
  $('body').animate({opacity: '1'},1000);
  //focus efect
  var styleSheet = document.styleSheets[2];
  $('input').focus(function(){
    styleSheet.addRule('.wrapper-input::before','height: 0px;');
    styleSheet.addRule('.wrapper-input::after','right: 10px;');
    styleSheet.addRule('.wrapper-input::after','opacity: 1;');
    $('input').css('cursor', 'auto');
  });
  $('input').focusout(function(){
    styleSheet.addRule('.wrapper-input::before','height: 20px;');
    styleSheet.addRule('.wrapper-input::after','right: -15px;');
    styleSheet.addRule('.wrapper-input::after','opacity: 0;');
    $('input').css('cursor', 'pointer');
  });



};
