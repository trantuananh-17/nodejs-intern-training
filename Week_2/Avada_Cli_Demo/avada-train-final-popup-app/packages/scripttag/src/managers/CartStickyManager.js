import {render} from 'preact';
import StickyCartPreviewDesktop from '../components/StickyCartPreviewDesktop/StickyCartPreviewDesktop';
import {insertAfter} from '../helpers/insertHelpers';
import React from 'preact/compat';

export default class CartStickyManager {
  constructor() {
    this.cartStickies = {};
    this.product = {};
    this.variants = [];
    this.options = [];

    this.formValue = {};
  }

  async initialize({cartStickies, product}) {
    this.cartStickies = cartStickies;
    this.product = product;
    this.options = product?.options;
    this.variants = product?.variants;
    this.initResponsive();

    this.initFormVariant();

    if (!this.isProductPage()) return;

    this.insertContainer();

    this.display({
      product: this.product,
      cartStickies: this.cartStickies,
      options: this.options,
      isMobile: this.isMobile
    });

    this.addVisiable();

    this.addEventToggle();

    this.handleAddToCart();
  }

  initFormVariant() {
    if (!this.variants?.length) return;

    const firstVariant = this.variants[0];

    const optionsMap = {};
    firstVariant.selectedOptions.forEach(opt => {
      optionsMap[opt.name] = opt.value;
    });

    this.formValue = {
      variantId: firstVariant.id,
      title: firstVariant.title,
      selectedOptions: optionsMap,
      quantity: 1,
      stockQty: firstVariant.inventoryQuantity,
      price: Number(firstVariant.price),
      comparePrice: firstVariant.comparePrice ? Number(firstVariant.comparePrice) : null,
      isTracked: firstVariant.isTracked,
      inventoryPolicy: firstVariant.inventoryPolicy,
      availableForSale: firstVariant.availableForSale
    };
  }

  insertContainer() {
    const stickyCartEl = document.createElement('div');
    stickyCartEl.id = 'Avada-Sticky-ATC';
    stickyCartEl.className = 'Avada-Sticky-ATC__OuterWrapper';

    const targetEl = document.querySelector('body').firstChild;

    if (targetEl) {
      insertAfter(stickyCartEl, targetEl);
    }

    return stickyCartEl;
  }

  initResponsive() {
    const mq = window.matchMedia('(max-width: 768px)');

    this.isMobile = mq.matches;

    mq.addEventListener('change', e => {
      this.isMobile = e.matches;
      this.display({
        product: this.product,
        cartStickies: this.cartStickies,
        options: this.options,
        isMobile: this.isMobile
      });
    });
  }

  display({product, cartStickies, options, isMobile}) {
    const container = document.querySelector('#Avada-Sticky-ATC');

    render(
      <StickyCartPreviewDesktop
        stickyForm={cartStickies}
        product={product}
        options={options}
        isMobile={isMobile}
        formValue={this.formValue}
        onChangeQty={this.handleChangeQuantity.bind(this)}
        onSelectOption={this.handleSelectOption.bind(this)}
      />,
      container
    );
  }

  isProductPage() {
    return window?.meta?.page?.pageType === 'product';
  }

  addVisiable() {
    const sticky = document.querySelector('.Avada-StickyATC-ProductInfo');
    if (!sticky) return;

    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight || 0;

    document.documentElement.style.setProperty('--avada-header-height', `${headerHeight}px`);

    const triggerPoint = 150;
    let isVisible = false;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > triggerPoint && !isVisible) {
        sticky.classList.add('-visible');
        isVisible = true;
      }

