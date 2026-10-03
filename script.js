/* ========================================
   Codornas Andrade - JavaScript
   Carrinho, avaliações, receitas, navegação
======================================== */

// ---------- Dados dos produtos ----------
const products = [
  {
    id: 1,
    name: 'Ovos de Codorna Frescos',
    description: 'Cartela com 30 ovos frescos, coletados diariamente. Ideais para consumo diário e receitas.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
    badge: 'Mais vendido'
  },
  {
    id: 2,
    name: 'Ovos de Codorna em Conserva',
    description: 'Pote com ovos de codorna em conserva, prontos para petiscos e saladas. Sabor suave e prático.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80',
    badge: null
  },
  {
    id: 3,
    name: 'Cartela Família (60 ovos)',
    description: 'Pacote com 60 ovos frescos. Economia para famílias e quem usa mais na cozinha.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=400&q=80',
    badge: 'Economia'
  },
  {
    id: 4,
    name: 'Kit Petisco (ovos + conserva)',
    description: 'Combinação de cartela de 30 ovos frescos + 1 pote de ovos em conserva. Perfeito para receber.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    badge: 'Kit'
  }
];

// ---------- Dados das receitas ----------
const recipes = [
  {
    id: 1,
    name: 'Salada com ovos de codorna',
    category: 'salada',
    time: '15 min',
    yield: '2–3 porções',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
    ingredients: [
      '10–12 ovos de codorna',
      'Folhas de alface ou rúcula a gosto',
      'Tomate-cereja cortado ao meio',
      'Azeitonas pretas (opcional)',
      'Azeite, vinagre ou molho de sua preferência',
      'Sal e pimenta a gosto'
    ],
    steps: [
      'Cozinhe os ovos de codorna em água fervente por 3 a 5 minutos.',
      'Retire e coloque em água fria para facilitar o descasque.',
      'Descasque os ovos com cuidado.',
      'Monte a salada com as folhas, tomate e azeitonas.',
      'Distribua os ovos por cima e regue com o molho. Sirva em seguida.'
    ]
  },
  {
    id: 2,
    name: 'Ovos de codorna em conserva',
    category: 'conserva',
    time: '30 min + repouso',
    yield: '1 pote',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&q=80',
    ingredients: [
      '20–30 ovos de codorna cozidos e descascados',
      '1 xícara de vinagre de álcool ou branco',
      '1 xícara de água',
      '1 colher de sopa de sal',
      '1 colher de chá de açúcar (opcional)',
      'Temperos: alho, louro, pimenta-do-reino, ervas a gosto'
    ],
    steps: [
      'Cozinhe e descasque os ovos de codorna.',
      'Em uma panela, ferva a água, o vinagre, o sal e o açúcar com os temperos por alguns minutos.',
      'Deixe o líquido esfriar um pouco.',
      'Coloque os ovos em um pote de vidro limpo e cubra com o líquido.',
      'Feche e leve à geladeira. Consuma após algumas horas ou no dia seguinte para melhor sabor.'
    ]
  },
  {
    id: 3,
    name: 'Espetinho de ovos de codorna',
    category: 'petisco',
    time: '20 min',
    yield: '8–10 espetinhos',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80',
    ingredients: [
      '20 ovos de codorna cozidos e descascados',
      'Tomate-cereja',
      'Cubos de queijo (muçarela ou minas)',
      'Folhas de manjericão (opcional)',
      'Azeite, sal e pimenta a gosto',
      'Palitos de madeira'
    ],
    steps: [
      'Cozinhe e descasque os ovos de codorna.',
      'Monte os espetinhos alternando ovo, tomate-cereja e queijo.',
      'Adicione uma folha de manjericão se desejar.',
      'Tempere com azeite, sal e pimenta. Sirva como petisco.'
    ]
  },
  {
    id: 4,
    name: 'Ovos de codorna enrolados no bacon',
    category: 'petisco',
    time: '25 min',
    yield: '15–20 unidades',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80',
    ingredients: [
      '20 ovos de codorna cozidos e descascados',
      'Fatias de bacon',
      'Palitos de dente',
      'Opcional: páprica ou ervas para finalizar'
    ],
    steps: [
      'Cozinhe e descasque os ovos.',
      'Enrole cada ovo com um pedaço de bacon e fixe com um palito.',
      'Leve ao forno pré-aquecido a 200 °C por cerca de 15 minutos, ou até o bacon dourar (pode usar airfryer).',
      'Retire, finalize com páprica se desejar e sirva quente.'
    ]
  },
  {
    id: 5,
    name: 'Canapés de ovos de codorna',
    category: 'petisco',
    time: '20 min',
    yield: '12–15 unidades',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80',
    ingredients: [
      '12–15 ovos de codorna cozidos e descascados',
      'Torradinhas ou fatias de pão',
      'Maionese ou cream cheese',
      'Folhas de rúcula ou alface',
      'Presunto ou peito de peru (opcional)',
      'Sal e pimenta a gosto'
    ],
    steps: [
      'Cozinhe e descasque os ovos. Corte-os ao meio se preferir.',
      'Espalhe maionese ou cream cheese sobre as torradinhas.',
      'Coloque uma folha de rúcula e, se quiser, uma fatia de presunto.',
      'Finalize com o ovo de codorna (inteiro ou pela metade). Tempere e sirva.'
    ]
  },
  {
    id: 6,
    name: 'Salada de ovos com abacate',
    category: 'salada',
    time: '15 min',
    yield: '2–3 porções',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
    ingredients: [
      '12 ovos de codorna',
      '1 abacate maduro',
      '1 tomate médio em cubos',
      'Azeite e suco de limão',
      'Sal e pimenta a gosto',
      'Cheiro-verde (opcional)'
    ],
    steps: [
      'Cozinhe e descasque os ovos de codorna.',
      'Corte o abacate e o tomate em cubos.',
      'Misture delicadamente com os ovos.',
      'Tempere com azeite, limão, sal e pimenta. Finalize com cheiro-verde e sirva.'
    ]
  }
];

