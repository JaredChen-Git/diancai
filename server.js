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
      name: '热菜',
      items: [
        { id: 'r1', name: '西红柿炒鸡蛋', price: 18 },
        { id: 'r2', name: '宫保鸡丁', price: 28 },
        { id: 'r3', name: '鱼香肉丝', price: 26 },
        { id: 'r4', name: '麻婆豆腐', price: 16 },
        { id: 'r5', name: '红烧排骨', price: 38 },
      ]
    },
    {
      name: '凉菜',
      items: [
        { id: 'l1', name: '凉拌黄瓜', price: 10 },
        { id: 'l2', name: '皮蛋豆腐', price: 12 },
        { id: 'l3', name: '拍黄瓜', price: 8 },
      ]
    },
    {
      name: '主食',
      items: [
        { id: 'z1', name: '米饭', price: 2 },
        { id: 'z2', name: '馒头', price: 1 },
        { id: 'z3', name: '面条', price: 12 },
      ]
    },
    {
      name: '饮品',
      items: [
        { id: 'y1', name: '可乐', price: 5 },
        { id: 'y2', name: '雪碧', price: 5 },
        { id: 'y3', name: '矿泉水', price: 2 },
        { id: 'y4', name: '果汁', price: 8 },
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
