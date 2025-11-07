/**
 * Safe localStorage utilities that handle Safari incognito mode and other edge cases
 */

export function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to get localStorage item "${key}":`, error);
    return null;
  }
}

export function safeSetItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Failed to set localStorage item "${key}":`, error);
    return false;
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove localStorage item "${key}":`, error);
    return false;
  }
}

export function safeGetItemJSON<T>(key: string): T | null {
  try {
    const item = safeGetItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to parse JSON from localStorage item "${key}":`, error);
    return null;
  }
}

export function safeSetItemJSON(key: string, value: any): boolean {
  try {
    const jsonString = JSON.stringify(value);
    return safeSetItem(key, jsonString);
  } catch (error) {
    console.warn(`Failed to stringify JSON for localStorage item "${key}":`, error);
    return false;
  }
}

