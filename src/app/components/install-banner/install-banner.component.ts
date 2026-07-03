import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

const DISMISS_KEY = 'arflix.appBannerDismissed';
const AUTO_HIDE_MS = 15000;

function buildAppDeepLink(base: string, path: string): string {
  const trimmed = (base || '').trim();
  if (trimmed.endsWith('://') || trimmed.endsWith('/')) {
    return `${trimmed}${path}`;
  }
  return `${trimmed}/${path}`;
}

@Component({
  selector: 'app-install-banner',
  template: `
    <div
      class="ar-app-banner"
      role="region"
      aria-label="Open in the ARFlix Android app"
      *ngIf="visible"
    >
      <div class="ar-app-banner__text">
        <strong>Open in the ARFlix app</strong>
        <span>Get a faster experience on Android.</span>
      </div>
      <div class="ar-app-banner__actions">
        <button type="button" class="ar-app-banner__open" (click)="openApp()">Open</button>
        <button
          type="button"
          class="ar-app-banner__close"
          aria-label="Dismiss app suggestion"
          (click)="dismiss()"
        >
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .ar-app-banner {
        position: fixed;
        bottom: calc(1rem + env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        width: min(32rem, calc(100vw - 1.5rem));
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.7rem 0.85rem;
        background: #212121;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 0.6rem;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
        z-index: 1200;
        animation: arAppBannerIn 0.28s ease;
      }
      .ar-app-banner__text {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        flex: 1;
        min-width: 0;
      }
      .ar-app-banner__text strong {
        font-size: 0.95rem;
        font-weight: 700;
      }
      .ar-app-banner__text span {
        font-size: 0.8rem;
        color: #999;
      }
      .ar-app-banner__actions {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        flex: 0 0 auto;
      }
      .ar-app-banner__open {
        min-height: 44px;
        padding: 0.5rem 1.1rem;
        border: none;
        border-radius: 0.45rem;
        background: #81c784;
        color: #141414;
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
      }
      .ar-app-banner__open:hover {
        filter: brightness(1.05);
      }
      .ar-app-banner__close {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 0.45rem;
        background: transparent;
        color: #ccc;
        cursor: pointer;
      }
      .ar-app-banner__close .material-icons {
        font-size: 20px;
      }
      .ar-app-banner__open:focus-visible,
      .ar-app-banner__close:focus-visible {
        outline: 3px solid #81c784;
        outline-offset: 2px;
      }
      @keyframes arAppBannerIn {
        from {
          transform: translateX(-50%) translateY(18px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class InstallBannerComponent implements OnInit, OnDestroy {
  visible = false;

  private readonly deepLink = buildAppDeepLink(environment.androidDeepLinkBaseUrl, 'home');
  private timerId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!this.shouldShow()) {
      return;
    }
    this.visible = true;
    this.timerId = setTimeout(() => this.hide(), AUTO_HIDE_MS);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  openApp(): void {
    this.dismiss();
    window.location.href = this.deepLink;
  }

  dismiss(): void {
    this.hide();
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Session storage can be unavailable in restricted browser contexts.
    }
  }

  private hide(): void {
    this.visible = false;
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private shouldShow(): boolean {
    if (!/android/i.test(navigator.userAgent || '')) {
      return false;
    }
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') {
        return false;
      }
    } catch {
      // Treat storage failures as "not dismissed".
    }
    return true;
  }
}
