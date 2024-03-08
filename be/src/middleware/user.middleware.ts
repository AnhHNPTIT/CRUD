import * as httpContext from 'express-http-context';

export function getUserId() {
  return httpContext.get('userId');
}

export function getUserData(key?: string) {
  if (!key) {
    return httpContext.get('user');
  }
  return httpContext.get('user') ? httpContext.get('user')[key] : null;
}
