var Home = require("./home");
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

$('body').append('<div><h1 class="test" style="display: inline-block">Test</h1></div>');
$('body').append('<div><h1 class="test1" style="display: inline-block">Test1</h1></div>');
$('body').append('<div><h1 class="test2" style="display: inline-block">Test2</h1></div>');

var home = new Home({
  "element": $('.test'),
  "message": "Every day I'm hovering",
  "place": 'right'
});

var home1 = new Home({
  "element": $('.test1'),
  "message": "Every day I'm hovering",
  "place": 'right'
});

var home2 = new Home({
  "element": $('.test2'),
  "message": "Every day I'm hovering",
  "place": 'right'
});

home.display();
home1.display();
home2.display();
