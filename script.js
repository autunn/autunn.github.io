/**
 * ===================================================================
 * 模块一：数据获取与渲染 (随笔加载逻辑)
 * ===================================================================
 */

// 1.1 日期格式化工具
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString("zh-CN");
}

// 1.2 XSS 防护转义工具
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[m]);
}

// 1.3 异步加载文本数据
async function loadNotes() {
  const container = document.getElementById("notes-container");
  try {
    const res = await fetch("./note.txt", { cache: "no-cache" });
    if (!res.ok) throw new Error("加载失败");
    const text = await res.text();
    renderNotes(container, text);
  } catch {
    container.innerHTML = "<p>无法加载随笔</p>";
  }
}

// 1.4 解析并渲染 DOM
function renderNotes(container, text) {
  const entries = text.split(/\n\s*---\s*\n/).filter(Boolean);
  container.innerHTML = "";
  
  entries.reverse().forEach(entry => {
    const lines = entry.split("\n").filter(Boolean);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(lines[0]) ? lines.shift() : "未知日期";
    const content = lines.join(" ");
    
    // 提取标题与正文
    const title = content.slice(0, 6);
    const rest = content.slice(6);
    
    // 创建卡片元素
    const el = document.createElement("div");
    el.className = "note-item";
    el.innerHTML = `
      <h4 class="note-title">
        ${escapeHtml(title)}<span class="note-rest">${escapeHtml(rest)}</span>
      </h4>
      <div class="note-meta">${formatDate(date)}</div>
    `;
    container.appendChild(el);
  });
}

// 触发模块一：DOM 树准备完毕后立即拉取随笔
document.addEventListener("DOMContentLoaded", loadNotes);


/**
 * ===================================================================
 * 模块二：WebGL 3D 场景 (视觉交互核心)
 * ===================================================================
 */

