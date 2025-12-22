import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    // Your display logic here
    if (!this.notifications.length) return;

    await this.sleep(this.settings.firstDelay);

    for (let i = 0; i < this.notifications.length; i++) {
      this.display({notification: this.notifications[i]});

      await this.sleep(this.settings.displayDuration);

      await this.fadeOut();

      if (i < this.notifications.length - 1) {
        await this.sleep(this.settings.popsInterval);
      }
    }

    // while (true) {
    //   console.log(i);

    //   this.display({notification: this.notifications[i]});

    //   await this.sleep(this.settings.displayDuration);

    //   await this.fadeOut();

    //   await this.sleep(this.settings.popsInterval);

    //   i++;

    //   if (i >= this.notifications.length) {
    //     i = 0;
    //   }
    // }

    // // Sample display first one
    // await this.display({notification: notifications[0]});
  }

  // Xóa content trong #avada-salepop
  async fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    console.log(container);

    if (!container) return;

    container.classList.remove('is-visible');

    // đợi animation slide out
    await this.sleep(this.settings.displayDuration);
    render(null, container);
  }

  sleep(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} />, container);

    container.offsetHeight;

    container.classList.add('is-visible');

    if (this.settings.hideTimeAgo) {
      container.classList.add('hide-time-ago');
    }
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    popupEl.classList.add(`is-${this.settings.position}`);

    popupEl.style.transitionDuration = '0.5s';

    const targetEl = document.querySelector('body').firstChild;

    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
