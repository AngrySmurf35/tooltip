var Home = require("./home");
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

$('body').append('<div style="display: inline-block"><h1 class="test">Test</h1></div>');
$('body').append('<div style="display: inline-block;margin-right:100px"><h1 class="test1">Test1</h1></div>');
$('body').append('<div style="display: inline-block"><h1 class="test2">Test2</h1></div>');

var home = new Home({
  "element": $('.test'),
  "message": "Every day I'm hovering",
  "place": 'left',
  "tooltipWidth": 150
});

var home1 = new Home({
  "element": $('.test1'),
  "message": "Every day I'm hovering",
  "place": 'left',
  "tooltipWidth": 150
});

var home2 = new Home({
  "element": $('.test2'),
  "message": "Every day I'm hovering",
  "place": 'left',
  "tooltipWidth": 150
});


// after render
home.display();
home1.display();
home2.display();
