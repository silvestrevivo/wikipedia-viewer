window.onload = function(){
  //Init animation
  $('body').animate({opacity: '1'},1000);
  //focus efect
  var styleSheet = document.styleSheets[3];
  $('input').focus(function(){
    styleSheet.addRule('.wrapper-input::before','height: 0px;');
    styleSheet.addRule('.wrapper-input::after','right: 15px;');
    styleSheet.addRule('.wrapper-input::after','opacity: 1;');
    $('input').css('cursor', 'auto');
  });
  $('input').focusout(function(){
    styleSheet.addRule('.wrapper-input::before','height: 20px;');
    styleSheet.addRule('.wrapper-input::after','right: -15px;');
    styleSheet.addRule('.wrapper-input::after','opacity: 0;');
    $('input').css('cursor', 'pointer');
  });

  //Get value from input field
  var input = document.getElementById('input');
  var search = '';
  input.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
      $('.result').empty();
      search = input.value;
      ajaxRequest(search);
      console.log(search);
    }
  });

  //Ajax Request with XMLHttpRequest
  function ajaxRequest(value){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
      if(http.readyState === 4 && http.status === 200){
        var response = JSON.parse(http.response);
        console.log(response);
        console.log(response.query.search.length);
        for (var i = 0; i < response.query.search.length; i++) {
          console.log(response.query.search[i]['title']);
          console.log(response.query.search[i]['snippet']);
          $('.result').append(
            `<li class="article animated bounceInUp list-unstyled">
              <h3 class="text-left">${response.query.search[i]['title']}</h3>
              <p class="text-left">${response.query.search[i]['snippet']}</p>
            </li>`
          );
        }
      }
    };
    http.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + value + '&gsrlimit=15&utf8=&format=json&origin=*', true);
    //http.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=' + value, true);
    http.send();
  }
};