// ---------- Estado ----------
let cart = JSON.parse(localStorage.getItem('codornas_cart')) || [];
let reviews = JSON.parse(localStorage.getItem('codornas_reviews')) || [];
let selectedStars = 0;

// ---------- Elementos DOM ----------
const productsGrid = document.getElementById('productsGrid');
const recipesGrid = document.getElementById('recipesGrid');
const reviewsGrid = document.getElementById('reviewsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const modalClose = document.getElementById('modalClose');
const checkoutForm = document.getElementById('checkoutForm');
const orderSummary = document.getElementById('orderSummary');
const toast = document.getElementById('toast');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const reviewForm = document.getElementById('reviewForm');
const starRating = document.getElementById('starRating');
const recipeModal = document.getElementById('recipeModal');
const recipeModalClose = document.getElementById('recipeModalClose');
const recipeModalTitle = document.getElementById('recipeModalTitle');
const recipeModalBody = document.getElementById('recipeModalBody');

// ---------- Utilitários ----------
function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function saveCart() {
  localStorage.setItem('codornas_cart', JSON.stringify(cart));
}

function saveReviews() {
  localStorage.setItem('codornas_reviews', JSON.stringify(reviews));
}

// ---------- Render produtos ----------
function renderProducts() {
  productsGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400/e8f0e4/3d6b2f?text=Ovos+de+Codorna'">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-qty">
          <label for="qty-${p.id}">Qtd:</label>
          <input type="number" id="qty-${p.id}" min="1" value="1" max="50">
        </div>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="btn-add" data-id="${p.id}">
            <i class="fas fa-cart-plus"></i> Adicionar
          </button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const qtyInput = document.getElementById(`qty-${id}`);
      const qty = parseInt(qtyInput.value) || 1;
      addToCart(id, qty);
      qtyInput.value = 1;
    });
  });
}

