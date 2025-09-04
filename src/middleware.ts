import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('engsol.token')

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/dashboard', '/admin/status', '/admin/projeto/:path*'],
}
