import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedPaths = ['/dashboard'];
const apiPrefix = '/api';
const publicAuthApiPaths = new Set([
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/request-otp',
    '/api/auth/verify-otp',
    '/api/auth/seed-admin',
]);

function getAdminEmails() {
    const raw = process.env.ADMIN_EMAILS || '';
    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

function getAdminOnlyGetPaths() {
    const raw = process.env.ADMIN_ONLY_GET_PATHS || '/api/messages';
    return raw
        .split(',')
        .map((path) => path.trim())
        .filter(Boolean);
}

function isProtectedPagePath(pathname: string) {
    return protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isAdminOnlyReadPath(pathname: string) {
    return getAdminOnlyGetPaths().some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isApiAdminRequired(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (!pathname.startsWith(apiPrefix)) return false;
    if (publicAuthApiPaths.has(pathname)) return false;
    if (pathname.includes('/seed')) {
        const seedKey = process.env.ADMIN_SEED_KEY || '';
        const providedKey = request.headers.get('x-seed-key') || '';
        if (seedKey && providedKey === seedKey) return false;
    }

    const method = request.method.toUpperCase();
    const isWriteMethod = method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS';
    if (isWriteMethod) return true;

    return isAdminOnlyReadPath(pathname);
}

function unauthorizedResponse(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith(apiPrefix)) {
        const res = NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
        res.cookies.set('session', '', { expires: new Date(0) });
        return res;
    }

    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const res = NextResponse.redirect(url);
    res.cookies.set('session', '', { expires: new Date(0) });
    return res;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = isProtectedPagePath(pathname) || isApiAdminRequired(request);
    if (!isProtected) return NextResponse.next();

    const token = request.cookies.get('session')?.value;
    if (!token) {
        return unauthorizedResponse(request);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return unauthorizedResponse(request);
    }

    try {
        const secretKey = new TextEncoder().encode(secret);
        const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });
        const email = typeof payload.email === 'string' ? payload.email.toLowerCase() : '';
        const role = typeof payload.role === 'string' ? payload.role : 'admin';

        if (!email) {
            return unauthorizedResponse(request);
        }

        if (role === 'admin') {
            const allowedAdmins = getAdminEmails();
            const isAllowedAdmin = allowedAdmins.length === 0 || allowedAdmins.includes(email);
            if (!isAllowedAdmin) {
                return unauthorizedResponse(request);
            }
        } else {
            const { pathname } = request.nextUrl;
            if (isProtectedPagePath(pathname)) {
                return unauthorizedResponse(request);
            }
        }

        return NextResponse.next();
    } catch {
        return unauthorizedResponse(request);
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'],
};
