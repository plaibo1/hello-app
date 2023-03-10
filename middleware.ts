import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === 'default' && !(req.nextUrl.pathname.includes('/account'))) {
    return NextResponse.redirect(
      new URL(`/ru${req.nextUrl.pathname}`, req.url)
    );
  }
}