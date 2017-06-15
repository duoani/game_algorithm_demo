exports.renderTo = function (container, maze) {
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
  container.innerHTML = '';
  container.appendChild(table);
};
