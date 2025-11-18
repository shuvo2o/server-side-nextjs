import { data } from './data';
export async function GET(request: Request) {
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
}
// Post request
export async function POST(request: Request) {
    const userData = await request.json();
    const newUser ={ id: data.length + 1, ...userData};
    data.push(newUser);
    return new Response(JSON.stringify(newUser), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
    });
}
