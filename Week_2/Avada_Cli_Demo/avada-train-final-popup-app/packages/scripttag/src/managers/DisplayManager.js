import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

const SESSION_KEY = 'avada_popup_index';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    if (this.settings.allowShow === 'all-pages') {
      if (this.isExcluded(this.settings.excludedUrls)) {
        return;
      }
    }

    if (this.settings.allowShow === 'specific-pages') {
      if (!this.isIncluded(this.settings.includedUrls)) {
        return;
      }
    }

    // Your display logic here
    if (!this.notifications.length) return;

    await this.sleep(this.settings.firstDelay);

    let index = 0;

    if (this.settings.continueAfterPageReload) {
      const savedIndex = Number(sessionStorage.getItem(SESSION_KEY));

      index = savedIndex;
    }

    while (true) {
      this.display({notification: this.notifications[index]});

      sessionStorage.setItem(SESSION_KEY, index);

      await this.sleep(this.settings.displayDuration);

      await this.fadeOut();

      index++;

      if (index >= this.notifications.length) {
        sessionStorage.removeItem(SESSION_KEY);

        if (this.settings.replayPlaylist) {
          index = 0;
        } else {
          break;
        }
      }
    }
  }

  async fadeOut() {
    const container = document.querySelector('#Avada-SalePop');

    if (!container) return;

    container.classList.remove('is-visible');

    await this.sleep(this.settings.popsInterval);

    render(null, container);
  }

  sleep(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  display({notification}) {
    const {
      backgroundColor,
      backgroundImage,
      actionColorStart,
      actionColorEnd,
      isGradient,
      hideBackgroundSelect,
      headingColor,
      textColor,
      timeColor
    } = this.settings;
    const container = document.querySelector('#Avada-SalePop');

    render(
      <NotificationPopup
        {...notification}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        actionColorStart={actionColorStart}
        actionColorEnd={actionColorEnd}
        isGradient={isGradient}
        hideBackgroundSelect={hideBackgroundSelect}
        headingColor={headingColor}
        textColor={textColor}
        timeColor={timeColor}
      />,
      container
    );

    container.offsetHeight;

    container.classList.add('is-visible');

    if (this.settings.truncateProductName) {
      container.classList.add('Avada-SP__Subtitle__Truncate');
    }

    if (this.settings.hideTimeAgo) {
      container.classList.add('Avada-SP__HideTimeAgo');
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

  isExcluded(urls) {
    const excludeList = this.mapStringToList(urls);
    if (excludeList.length === 0) return false;

    const currentUrl = window.location.href;

    return excludeList.some(url => {
      if (!url) return false;

      const normalizedUrl = url.trim();

      return currentUrl === normalizedUrl || currentUrl.startsWith(normalizedUrl);
    });
  }

  isIncluded(urls) {
    const includeList = this.mapStringToList(urls);

    if (includeList.length === 0) return true;

    const currentUrl = window.location.href;

    return includeList.some(url => {
      if (!url) return false;

      const normalizedUrl = url.trim();

      return currentUrl === normalizedUrl || currentUrl.startsWith(normalizedUrl);
    });
  }

  mapStringToList(urls) {
    if (!urls || typeof urls !== 'string') {
      return [];
    }

    return urls
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }
}
