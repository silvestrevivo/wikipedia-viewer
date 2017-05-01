window.onload = function(){

  //Complete Url
  window.location.replace('https://silvestrevivo.github.io/wikipedia-viewer/?#');

  //variable declararions
  var styleSheet = document.styleSheets[3];
  var input = document.getElementById('input');
  var container = document.querySelector('.container');

  //Init animation
  $('body').animate({opacity: '1'},1000);

  //focus efect
  input.addEventListener('focus', function(e){
    styleSheet.addRule('.wrapper-input::before','height: 0px;');
    styleSheet.addRule('.wrapper-input::after','right: 15px;');
    styleSheet.addRule('.wrapper-input::after','opacity: 1;');
    e.target.style.cursor = 'auto';
  });
  //focusout efect
  $('input').focusout(function(){
    styleSheet.addRule('.wrapper-input::before','height: 20px;');
    styleSheet.addRule('.wrapper-input::after','right: -15px;');
    styleSheet.addRule('.wrapper-input::after','opacity: 0;');
    $('input').css('cursor', 'pointer');
  });

  //Get value from input field
  var input = document.getElementById('input');
  var search = '';
  var container = document.querySelector('.container');
  input.addEventListener('keypress', function(event){
    if(event.keyCode === 13 && input.value.length > 0){
      $('.result').empty();
      container.style.display = 'block';
      container.style.verticalAlign = 'inherit';
      search = input.value;
      ajaxRequest(search);
    }
  });

  //Ajax Request with XMLHttpRequest
  function ajaxRequest(value){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
      if(http.readyState === 4 && http.status === 200){
        var response = JSON.parse(http.response);
        for (var i = 0; i < response.query.search.length; i++) {
          $('.result').append(
            `<a href="https://en.wikipedia.org/wiki/${response.query.search[i]['title']}" target="_blank">
              <li class="article animated bounceInUp list-unstyled">
                <h3 class="text-left">${response.query.search[i]['title']}</h3>
                <p class="text-left">${response.query.search[i]['snippet']}</p>
              </li>
            </a>`
          );
        }
      }
    };
    http.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + value + '&gsrlimit=15&utf8=&format=json&origin=*', true);
    http.send();
  }
};
