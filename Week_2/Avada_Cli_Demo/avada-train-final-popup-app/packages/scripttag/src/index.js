import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';
import CartStickyManager from './managers/CartStickyManager';

console.log('This is the script tag');

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const cartStickyManager = new CartStickyManager();
  const {notifications, settings, cartStickies, product} = await apiManager.getNotifications();
  console.log('hello', product);

  displayManager.initialize({notifications, settings});
  cartStickyManager.initialize({cartStickies, product});
})();