      if (scrollTop <= triggerPoint && isVisible) {
        sticky.classList.remove('-visible');
        isVisible = false;
      }
    });
  }

  addEventToggle() {
    document.querySelector('.Avada-Offer__VariantPopupTrigger')?.addEventListener('click', () => {
      this.handleToggleVariantSelection();
    });

    document.querySelector('.Avada-VariantPopup--Close')?.addEventListener('click', () => {
      this.handleToggleVariantSelection();
    });

    document
      .querySelector('.Avada-ConfirmButton')
      ?.addEventListener('click', () => this.handleToggleVariantSelection());
  }

  handleSelectOption(optionName, value) {
    this.setFormValue({
      selectedOptions: {
        ...this.formValue.selectedOptions,
        [optionName]: value
      }
    });

    this.resolveVariantFromOptions();
  }

  resolveVariantFromOptions() {
    const selectedOptionsMap = this.formValue.selectedOptions;

    const matchedVariant = this.variants.find(variant =>
      variant.selectedOptions.every(opt => selectedOptionsMap[opt.name] === opt.value)
    );

    if (!matchedVariant) return;

    this.setFormValue({
      variantId: matchedVariant.id,
      title: matchedVariant.title,
      price: Number(matchedVariant.price),
      comparePrice: matchedVariant.comparePrice ? Number(matchedVariant.comparePrice) : null,
      stockQty: matchedVariant.inventoryQuantity,
      isTracked: matchedVariant.isTracked,
      inventoryPolicy: matchedVariant.inventoryPolicy,
      availableForSale: matchedVariant.availableForSale
    });
  }

  handleToggleVariantSelection() {
    const popup = document.querySelector('.Avada-VariantSelection__Container');
    if (!popup) return;

    popup.classList.toggle('hidden');
  }

  handleChangeQuantity(value) {
    this.setFormValue({quantity: Number(value)});
  }

  handleAddToCart() {
    const {quantity, variantId} = this.formValue;
    document.querySelector('.Avada-Offer__ButtonAddToCart').addEventListener('click', async () => {
      const addToCartBtn = document.querySelector('.Avada-Offer__ButtonAddToCart');
      try {
        this.setLoading(true, addToCartBtn);

        const cartQty = await this.getVariantQtyInCart(variantId);

        if (
          !this.canAddToCart({
            variant: this.formValue,
            cartQty,
            addQty: this.formValue.quantity
          })
        ) {
          return;
        }

        const result = await this.addToCart({
          variantId,
          quantity: quantity
        });

        if (result) {
          this.renderCart();
        }
      } catch (err) {
        console.error(err);
        alert('Không thêm được sản phẩm');
      } finally {
        this.setLoading(false, addToCartBtn);
      }
    });
  }

  async addToCart({variantId, quantity = 1}) {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: variantId,
        quantity
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.description || 'Hết hàng');
    }

    return data;
  }

  async renderCart() {
    const sticky = document.querySelector('.Avada-StickyATC-ProductInfo');

    sticky.innerHTML = `<div class="Avada-StickyATC-SuccessBanner">${this.cartStickies.successResponse}</div>`;

    const res = await fetch('/?sections=cart-drawer,cart-icon-bubble');
    const sections = await res.json();
    const parser = new DOMParser();

    const doc = parser.parseFromString(sections['cart-drawer'], 'text/html');

    const newItems = doc.querySelector('#CartDrawer-CartItems');

    const currentItems = document.querySelector('#CartDrawer-CartItems');

    if (newItems && currentItems) {
      currentItems.innerHTML = newItems.innerHTML;
    }

    const newFooter = doc.querySelector('.cart-drawer__footer');
    const currentFooter = document.querySelector('.cart-drawer__footer');

    if (newFooter && currentFooter) {
      currentFooter.innerHTML = newFooter.innerHTML;
    }

    const iconDoc = parser.parseFromString(sections['cart-icon-bubble'], 'text/html');

    const newSection = iconDoc.querySelector('#shopify-section-cart-icon-bubble');
    const currentSection = document.querySelector('#cart-icon-bubble');

    if (!newSection || !currentSection) return;

    currentSection.innerHTML = newSection.innerHTML;

    const drawer = document.querySelector('cart-drawer');

    if (drawer.classList.contains('is-empty')) {
      this.removeCartEmpty();
    }

    if (!drawer?.classList.contains('active')) {
      drawer?.open();
    }
  }

  removeCartEmpty() {
    document.querySelector('.drawer__inner-empty').remove();

    document.querySelector('cart-drawer-items').classList.remove('is-empty');

    document.querySelector('cart-drawer').classList.remove('is-empty');

    const btn = document.getElementById('CartDrawer-Checkout');
    btn.disabled = false;
  }

  async getVariantQtyInCart(variantId) {
    const res = await fetch('/cart.js');
    const cart = await res.json();

    const lineItem = cart.items.find(item => item.variant_id === variantId);

    return lineItem ? lineItem.quantity : 0;
  }

  canAddToCart({variant, cartQty, addQty}) {
    if (!variant.isTracked) {
      return false;
    }

    if (variant.inventoryPolicy === 'CONTINUE') {
      return false;
    }

    if (!variant.availableForSale) {
      return false;
    }

    if (cartQty + addQty > variant.inventoryQuantity) {
      return false;
    }

    return true;
  }

  setLoading(isLoading, button) {
    button.classList.toggle('loading', isLoading);
    button.disabled = isLoading;
  }

  setFormValue(value) {
    this.formValue = {
      ...this.formValue,
      ...value
    };

    this.display({
      product: this.product,
      cartStickies: this.cartStickies,
      options: this.options
    });
  }

  // mapSelectedOptionsToObject(selectedOptions = []) {
  //   return selectedOptions.reduce((acc, option) => {
  //     acc[option.name] = option.value;
  //     return acc;
  //   }, {});
  // }
}
