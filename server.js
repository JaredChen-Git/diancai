const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// 默认菜单
const DEFAULT_MENU = {
  categories: [
    {
      name: '🥟 淮扬菜',
      color: '#4CAF50',
      items: [
        { id: 'h1', name: '清炖狮子头', price: 48, image: '/images/huaiyang/清炖狮子头.jpg', emoji: '🫕' },
        { id: 'h2', name: '大煮干丝', price: 38, image: '/images/huaiyang/大煮干丝.jpg', emoji: '🥗' },
        { id: 'h3', name: '软兜长鱼', price: 78, image: '/images/huaiyang/软兜长鱼.jpg', emoji: '🧵' },
        { id: 'h4', name: '文思豆腐', price: 36, image: '/images/huaiyang/文思豆腐.jpg', emoji: '🥣' },
        { id: 'h5', name: '清蒸鳜鱼', price: 88, image: '/images/huaiyang/清蒸鳜鱼.jpg', emoji: '🐟' },
        { id: 'h6', name: '水晶肴肉', price: 48, image: '/images/huaiyang/水晶肴肉.jpg', emoji: '🍖' },
        { id: 'h7', name: '拆烩鲢鱼头', price: 68, image: '/images/huaiyang/拆烩鲢鱼头.jpg', emoji: '🐠' },
        { id: 'h8', name: '芙蓉鸡片', price: 42, image: '/images/huaiyang/芙蓉鸡片.jpg', emoji: '🍗' },
        { id: 'h9', name: '开洋蒲菜', price: 32, image: '/images/huaiyang/开洋蒲菜.jpg', emoji: '🥬' },
        { id: 'h10', name: '蛋烧卖', price: 28, image: '/images/huaiyang/蛋烧卖.jpg', emoji: '🥟' },
      ]
    },
    {
      name: '🥘 东北菜',
      color: '#E53935',
      items: [
        { id: 'd1', name: '锅包肉', price: 48, image: '/images/dongbei/锅包肉.jpg', emoji: '🍖' },
        { id: 'd2', name: '地三鲜', price: 28, image: '/images/dongbei/地三鲜.jpg', emoji: '🥔' },
        { id: 'd3', name: '猪肉炖粉条', price: 38, image: '/images/dongbei/猪肉炖粉条.jpg', emoji: '🍜' },
        { id: 'd4', name: '小鸡炖蘑菇', price: 48, image: '/images/dongbei/小鸡炖蘑菇.jpg', emoji: '🍄' },
        { id: 'd5', name: '酸菜白肉锅', price: 58, image: '/images/dongbei/酸菜白肉锅.jpg', emoji: '🍲' },
        { id: 'd6', name: '溜肉段', price: 38, image: '/images/dongbei/溜肉段.jpg', emoji: '🥩' },
        { id: 'd7', name: '拔丝地瓜', price: 28, image: '/images/dongbei/拔丝地瓜.jpg', emoji: '🍠' },
        { id: 'd8', name: '家常凉菜', price: 22, image: '/images/dongbei/家常凉菜.jpg', emoji: '🥒' },
        { id: 'd9', name: '酱骨头', price: 48, image: '/images/dongbei/酱骨头.jpg', emoji: '🦴' },
        { id: 'd10', name: '豆角烀饼', price: 32, image: '/images/dongbei/豆角烀饼.jpg', emoji: '🫘' },
      ]
    },
    {
      name: '🌶️ 川菜',
      color: '#FF6F00',
      items: [
        { id: 'c1', name: '麻婆豆腐', price: 28, image: '/images/chuan/麻婆豆腐.jpg', emoji: '🫘' },
        { id: 'c2', name: '水煮肉片', price: 48, image: '/images/chuan/水煮肉片.jpg', emoji: '🌶️' },
        { id: 'c3', name: '鱼香肉丝', price: 36, image: '/images/chuan/鱼香肉丝.jpg', emoji: '🥢' },
        { id: 'c4', name: '宫保鸡丁', price: 38, image: '/images/chuan/宫保鸡丁.jpg', emoji: '🐔' },
        { id: 'c5', name: '回锅肉', price: 38, image: '/images/chuan/回锅肉.jpg', emoji: '🥓' },
        { id: 'c6', name: '辣子鸡', price: 42, image: '/images/chuan/辣子鸡.jpg', emoji: '🌶️' },
        { id: 'c7', name: '毛血旺', price: 58, image: '/images/chuan/毛血旺.jpg', emoji: '🫕' },
        { id: 'c8', name: '酸菜鱼', price: 58, image: '/images/chuan/酸菜鱼.jpg', emoji: '🐟' },
        { id: 'c9', name: '夫妻肺片', price: 32, image: '/images/chuan/夫妻肺片.jpg', emoji: '🥩' },
        { id: 'c10', name: '干煸四季豆', price: 26, image: '/images/chuan/干煸四季豆.jpg', emoji: '🫘' },
      ]
    },
    {
      name: '🦐 粤菜',
      color: '#00897B',
      items: [
        { id: 'y1', name: '白切鸡', price: 58, image: '/images/yue/白切鸡.jpg', emoji: '🍗' },
        { id: 'y2', name: '清蒸石斑鱼', price: 128, image: '/images/yue/清蒸石斑鱼.jpg', emoji: '🐟' },
        { id: 'y3', name: '豉汁蒸排骨', price: 48, image: '/images/yue/豉汁蒸排骨.jpg', emoji: '🍖' },
        { id: 'y4', name: '菠萝咕咾肉', price: 42, image: '/images/yue/菠萝咕咾肉.jpg', emoji: '🍍' },
        { id: 'y5', name: '蚝油生菜', price: 22, image: '/images/yue/蚝油生菜.jpg', emoji: '🥬' },
        { id: 'y6', name: '冬瓜薏米排骨汤', price: 38, image: '/images/yue/冬瓜薏米排骨汤.jpg', emoji: '🍲' },
        { id: 'y7', name: '滑蛋虾仁', price: 48, image: '/images/yue/滑蛋虾仁.jpg', emoji: '🦐' },
        { id: 'y8', name: '烧鹅', price: 68, image: '/images/yue/烧鹅.jpg', emoji: '🦆' },
        { id: 'y9', name: '啫啫鸡', price: 48, image: '/images/yue/啫啫鸡.jpg', emoji: '🍗' },
        { id: 'y10', name: '咸鱼蒸肉饼', price: 36, image: '/images/yue/咸鱼蒸肉饼.jpg', emoji: '🥮' },
      ]
    },
    {
      name: '🥩 西餐',
      color: '#7B1FA2',
      items: [
        { id: 'x1', name: '黑椒牛排', price: 168, image: '/images/xican/黑椒牛排.jpg', emoji: '🥩' },
        { id: 'x2', name: '意式番茄肉酱意面', price: 48, image: '/images/xican/意式番茄肉酱意面.jpg', emoji: '🍝' },
        { id: 'x3', name: '奶油蘑菇汤', price: 28, image: '/images/xican/奶油蘑菇汤.jpg', emoji: '🥣' },
        { id: 'x4', name: '法式煎鹅肝', price: 128, image: '/images/xican/法式煎鹅肝.jpg', emoji: '🫘' },
        { id: 'x5', name: '香煎三文鱼', price: 88, image: '/images/xican/香煎三文鱼.jpg', emoji: '🍣' },
        { id: 'x6', name: '西班牙海鲜饭', price: 78, image: '/images/xican/西班牙海鲜饭.jpg', emoji: '🥘' },
        { id: 'x7', name: '培根蘑菇披萨', price: 68, image: '/images/xican/培根蘑菇披萨.jpg', emoji: '🍕' },
        { id: 'x8', name: '德式烤猪肘', price: 98, image: '/images/xican/德式烤猪肘.jpg', emoji: '🍖' },
        { id: 'x9', name: '凯撒沙拉', price: 32, image: '/images/xican/凯撒沙拉.jpg', emoji: '🥗' },
        { id: 'x10', name: '千层面', price: 58, image: '/images/xican/千层面.jpg', emoji: '🧀' },
      ]
    },
    {
      name: '🥤 饮品',
      color: '#00ACC1',
      items: [
        { id: 'yl1', name: '可乐', price: 5, image: '/images/yinpin/可乐.jpg', emoji: '🥤' },
        { id: 'yl2', name: '雪碧', price: 5, image: '/images/yinpin/雪碧.jpg', emoji: '🥤' },
        { id: 'yl3', name: '纯牛奶', price: 8, image: '/images/yinpin/纯牛奶.jpg', emoji: '🥛' },
        { id: 'yl4', name: '鲜榨橙汁', price: 18, image: '/images/yinpin/鲜榨橙汁.jpg', emoji: '🍊' },
        { id: 'yl5', name: '红茶', price: 12, image: '/images/yinpin/红茶.jpg', emoji: '🫖' },
        { id: 'yl6', name: '绿茶', price: 12, image: '/images/yinpin/绿茶.jpg', emoji: '🍵' },
        { id: 'yl7', name: '气泡矿泉水', price: 8, image: '/images/yinpin/气泡矿泉水.jpg', emoji: '💧' },
        { id: 'yl8', name: '酸奶饮品', price: 10, image: '/images/yinpin/酸奶饮品.jpg', emoji: '🥛' },
        { id: 'yl9', name: '美式咖啡', price: 18, image: '/images/yinpin/美式咖啡.jpg', emoji: '☕' },
        { id: 'yl10', name: '椰汁', price: 12, image: '/images/yinpin/椰汁.jpg', emoji: '🥥' },
      ]
    },
    {
      name: '🌅 早餐',
      color: '#FF8F00',
      items: [
        { id: 'z1', name: '豆浆油条', price: 10, image: '/images/zaocan/豆浆油条.jpg', emoji: '🥖' },
        { id: 'z2', name: '包子小米粥', price: 12, image: '/images/zaocan/包子小米粥.jpg', emoji: '🥟' },
        { id: 'z3', name: '煎蛋全麦吐司牛奶', price: 22, image: '/images/zaocan/煎蛋全麦吐司牛奶.jpg', emoji: '🍳' },
        { id: 'z4', name: '馄饨', price: 15, image: '/images/zaocan/馄饨.jpg', emoji: '🥟' },
        { id: 'z5', name: '杂粮煎饼豆腐脑', price: 12, image: '/images/zaocan/杂粮煎饼豆腐脑.jpg', emoji: '🥞' },
      ]
    }
  ]
};

