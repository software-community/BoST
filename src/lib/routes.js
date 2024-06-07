
export const LOGIN = '/api/auth/signin';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/api/auth/signin',
    '/',
    '/products',
    '/api/auth/callback/google',
    '/api/auth/callback/github',
]

export const PROTECTED_SUB_ROUTES = [
    '/checkout',
]