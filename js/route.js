page('/:section', function(s){
  page("/#" + s.path.substr(1));
});

page();