// 初始化菜单
if (!fs.existsSync(MENU_FILE)) {
  fs.writeFileSync(MENU_FILE, JSON.stringify(DEFAULT_MENU, null, 2));
}

// 初始化订单文件
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ========== 菜单 API ==========
app.get('/api/menu', (req, res) => {
  const menu = readJSON(MENU_FILE);
  res.json(menu);
});

// ========== 订单 API ==========
app.get('/api/orders', (req, res) => {
  const orders = readJSON(ORDERS_FILE);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { items, note, customer } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: '请选择至少一个菜品' });
  }
  const orders = readJSON(ORDERS_FILE);
  const order = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    items,
    note: note || '',
    customer: customer || '',
    total: items.reduce((sum, i) => sum + i.price * (i.count || 1), 0),
    status: 'pending', // pending | done
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  writeJSON(ORDERS_FILE, orders);
  res.status(201).json(order);
});

app.patch('/api/orders/:id', (req, res) => {
  const orders = readJSON(ORDERS_FILE);
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: '订单不存在' });
  orders[idx].status = orders[idx].status === 'pending' ? 'done' : 'pending';
  writeJSON(ORDERS_FILE, orders);
  res.json(orders[idx]);
});

app.delete('/api/orders/:id', (req, res) => {
  let orders = readJSON(ORDERS_FILE);
  orders = orders.filter(o => o.id !== req.params.id);
  writeJSON(ORDERS_FILE, orders);
  res.json({ success: true });
});