// 2.1 全局状态声明
let isLoaded = false; 
let mouseX = 0, mouseY = 0;
let animationId;
let textPlane; 

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // A. 基础环境初始化
  // -------------------------
  const loaderDiv = document.getElementById("canvas-loader");
  const canvas = document.getElementById("loader-canvas");
  const counterElement = document.querySelector(".loader-text span");
  
  if (!loaderDiv || !canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  scene.fog = new THREE.FogExp2(isDarkMode ? 0x000000 : 0xfdfdfb, 0.06);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 5); 
  camera.rotation.set(-0.15, -0.1, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  const material = new THREE.LineBasicMaterial({ 
    color: isDarkMode ? 0xffffff : 0x2c3e50, 
    transparent: true, 
    opacity: isDarkMode ? 0.25 : 0.15 
  });

  // -------------------------
  // B. 3D 资产构建区
  // -------------------------
  
  // [资产 1] 线框背景房间
  group.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(15, 10, 40, 6, 4, 15)), material));
  group.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(5, 5, 50, 2, 2, 20)), material));

  // [资产 2] 楼梯与扶手
  const stairsGroup = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const step = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(3, 0.3, 0.8)), material);
    step.position.set(-3, i * 0.3 - 2, -i * 0.8 + 2);
    stairsGroup.add(step);
  }
  const handrail = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.05, 0.05, 18 * 0.8)), material);
  handrail.position.set(-1.8, (18 * 0.3)/2 - 0.5, -(18 * 0.8)/2 + 2);
  handrail.rotation.x = Math.atan2(0.3, 0.8);
  stairsGroup.add(handrail);
  group.add(stairsGroup);

  // [资产 3] 街机
  const arcadeGroup = new THREE.Group();
  const sidePanelGeo = new THREE.BoxGeometry(0.05, 2.2, 1.3);
  for(let i=0; i<2; i++) {
    const p1 = new THREE.LineSegments(new THREE.WireframeGeometry(sidePanelGeo), material);
    p1.position.set(i === 0 ? -0.4 : 0.4, 0, 0);
    const p2 = new THREE.LineSegments(new THREE.WireframeGeometry(sidePanelGeo), material);
    p2.position.set(i === 0 ? -0.35 : 0.35, 0, 0);
    arcadeGroup.add(p1, p2);
  }
  const arcadeScreen = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.7, 0.55, 0.05)), material);
  arcadeScreen.position.set(0, 0.55, 0.1); 
  arcadeScreen.rotation.x = -0.3;
  const btnGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
  for(let r=0; r<2; r++) {
    for(let c=0; c<3; c++) {
      const btn = new THREE.LineSegments(new THREE.WireframeGeometry(btnGeo), material);
      btn.position.set(0.1 + c*0.1, 0.22, 0.5 + r*0.1);
      arcadeGroup.add(btn);
    }
  }
  const coin = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.2, 0.3, 0.1)), material);
  coin.position.set(0, -0.2, 0.66);
  const marquee = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.75, 0.25, 0.5)), material);
  marquee.position.set(0, 1.05, 0.35);
  const backGrid = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.7, 1.5, 0.1)), material);
  backGrid.position.set(0, 0, -0.6);
  arcadeGroup.add(arcadeScreen, marquee, backGrid, coin);
  arcadeGroup.position.set(-1.8, -1.0, -4.5); 
  group.add(arcadeGroup);

  // [资产 4] 投篮机
  const basketballGroup = new THREE.Group();
  basketballGroup.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(2.2, 4.2, 5.2, 2, 4, 6)), material));
  const sb1 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.5, 0.4, 0.1, 4, 3, 1)), material);
  sb1.position.set(-0.4, 1.6, -2.4);
  const sb2 = sb1.clone(); 
  sb2.position.set(0.4, 1.6, -2.4);
  const rim = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.TorusGeometry(0.3, 0.01, 10, 24)), material);
  rim.position.set(0, 0.4, -1.8); 
  rim.rotation.x = Math.PI/2;
  const net = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.CylinderGeometry(0.3, 0.1, 0.7, 16, 4)), material);
  net.position.set(0, 0.05, -1.8);
  const leftMesh = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.01, 3, 5, 1, 12, 12)), material);
  leftMesh.position.set(-1.1, 0.5, 0);
  const rightMesh = leftMesh.clone(); 
  rightMesh.position.set(1.1, 0.5, 0);
  const ramp = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(2.1, 0.05, 5, 1, 1, 10)), material);
  ramp.position.set(0, -0.6, 0); 
  ramp.rotation.x = 0.25; 
  basketballGroup.add(sb1, sb2, rim, net, leftMesh, rightMesh, ramp);
  basketballGroup.position.set(5.5, -0.5, -6); 
  basketballGroup.rotation.y = 5.5; 
  group.add(basketballGroup);

  // [资产 5] 沙发
  const sofaGroup = new THREE.Group();
  const cushionGeo = new THREE.BoxGeometry(0.8, 0.5, 1.4);
  for(let i=0; i<3; i++) {
    const c = new THREE.LineSegments(new THREE.WireframeGeometry(cushionGeo), material);
    c.position.x = (i - 1) * 1.15;
    const b = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(1.1, 0.9, 0.3)), material);
    b.position.set((i - 1) * 1.15, 0.6, -0.6); 
    b.rotation.x = -0.15;
    sofaGroup.add(c, b);
  }
  const baseFrame = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(3.6, 0.1, 1.2)), material);
  baseFrame.position.y = -0.3;
  const arm = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(0.2, 0.7, 1.5)), material);
  const lArm = arm.clone(); lArm.position.set(-1.8, 0.3, 0);
  const rArm = arm.clone(); rArm.position.set(1.8, 0.3, 0);
  sofaGroup.add(baseFrame, lArm, rArm);
  sofaGroup.position.set(1, -0.8, -7); 
  sofaGroup.rotation.y = 0.4; 
  group.add(sofaGroup);

  // [资产 6] 3D 全息文字
  if (typeof THREE.TextGeometry !== 'undefined') {
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
      const tGeo = new THREE.TextGeometry("PONDERING.", { font: font, size: 0.7, height: 0.2, curveSegments: 4 });
      tGeo.center(); 
      textPlane = new THREE.LineSegments(new THREE.WireframeGeometry(tGeo), material);
      
      // 注意：这里的坐标是你之前可能调整过的，若需微调请改此处
      textPlane.position.set(1, -2, -3); 
      textPlane.rotation.y = 0.3; 
      
      group.add(textPlane);
    });
  }

  // [资产 7] 氛围粒子系统
  const pCount = 3000;
  const pPos = new Float32Array(pCount * 3);
  for(let i = 0; i < 9000; i++) pPos[i] = (Math.random() - 0.5) * 40;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 })));

  // -------------------------
  // C. 交互、动画与事件监听
  // -------------------------
  
  // C.1 鼠标移动视差侦听
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // C.2 核心渲染循环
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    
    if (!isLoaded) {
      // 加载时的前推视角
      camera.position.z -= 0.01; 
      if (camera.position.z < -2) camera.position.z = 10;
    } else {
      // 加载完成后的平滑归位 (这里的 2.5 是之前调高的相机高度)
      camera.position.z += (2 - camera.position.z) * 0.03;
      camera.position.y += (1 - camera.position.y) * 0.03;
    }
    
    // 跟随鼠标微动
    group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05;
    group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.05;
    
    renderer.render(scene, camera);
  };
  animate();

  // C.3 窗口尺寸自适应
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // -------------------------
  // D. 虚拟加载进度控制
  // -------------------------
  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 2) + 1;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      isLoaded = true;
      
      // 进度满后，平滑隐藏黑色遮罩，使 3D 场景沉入背景
      setTimeout(() => {
        const ft = document.querySelector(".loader-text");
        if (ft) ft.style.opacity = '0';
        
        loaderDiv.style.transition = 'background-color 2.5s ease';
        loaderDiv.style.backgroundColor = 'transparent'; 
        loaderDiv.style.zIndex = '-1'; 
        loaderDiv.style.pointerEvents = 'none'; 
      }, 400);
    }
    counterElement.textContent = count < 10 ? "0" + count : count;
  }, 60);
});