// ---------- Carrinho ----------
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: quantity
    });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.name} adicionado ao carrinho`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-basket" style="font-size:2.5rem;color:var(--green-pale);margin-bottom:12px;"></i>
        <p>Seu carrinho está vazio</p>
      </div>`;
    cartTotal.textContent = formatPrice(0);
    checkoutBtn.disabled = true;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70x70/e8f0e4/3d6b2f?text=Ovo'">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
          <button class="cart-item-remove" data-id="${item.id}" title="Remover">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  cartTotal.textContent = formatPrice(getCartTotal());
  checkoutBtn.disabled = false;

  // Eventos dos botões do carrinho
  cartItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const delta = btn.dataset.action === 'plus' ? 1 : -1;
      changeQty(id, delta);
    });
  });

  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.id));
    });
  });
}

function openCart() {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---------- Checkout ----------
function openCheckout() {
  if (cart.length === 0) return;
  orderSummary.innerHTML = cart.map(item =>
    `<p>${item.qty}x ${item.name} — ${formatPrice(item.price * item.qty)}</p>`
  ).join('') + `<p style="margin-top:8px;font-weight:600;">Total: ${formatPrice(getCartTotal())}</p>`;
  checkoutModal.classList.add('active');
  closeCart();
}

function closeCheckout() {
  checkoutModal.classList.remove('active');
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const notes = document.getElementById('orderNotes').value.trim();
  const contactPref = document.getElementById('contactPref').value;

  if (!name || !phone) {
    showToast('Preencha nome e telefone');
    return;
  }

  let message = `*Novo pedido - Codornas Andrade*%0A%0A`;
  message += `*Cliente:* ${name}%0A`;
  message += `*Telefone:* ${phone}%0A`;
  message += `*Forma de contato:* ${contactPref}%0A%0A`;
  message += `*Pedido:*%0A`;
  cart.forEach(item => {
    message += `• ${item.qty}x ${item.name} — ${formatPrice(item.price * item.qty)}%0A`;
  });
  message += `%0A*Total:* ${formatPrice(getCartTotal())}%0A`;
  if (notes) message += `%0A*Observações:* ${notes}%0A`;
  message += `%0A_Pedido enviado pelo site_`;

  const whatsappUrl = `https://wa.me/554299034372?text=${message}`;
  window.open(whatsappUrl, '_blank');

  // Limpa carrinho após envio
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  checkoutForm.reset();
  showToast('Pedido enviado! Abrindo WhatsApp...');
}

// ---------- Receitas ----------
function renderRecipes(filter = 'all') {
  const filtered = filter === 'all' ? recipes : recipes.filter(r => r.category === filter);
  recipesGrid.innerHTML = filtered.map(r => `
    <article class="recipe-card" data-id="${r.id}">
      <div class="recipe-img">
        <img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/500x300/e8f0e4/3d6b2f?text=Receita'">
      </div>
      <div class="recipe-body">
        <span class="recipe-cat">${r.category === 'salada' ? 'Salada' : r.category === 'petisco' ? 'Petisco' : 'Conserva'}</span>
        <h3>${r.name}</h3>
        <div class="recipe-meta">
          <span><i class="far fa-clock"></i> ${r.time}</span>
          <span><i class="fas fa-utensils"></i> ${r.yield}</span>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => openRecipeModal(parseInt(card.dataset.id)));
  });
}

function openRecipeModal(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  recipeModalTitle.textContent = recipe.name;
  recipeModalBody.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/500x300/e8f0e4/3d6b2f?text=Receita'">
    <div class="recipe-modal-meta">
      <span><i class="far fa-clock"></i> ${recipe.time}</span>
      <span><i class="fas fa-utensils"></i> ${recipe.yield}</span>
    </div>
    <h4>Ingredientes</h4>
    <ul>
      ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
    </ul>
    <h4>Modo de preparo</h4>
    <ol>
      ${recipe.steps.map(s => `<li>${s}</li>`).join('')}
    </ol>
  `;
  recipeModal.classList.add('active');
}

function closeRecipeModal() {
  recipeModal.classList.remove('active');
}

// Filtros de receita
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderRecipes(btn.dataset.filter);
  });
});

