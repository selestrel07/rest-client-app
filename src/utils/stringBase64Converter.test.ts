import { describe, it, expect } from 'vitest';
import { base64ToString, stringToBase64 } from './stringBase64Converter';

const text = 'http://localhost:8080';
const base64Text = 'aHR0cDovL2xvY2FsaG9zdDo4MDgw';

describe('Test stringBase64Converter functions', () => {
  it('Should encode string to base64 correctly', () => {
    expect(stringToBase64(text)).toBe(base64Text);
  });

  it('Should decode base64 to string correctly', () => {
    expect(base64ToString(base64Text)).toBe(text);
  });

  it('Should throw an error if not base64 string was provided', () => {
    expect(() => base64ToString('bad string')).toThrow();
  });

  it('Should return undefined for undefined', () => {
    expect(base64ToString(undefined)).toBe(undefined);
    expect(stringToBase64(undefined)).toBe(undefined);
  });
});
