/**
 * CODORNAS ANDRADE - Script do site de vendas
 * Carrinho funcional com localStorage + finalização via WhatsApp
 *
 * COMO EDITAR PREÇOS:
 * 1. No HTML (index.html), altere o atributo data-price="XX.XX" de cada .product-card
 * 2. Altere também o texto dentro de <span class="price-value">XX,XX</span>
 * Os preços usam ponto no data-price (ex: 18.00) e vírgula na exibição.
 */

(function () {
  'use strict';

  // ========== CONFIGURAÇÕES ==========
  const WHATSAPP_NUMBER = '554299034372'; // Número com código do país (Brasil = 55)
  const STORAGE_KEY = 'codornas_andrade_cart';

  // ========== ESTADO DO CARRINHO ==========
  let cart = loadCart();

  // ========== ELEMENTOS DO DOM ==========
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartSummaryEl = document.getElementById('cart-summary');
  const cartTotalEl = document.getElementById('cart-total');
  const btnWhatsapp = document.getElementById('btn-whatsapp');
  const toastEl = document.getElementById('toast');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const yearEl = document.getElementById('year');

  // ========== INICIALIZAÇÃO ==========
  function init() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupProductControls();
    setupCartButtons();
    setupMobileMenu();
    setupSmoothScroll();
    renderCart();
  }

  // ========== LOCAL STORAGE ==========
  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  // ========== CONTROLES DE QUANTIDADE NOS PRODUTOS ==========
  function setupProductControls() {
    document.querySelectorAll('.product-card').forEach(function (card) {
      const minusBtn = card.querySelector('.qty-minus');
      const plusBtn = card.querySelector('.qty-plus');
      const input = card.querySelector('.qty-input');
      const addBtn = card.querySelector('.btn-add-cart');

      minusBtn.addEventListener('click', function () {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
      });

      plusBtn.addEventListener('click', function () {
        let val = parseInt(input.value, 10) || 1;
        if (val < 99) input.value = val + 1;
      });

      input.addEventListener('change', function () {
        let val = parseInt(input.value, 10);
        if (isNaN(val) || val < 1) input.value = 1;
        if (val > 99) input.value = 99;
      });

      addBtn.addEventListener('click', function () {
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const qty = parseInt(input.value, 10) || 1;

        addToCart(id, name, price, qty);
        input.value = 1; // reseta quantidade após adicionar
        showToast(name + ' adicionado ao carrinho!');
      });
    });
  }

  // ========== CARRINHO ==========
  function addToCart(id, name, price, qty) {
    const existing = cart.find(function (item) {
      return item.id === id;
    });

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: id, name: name, price: price, qty: qty });
    }

    saveCart();
    renderCart();
  }

  function updateQty(id, delta) {
    const item = cart.find(function (i) {
      return i.id === id;
    });
    if (!item) return;

    item.qty += delta;
    if (item.qty < 1) {
      cart = cart.filter(function (i) {
        return i.id !== id;
      });
    }

    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(function (i) {
      return i.id !== id;
    });
    saveCart();
    renderCart();
    showToast('Produto removido.');
  }

  function getTotal() {
    return cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);
  }

  function formatMoney(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function renderCart() {
    // Atualiza contador do menu
    const totalItems = cart.reduce(function (sum, i) {
      return sum + i.qty;
    }, 0);
    cartCountEl.textContent = totalItems;

    if (cart.length === 0) {
      cartItemsEl.innerHTML =
        '<p class="cart-empty" id="cart-empty">Seu carrinho está vazio. Adicione produtos acima!</p>';
      cartSummaryEl.hidden = true;
      return;
    }

    cartSummaryEl.hidden = false;

    let html = '';
    cart.forEach(function (item) {
      const subtotal = item.price * item.qty;
      html +=
        '<div class="cart-item" data-id="' + item.id + '">' +
          '<div>' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-details">' + formatMoney(item.price) + ' cada</div>' +
          '</div>' +
          '<div class="cart-item-controls">' +
            '<button type="button" class="qty-btn cart-minus" aria-label="Diminuir">−</button>' +
            '<span class="cart-item-qty">' + item.qty + '</span>' +
            '<button type="button" class="qty-btn cart-plus" aria-label="Aumentar">+</button>' +
            '<button type="button" class="btn-remove" aria-label="Remover">✕</button>' +
          '</div>' +
          '<div class="cart-item-subtotal">' + formatMoney(subtotal) + '</div>' +
        '</div>';
    });

    cartItemsEl.innerHTML = html;
    cartTotalEl.textContent = formatMoney(getTotal());
  }

  function setupCartButtons() {
    // Delegação de eventos no container do carrinho
    cartItemsEl.addEventListener('click', function (e) {
      const itemEl = e.target.closest('.cart-item');
      if (!itemEl) return;
      const id = itemEl.dataset.id;

      if (e.target.classList.contains('cart-minus')) {
        updateQty(id, -1);
      } else if (e.target.classList.contains('cart-plus')) {
        updateQty(id, 1);
      } else if (e.target.classList.contains('btn-remove')) {
        removeFromCart(id);
      }
    });

    btnWhatsapp.addEventListener('click', function () {
      if (cart.length === 0) {
        showToast('Adicione produtos ao carrinho primeiro.');
        return;
      }
      openWhatsAppOrder();
    });
  }

  // ========== WHATSAPP ==========
  function openWhatsAppOrder() {
    let message = 'Olá! Gostaria de fazer um pedido na *Codornas Andrade*:\n\n';

    cart.forEach(function (item) {
      const subtotal = item.price * item.qty;
      message +=
        '• *' + item.name + '*\n' +
        '  Quantidade: ' + item.qty + '\n' +
        '  Valor unitário: ' + formatMoney(item.price) + '\n' +
        '  Subtotal: ' + formatMoney(subtotal) + '\n\n';
    });

    message +=
      '*Total do pedido: ' + formatMoney(getTotal()) + '*\n\n' +
      'Por favor, confirme o pedido e me informe sobre a entrega/retirada. Obrigado!';

    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  }

  // ========== MENU MOBILE ==========
  function setupMobileMenu() {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ========== SCROLL SUAVE (já tem no CSS, mas reforça offset do header) ==========
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header').offsetHeight;
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ========== TOAST ==========
  let toastTimeout;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    // força reflow
    void toastEl.offsetWidth;
    toastEl.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toastEl.classList.remove('show');
      setTimeout(function () {
        toastEl.hidden = true;
      }, 350);
    }, 2800);
  }

  // ========== INICIA ==========
  document.addEventListener('DOMContentLoaded', init);
})();