// ---------- Avaliações ----------
function renderReviews() {
  if (reviews.length === 0) {
    reviewsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:30px;color:var(--text-muted);">
        <p>Ainda não há avaliações. Seja o primeiro a avaliar!</p>
      </div>`;
  } else {
    reviewsGrid.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <span class="review-name">${escapeHtml(r.name)}</span>
          <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
        </div>
        <p class="review-comment">${escapeHtml(r.comment)}</p>
        <div class="review-date">${r.date}</div>
      </div>
    `).join('');
  }

  updateRatingSummary();
}

function updateRatingSummary() {
  const avgStarsEl = document.getElementById('avgStars');
  const avgTextEl = document.getElementById('avgText');

  if (reviews.length === 0) {
    avgStarsEl.innerHTML = '';
    avgTextEl.textContent = 'Ainda sem avaliações';
    return;
  }

  const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
  const full = Math.floor(avg);
  const half = avg - full >= 0.5;
  let starsHtml = '★'.repeat(full);
  if (half) starsHtml += '☆';
  starsHtml += '☆'.repeat(5 - full - (half ? 1 : 0));

  avgStarsEl.innerHTML = `<span style="color:var(--gold);">${starsHtml}</span>`;
  avgTextEl.textContent = `${avg.toFixed(1)} de 5 (${reviews.length} avaliação${reviews.length > 1 ? 'ões' : ''})`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Estrelas do formulário
starRating.querySelectorAll('i').forEach(star => {
  star.addEventListener('click', () => {
    selectedStars = parseInt(star.dataset.value);
    document.getElementById('reviewStars').value = selectedStars;
    starRating.querySelectorAll('i').forEach((s, i) => {
      if (i < selectedStars) {
        s.classList.remove('far');
        s.classList.add('fas', 'active');
      } else {
        s.classList.remove('fas', 'active');
        s.classList.add('far');
      }
    });
  });

  star.addEventListener('mouseenter', () => {
    const val = parseInt(star.dataset.value);
    starRating.querySelectorAll('i').forEach((s, i) => {
      if (i < val) s.style.color = 'var(--gold)';
      else s.style.color = '';
    });
  });
});

starRating.addEventListener('mouseleave', () => {
  starRating.querySelectorAll('i').forEach((s, i) => {
    if (i < selectedStars) {
      s.style.color = 'var(--gold)';
    } else {
      s.style.color = '';
    }
  });
});

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('reviewName').value.trim();
  const phone = document.getElementById('reviewPhone').value.trim();
  const comment = document.getElementById('reviewComment').value.trim();
  const stars = selectedStars;

  if (!name || !comment || stars < 1) {
    showToast('Preencha nome, comentário e escolha as estrelas');
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

  reviews.unshift({
    name,
    phone: phone || null,
    comment,
    stars,
    date: dateStr
  });

  saveReviews();
  renderReviews();
  reviewForm.reset();
  selectedStars = 0;
  document.getElementById('reviewStars').value = 0;
  starRating.querySelectorAll('i').forEach(s => {
    s.classList.remove('fas', 'active');
    s.classList.add('far');
    s.style.color = '';
  });
  showToast('Avaliação enviada! Obrigado 💚');
});

// ---------- Navegação mobile ----------
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Header scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ---------- Event listeners gerais ----------
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', openCheckout);
modalClose.addEventListener('click', closeCheckout);
checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) closeCheckout();
});
checkoutForm.addEventListener('submit', submitOrder);
recipeModalClose.addEventListener('click', closeRecipeModal);
recipeModal.addEventListener('click', (e) => {
  if (e.target === recipeModal) closeRecipeModal();
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeCheckout();
    closeRecipeModal();
  }
});

// ---------- Inicialização ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderRecipes();
  renderReviews();
  updateCartUI();

  // Fallback de imagens hero se falhar
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    heroImg.onerror = function () {
      this.src = 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80';
      this.onerror = null;
    };
  }
});
