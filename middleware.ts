import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

const requireAuth: string[] = ["/admin"];
export default withAuth(
  
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    if ( requireAuth.some(path => pathname.startsWith(path))) {
      const token = await getToken({ req, secret: process.env.SECRET });
      if (!token) {
        const url = new URL(`/api/auth/signin`, req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }else if(token.email !== process.env.ADMIN_EMAIL){
        return NextResponse.redirect("/");
      }
    } 
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return true
        //return token?.email === process.env.ADMIN_EMAIL
      }
    },
    secret: process.env.SECRET,
  }
)

//export const config = { matcher: ["/admin"] }