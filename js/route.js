$(document).ready(function(){
	redirect();
});

function redirect(){
  var pathname = window.location.pathname.slice(1);
  var hash = "/#" + pathname;
  window.location.replace(hash);
}