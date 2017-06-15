var MATRIX_ACTUAL_SIZE = 7;
var currentType = 0;
var currentOrientation = -1;
var matrixFlag = [];
var matrix = [
  [
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    }
  ],
  [
    {
      type: 0
    },
    {
      type: 1
    },
    {
      type: 2
    },
    {
      type: 3
    },
    {
      type: 4
    },
    {
      type: 5
    },
    {
      type: 0
    }
  ],
  [
    {
      type: 0
    },
    {
      type: 2
    },
    {
      type: 1
    },
    {
      type: 4
    },
    {
      type: 3
    },
    {
      type: 5
    },
    {
      type: 0
    }
  ],
  [
    {
      type: 0
    },
    {
      type: 2
    },
    {
      type: 5
    },
    {
      type: 1
    },
    {
      type: 4
    },
    {
      type: 3
    },
    {
      type: 0
    }
  ],
  [
    {
      type: 0
    },
    {
      type: 5
    },
    {
      type: 4
    },
    {
      type: 3
    },
    {
      type: 2
    },
    {
      type: 1
    },
    {
      type: 0
    }
  ],
  [
    {
      type: 0
    },
    {
      type: 1
    },
    {
      type: 3
    },
    {
      type: 2
    },
    {
      type: 5
    },
    {
      type: 4
    },
    {
      type: 0
    }
  ],
  [
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    },
    {
      type: 0
    }
  ]
];

var container;

function render() {
  var tableDiv = document.createElement('div');
  tableDiv.className = 'table';
  for (var i = 0; i < matrix.length; i++) {
    var row = matrix[i];
    var rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    for (var j = 0; j < row.length; j++) {
      var div = document.createElement('div');
      div.classList.add('cell');
      div.classList.add('item-' + row[j].type);
      if (matrixFlag[i] && matrixFlag[i][j] && matrixFlag[i][j].flag) {
        div.classList.add('item-flag');
      }

      div.setAttribute('row', i);
      div.setAttribute('col', j);
      rowDiv.appendChild(div);
    }
    tableDiv.appendChild(rowDiv);
  }
  container.innerHTML = '';
  container.appendChild(tableDiv);
}

function checkHorizontalBlank(row, col) {
  var i;
  for (i = col - 1; i >= 0; i--) {
    if (matrix[row][i].type === 0) {
      if (!matrixFlag[row]) {
        matrixFlag[row] = [];
      }

      matrixFlag[row][i] = {
        type: 0,
        flag: 1
      };
    } else {
      break;
    }
  }

  for (i = col + 1; i < MATRIX_ACTUAL_SIZE; i++) {
    if (matrix[row][i].type === 0) {
      if (!matrixFlag[row]) {
        matrixFlag[row] = [];
      }

      matrixFlag[row][i] = {
        type: 0,
        flag: 1
      };
    } else {
      break;
    }
  }
}

function checkVerticleBlank(row, col) {
  var i;
  for (i = row - 1; i >= 0; i--) {
    if (matrix[i][col].type === 0) {
      if (!matrixFlag[i]) {
        matrixFlag[i] = [];
      }

      matrixFlag[i][col] = {
        type: 0,
        flag: 1
      };
    } else {
      break;
    }
  }

  for (i = row + 1; i < MATRIX_ACTUAL_SIZE; i++) {
    if (matrix[i][col].type === 0) {
      if (!matrixFlag[i]) {
        matrixFlag[i] = [];
      }

      matrixFlag[i][col] = {
        type: 0,
        flag: 1
      };
    } else {
      break;
    }
  }
}

exports.init = function (dom) {
  container = dom;

  container.addEventListener('mouseup', function (e) {
    var ele = e.target;
    if (!ele.classList.contains('cell')) {
      return false;
    }

    var button = e.button;
    var isRightKey = button === 2;
    var row = parseInt(ele.getAttribute('row'), 10);
    var col = parseInt(ele.getAttribute('col'), 10);
    var type = matrix[row][col].type;

    if (type !== currentType || button !== currentOrientation) {
      // 清空上一次的 Flag.
      matrixFlag = [];
      currentType = type;
      currentOrientation = button;
    }

    if (isRightKey) {
      checkVerticleBlank(row, col);
    } else {
      checkHorizontalBlank(row, col);
    }

    render();
    e.preventDefault();
  }, false);

  render();
};