// ========== 菜单管理 API（方便你自己加菜） ==========
app.post('/api/menu/item', (req, res) => {
  const { category, name, price } = req.body;
  if (!category || !name || !price) {
    return res.status(400).json({ error: '缺少参数' });
  }
  const menu = readJSON(MENU_FILE);
  const cat = menu.categories.find(c => c.name === category);
  if (!cat) return res.status(404).json({ error: '分类不存在' });
  const id = category.slice(0, 1) + Date.now().toString(36);
  cat.items.push({ id, name, price });
  writeJSON(MENU_FILE, menu);
  res.status(201).json({ id, name, price });
});

app.delete('/api/menu/item/:id', (req, res) => {
  const menu = readJSON(MENU_FILE);
  for (const cat of menu.categories) {
    const idx = cat.items.findIndex(i => i.id === req.params.id);
    if (idx !== -1) {
      cat.items.splice(idx, 1);
      writeJSON(MENU_FILE, menu);
      return res.json({ success: true });
    }
  }
  res.status(404).json({ error: '菜品不存在' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍳 点菜系统已启动: http://localhost:${PORT}`);
  console.log(`📱 点菜端: http://localhost:${PORT}`);
  console.log(`👨‍🍳 厨子端: http://localhost:${PORT}/kitchen.html`);
});
