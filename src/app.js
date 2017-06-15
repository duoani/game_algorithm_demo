require('importCSS');
// document.querySelector('#dhr')
var MazeCreator = require('./maze/MazeCreator');
var AStarDemo = require('./astar/AStarDemo');

// LinkGame.init(document.querySelector('#dhr'));

MazeCreator.init(document.querySelector('#rm'), 25, 25);

AStarDemo.init(document.querySelector('#as'));

