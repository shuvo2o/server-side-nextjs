import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

    const token = request.cookies.get('token');
    console.log(token);
    const cookiStore = await cookies();
    const abc=cookiStore.set("abc","abc");
    const abcToken = cookiStore.get("abc");
    console.log(abc)
      return new Response("User Profile API is running.......",
    {
    headers: {
      "Content-Type": "text/plain",
      "Set-Cookie": `token=123456789`
    },
  });
}
