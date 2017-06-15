var AStar = function () {
  this.tmin = -1;   //上部搜索最小值(不包括)
  this.rmax = -1;   //右部搜索最大值(不包括)
  this.bmax = -1;   //下部搜索最大值(不包括)
  this.lmin = -1;   //左部搜索最小值(不包括)
  this.initialize();
};

AStar.prototype = {

  constructor : AStar,

  pointSource : function () {
    //获取点对象构造的引用
    return this.constructor.Point;
  },

  euclidean : function (a, b) {
    with (Math) { return round(10 * sqrt(pow(a.X - b.X, 2) + pow(a.Y - b.Y, 2))); }
  },

  manhattan : function (a, b) {
    with (Math) { return abs(a.X - b.X) + abs(a.Y - b.Y); }
  },

  initialize : function () {
    //初始化参数
    this.open = [];   //open表
    this.close = [];  //close表
    this.maps = {};  //已经发现点组
  },

  makeID : function (x, y, limit) {
    //创造ID
    return x + y * limit;
  },

  getMinNode : function () {
    //获取最佳节点
    var i = 1, o = this.open, l = o.length, min = i - 1, max = o[0].F, t = null;

    for (; i < l ; i ++) {
      t = o[i];
      if (t.F < max) { max = t.F, min = i; }
    }
    t = o[min], o[min] = o[l - 1], o.pop();

    return t;
  },

  getNodes : function (node) {
    //获取子节点
    var map = this.Map, tmin = this.tmin, rmax = this.rmax, bmax = this.bmax, lmin = this.lmin, nodes = []
    , x = node.X, y = node.Y, t = y - 1, r = x + 1, b = y + 1, l = x - 1
    , _t = t > tmin && (map[t][x] === 0)
    , _r = r < rmax && (map[y][r] === 0)
    , _b = b < bmax && (map[b][x] === 0)
    , _l = l > lmin && (map[y][l] === 0), i = 0;

    if (_t) {
      nodes[i++] = [x, t];
      if (_l && (map[t][l] === 0)) nodes[i++] = [l, t];
      if (_r && (map[t][r] === 0)) nodes[i++] = [r, t];
    }

    if (_l) nodes[i++] = [l, y];

    if (_b) {
      nodes[i++] = [x, b];
      if (_l && (map[b][l] === 0)) nodes[i++] = [l, b];
      if (_r && (map[b][r] === 0)) nodes[i++] = [r, b];
    }

    if (_r) nodes[i++] = [r, y];

    return nodes;
  },

  getAllPath : function (node) {
    //获取完整路径
    var path = [];
    do {
      path[path.length] = [node.X, node.Y];
    } while (node = node.P);
    path.reverse(), this.initialize();

    return path;
  },

  loadMap : function (map) {
    //加载地图
    this.Map = map;
    this.limit = (this.bmax = map.length) * (this.rmax = map[0].length);
  },

  search : function (start, goal) {
    //搜索

    var Point = this.pointSource()
    , open = this.open, close = this.close
    , makeID = this.makeID //放创造唯一值函数的引用.这样快
    , maps = this.maps //地图
    , limit = this.limit //地图最大值
    , euclidean = this.euclidean //计算代价的方法
    , GID = makeID(goal.X, goal.Y, limit) //终点的唯一值
    , nodes = []
    , length = 0
    , node = null, tempnode = null, tempg = 0
    , id = 0, i = 0, j = 0, _i = 0, _j = 0;

    open.push(new Point(null, start.X, start.Y)); //追加启始点

    while (length = open.length) {
      node = this.getMinNode(); //取最优点
      console.log('Test: ', node.X, node.Y)

      if (node.I != GID) { //若不是终点

        nodes = this.getNodes(node); //取该点所有所有临点

        for (i = 0, j = nodes.length ; i < j ; i ++) {
          id = makeID(nodes[i][0], nodes[i][1], limit); //获取临点ID

          if (!(tempnode = maps[id])) { //如果没有查过
            //创建点对象.放到open表.放到关联组
            tempnode = open[open.length] = maps[id] = new Point(node, nodes[i][0], nodes[i][1]);
            //计算代价值，估价值，总值
            tempnode.F =
              (tempnode.G = node.G + euclidean(tempnode, node)) + (tempnode.H = euclidean(tempnode, goal));
            tempnode.I = id; //计算唯一标识
          } else { //如果存在此点
            tempg = node.G + euclidean(tempnode, node); //计算当前点到此临点的G值

            //如果此G值小于此临点的G值那么把这个临点抢过来。。。然后重新初始化一些参数
            if (tempg < tempnode.G) tempnode.P = node, tempnode.G = tempg, tempnode.F = tempg + tempnode.H;
          }
        }

        close[close.length] = node; //放入close表
      } else {
        return this.getAllPath(node); //已经找到最优路径.返回完整路径
      }
    }
    return (this.initialize(), []); //没有找到最优路径.返回空值
  }

};

AStar.Point = function (p, x, y) {
  //节点
  this.P = p;  //父节点
  this.X = x;  //x位置
  this.Y = y;  //y位置
  this.G = 0;  //g值
  this.H = 0;  //h值
  this.F = 0;  //f值
  this.I = 0;  //节点唯一值
};

module.exports = AStar;
