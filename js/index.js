$(document).ready(function() {
  normaliseHash();
	setupJumpScroll();
	updateOnScroll();
});

function normaliseHash(){
  if(!location.hash) return;
  
  // remove the # to find the actual path
  var path = location.hash.substr(1);
  
  // get the list of sections in the page
  var sectionIds = $('.section')
    .map(function(i, section){
      return section.id;
    })
    .toArray();
  
  // If the hash was for a section we don't have, just go to the top
  // It may be better to redirect to a 404 here
  if(sectionIds.indexOf(path) < 0){
    window.history.replaceState(path, "", "/");
  }
}

var scrolling = false;

function setupJumpScroll() {
	$('.scroll-link').on('click', function(e) {
    e.preventDefault();
    
    var path = e.currentTarget.attributes['href'].value;
    var section = $("#" + path);
    window.history.pushState(path, "", "/" + path);

    scrolling = true;
    $('html, body').animate({
      scrollTop: section.offset().top
    }, 1000, function() { scrolling = false; });
  });
  
  $('.navbar-brand').on('click', function(e) {
    e.preventDefault();
    scrolling = true;
    window.history.pushState("home", "", "/");
    $('html, body').animate({
      scrollTop: 0
    }, 500, function() { scrolling = false; });
  });
}

function updateOnScroll() {
	$(window).on('scroll', function() {
		if(scrolling) return;
	
		// figure out where we are in the page
    var sections = $('.section');
		var scrollPosition = window.pageYOffset;
		var pastSections = sections.filter(function(index, element){
      	return $(element).offset().top <= scrollPosition;
    });
    
    // if we've passed a section, put it in the url
    if (pastSections.length > 0) {
      var lastSection = pastSections[pastSections.length - 1];
      var newPath = lastSection.attributes['id'].value;
      var currentPath = location.pathname.slice(1);
      
      if(currentPath !== newPath){
        window.history.replaceState(newPath, "", "/" + newPath);
      }
    } else {
      window.history.replaceState(newPath, "", "/");
    }
  });
}