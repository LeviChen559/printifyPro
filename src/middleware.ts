import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Handle requests to .well-known/vercel/microfrontend-routing
    if (url.pathname === '/.well-known/vercel/microfrontend-routing') {
        return NextResponse.json({ 
            message: "Dynamic microfrontend routing", 
            status: "ok" 
        });
    }

    // For all other requests, continue as usual
    return NextResponse.next();
}