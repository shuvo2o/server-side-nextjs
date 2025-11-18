import { NextResponse, type NextRequest } from 'next/server';
import { data } from './data';

interface Address {
    city?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    address?: Address;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    
    let filterdUsers: User[] = [...data];

    const filterMapping: {
        [key: string]: (users: User[], value: string) => User[];
    } = {
        query: (users, value) =>
            users.filter(user =>
                user.name.toLowerCase().includes(value.toLowerCase())
            ),

        city: (users, value) =>
            users.filter(user =>
                user.address?.city?.toLowerCase().includes(value.toLowerCase())
            ),

        email: (users, value) =>
            users.filter(user =>
                user.email.toLowerCase() === value.toLowerCase()
            ),
    };

    for (const [key, value] of searchParams.entries()) {
        const keyLower = key.toLowerCase();
        if (filterMapping[keyLower]) {
            filterdUsers = filterMapping[keyLower](filterdUsers, value);
        }
    }

    return NextResponse.json(filterdUsers);
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
