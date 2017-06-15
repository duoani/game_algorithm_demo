require('importCSS');
// document.querySelector('#dhr')
var Maze = require('./maze/Maze');
var MazeRenderer = require('./maze/MazeRenderer');
var AStar = require('./astar/AStar');

// LinkGame.init(document.querySelector('#dhr'));

var MAZE_SIZE = 25;
var mazeContainer = document.querySelector('#rm');
var astar = null;

// 初始化迷宫
renderMaze(mazeContainer, MAZE_SIZE);

// 刷新迷宫
document.querySelector('#refreshMaze').addEventListener('click', function () {
  renderMaze(mazeContainer, MAZE_SIZE);
}, false);

var sn = 0;
var start = {X: 0, Y: 0};
var end = {X: 0, Y: 0};
var path;
mazeContainer.addEventListener('click', function (e) {
  var t = e.target;
  if (t.nodeName === 'TD') {
    if (sn) {
      end.X = t.cellIndex;
      end.Y = t.parentNode.rowIndex;
      setTimeout(function () {
        goGoal(start, end);
      }, 0);
    } else {
      t.style.backgroundColor = '#000000';
      start.X = t.cellIndex;
      start.Y = t.parentNode.rowIndex;
    }
    sn = Math.abs(sn - 1);
  }
}, false);

var goGoal = function (start, end) {
  // 查找路径
  path = astar.search(start, end);

  if (path.length > 2) {
    path = path.slice(1, -1);
    moveToGoal();
  }
};

var moveToGoal = function () {
  // 设置走路:D
  var temp;
  if (path.length > 0) {
    temp = path.shift();
    console.log(mazeContainer.childNodes[0], mazeContainer.childNodes[0].rows[temp[1]]);
    mazeContainer.childNodes[0].rows[temp[1]].cells[temp[0]].classList.add('cross');
    window.setTimeout(arguments.callee, 30);
  }
};


// MazeAStarCreator.init(document.querySelector('#rmas'), 25, 25);


// AStarDemo.init(document.querySelector('#as'));

// 生成迷宫
function renderMaze(container, size) {
  var maze = Maze.create(size, size);
  MazeRenderer.renderTo(container, maze);
  astar = new AStar();
  var flipedMaze = flipMaze(maze);
  astar.loadMap(flipedMaze);
}

function flipMaze(maze) {
  var fliped = [];
  for (var i = 0; i < maze.length; i++) {
    var row = [];
    for (var j = 0; j < maze[i].length; j++) {
      row[j] = maze[i][j] % 2;
    }
    fliped[i] = row;
  }
  return fliped;
}
