var Maze = require('./Maze');

exports.init = function (elem, rowCount, colCount) {
  render(elem, rowCount, colCount);
  elem.addEventListener('click', function () {
    render(elem, rowCount, colCount);
  });
};

function render(elem, rowCount, colCount) {
  var maze = Maze.create(rowCount, colCount);
  var table = document.createElement('table');
  table.className = 'table';
  for (var i = 0; i < maze.length; i++) {
    var row = maze[i];
    var tr = document.createElement('tr');
    tr.className = 'row';
    for (var j = 0; j < row.length; j++) {
      var td = document.createElement('td');
      td.classList.add('cell');
      td.classList.add('item-' + row[j]);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  elem.innerHTML = '';
  elem.appendChild(table);
}
