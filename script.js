/**
 * CODORNAS ANDRADE — Carrinho + WhatsApp
 * Compatível com GitHub Pages
 *
 * EDITAR PREÇOS:
 * No index.html, em cada .product:
 *   data-price="18.00"  →  valor com ponto
 *   <span class="price-value">18,00</span>  →  texto exibido
 */

(function () {
  'use strict';

  var WHATSAPP = '554299034372';
  var KEY = 'codornas_andrade_cart';
  var cart = load();

  var cartCount = document.getElementById('cart-count');
  var cartItems = document.getElementById('cart-items');
  var cartSummary = document.getElementById('cart-summary');
  var cartTotal = document.getElementById('cart-total');
  var btnWa = document.getElementById('btn-whatsapp');
  var toastEl = document.getElementById('toast');
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav');
  var header = document.getElementById('header');
  var yearEl = document.getElementById('year');

  function load() {
    try {
      var d = localStorage.getItem(KEY);
      return d ? JSON.parse(d) : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(cart));
  }

  function money(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function total() {
    return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    void toastEl.offsetWidth;
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      toastEl.classList.remove('show');
      setTimeout(function () { toastEl.hidden = true; }, 350);
    }, 2600);
  }

  function render() {
    var n = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    cartCount.textContent = n;

    if (!cart.length) {
      cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio. Adicione produtos acima.</p>';
      cartSummary.hidden = true;
      return;
    }

    cartSummary.hidden = false;
    var html = '';
    cart.forEach(function (item) {
      html +=
        '<div class="cart-item" data-id="' + item.id + '">' +
          '<div>' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-meta">' + money(item.price) + ' cada</div>' +
          '</div>' +
          '<div class="cart-item-ctrls">' +
            '<button type="button" class="qty-btn cart-minus" aria-label="Diminuir">−</button>' +
            '<span class="cart-item-qty">' + item.qty + '</span>' +
            '<button type="button" class="qty-btn cart-plus" aria-label="Aumentar">+</button>' +
            '<button type="button" class="btn-remove" aria-label="Remover">✕</button>' +
          '</div>' +
          '<div class="cart-item-sub">' + money(item.price * item.qty) + '</div>' +
        '</div>';
    });
    cartItems.innerHTML = html;
    cartTotal.textContent = money(total());
  }

  function add(id, name, price, qty) {
    var found = cart.find(function (i) { return i.id === id; });
    if (found) found.qty += qty;
    else cart.push({ id: id, name: name, price: price, qty: qty });
    save();
    render();
  }

  function changeQty(id, delta) {
    var item = cart.find(function (i) { return i.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty < 1) cart = cart.filter(function (i) { return i.id !== id; });
    save();
    render();
  }

  function remove(id) {
    cart = cart.filter(function (i) { return i.id !== id; });
    save();
    render();
    toast('Produto removido');
  }

  function openWhatsApp() {
    if (!cart.length) {
      toast('Adicione produtos ao carrinho primeiro');
      return;
    }
    var msg = 'Olá! Gostaria de fazer um pedido na *Codornas Andrade*:\n\n';
    cart.forEach(function (item) {
      msg +=
        '• *' + item.name + '*\n' +
        '  Quantidade: ' + item.qty + '\n' +
        '  Valor unitário: ' + money(item.price) + '\n' +
        '  Subtotal: ' + money(item.price * item.qty) + '\n\n';
    });
    msg += '*Total do pedido: ' + money(total()) + '*\n\n';
    msg += 'Por favor, confirme o pedido e me informe sobre a entrega/retirada. Obrigado!';
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
  }

  function initProducts() {
    document.querySelectorAll('.product').forEach(function (card) {
      var minus = card.querySelector('.qty-minus');
      var plus = card.querySelector('.qty-plus');
      var input = card.querySelector('.qty-input');
      var btn = card.querySelector('.btn-add');

      minus.addEventListener('click', function () {
        var v = parseInt(input.value, 10) || 1;
        if (v > 1) input.value = v - 1;
      });

      plus.addEventListener('click', function () {
        var v = parseInt(input.value, 10) || 1;
        if (v < 99) input.value = v + 1;
      });

      input.addEventListener('change', function () {
        var v = parseInt(input.value, 10);
        if (isNaN(v) || v < 1) input.value = 1;
        if (v > 99) input.value = 99;
      });

      btn.addEventListener('click', function () {
        var id = card.getAttribute('data-id');
        var name = card.getAttribute('data-name');
        var price = parseFloat(card.getAttribute('data-price'));
        var qty = parseInt(input.value, 10) || 1;
        add(id, name, price, qty);
        input.value = 1;
        toast(name + ' adicionado!');
      });
    });
  }

  function initCart() {
    cartItems.addEventListener('click', function (e) {
      var row = e.target.closest('.cart-item');
      if (!row) return;
      var id = row.getAttribute('data-id');
      if (e.target.classList.contains('cart-minus')) changeQty(id, -1);
      else if (e.target.classList.contains('cart-plus')) changeQty(id, 1);
      else if (e.target.classList.contains('btn-remove')) remove(id);
    });
    btnWa.addEventListener('click', openWhatsApp);
  }

  function initMenu() {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initScroll() {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#') return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        var top = el.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 8;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    initProducts();
    initCart();
    initMenu();
    initScroll();
    render();
  });
})();