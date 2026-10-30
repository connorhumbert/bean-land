import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const PREFIX = 'beanland:v1:';
const MAX_BEANS = 1_000_000;

export const isBeanCount = (value: unknown): value is number =>
  Number.isInteger(value) && (value as number) >= 0 && (value as number) <= MAX_BEANS;

/**
 * Tiny, defensive wrapper around localStorage.
 * - No-op on the server (SSR has no localStorage).
 * - Never throws: private mode, quota errors, or disabled storage fall back to defaults.
 * - Every value is validated on load, so corrupt or hand-edited data resets to the fallback.
 */
@Injectable({ providedIn: 'root' })
export class BeanStorage {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  load<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
    if (!this.isBrowser) return fallback;
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return fallback;
      const parsed: unknown = JSON.parse(raw);
      return isValid(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  save(key: string, value: unknown): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // Storage unavailable or full — beans just won't be remembered.
    }
  }

  clearAll(): void {
    if (!this.isBrowser) return;
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      // Nothing to clear.
    }
  }
}
