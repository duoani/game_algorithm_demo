// 产生随机迷宫

// 初始化数组
function init(r, c) {
  var a = new Array(2 * r + 1);
  var i, len;
  // 全部置1
  for (i = 0, len = a.length; i < len; i++) {
    var cols = 2 * c + 1;
    a[i] = new Array(cols);
    fillArray(a[i], 1);
  }
  // 中间格子为0
  for (i = 0; i < r; i++)
    for (var j = 0; j < c; j++) {
      a[2 * i + 1][2 * j + 1] = 0;
    }
  return a;
}
function process(arr) {
  // acc存放已访问队列，noacc存放没有访问队列
  var acc = [];
  var noacc = [];
  var r = arr.length >> 1;
  var c = arr[0].length >> 1;
  var count = r * c;
  for (var i = 0; i < count; i++) {
    noacc[i] = 0;
  }
  // 定义空单元上下左右偏移
  var offs = [-c, c, -1, 1];
  var offR = [-1, 1, 0, 0];
  var offC = [0, 0, -1, 1];
  // 随机从noacc取出一个位置
  var pos = randInt(count);
  noacc[pos] = 1;
  acc.push(pos);
  while (acc.length < count) {
    var ls = -1;
    var offPos = -1;
    offPos = -1;
    // 找出pos位置在二维数组中的坐标
    var pr = pos / c | 0;
    var pc = pos % c;
    var co = 0;
    var o = 0;
    // 随机取上下左右四个单元
    while (++co < 5) {
      o = randInt(0, 5);
      ls = offs[o] + pos;
      var tpr = pr + offR[o];
      var tpc = pc + offC[o];
      if (tpr >= 0 && tpc >= 0 && tpr <= r - 1 && tpc <= c - 1 && noacc[ls] == 0) {
        offPos = o;
        break;
      }
    }
    if (offPos < 0) {

      pos = acc[randInt(acc.length)];
    } else {
      pr = 2 * pr + 1;
      pc = 2 * pc + 1;
      // 相邻空单元中间的位置置0
      arr[pr + offR[offPos]][pc + offC[offPos]] = 0;
      pos = ls;
      noacc[pos] = 1;
      acc.push(pos);
    }
  }
}

function fillArray(arr, ele) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = ele;
  }

}

function randInt(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  return parseInt(Math.random() * (max - min) + min, 10);
}

var Maze = {};

Maze.create = function(r, c) {
  // 处理数组，产生最终的数组
  var a = init(r, c);
  process(a);
  return a;
};

module.exports = Maze;
