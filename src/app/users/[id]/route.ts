import { data } from "../data";

export async function GET(_request: Request, { params }: {params: Promise<{ params: { id: string } }>}) {
  const { id } = await params;
  const user = data.find((user)=> user.id === parseInt(id));
  return Response.json(user);
}

// update user
export async function PATCH (request: Request, { params }: {params: Promise<{ params: { id: string } }>}) {
    const { id } = await params;
    const body = await request.json();
    const index = data.findIndex((user) => user.id === parseInt(id));
    if (index === -1) {
        return new Response("User not found", { status: 404 });
    }
    data[index] = { ...data[index], ...body };
    return Response.json(data[index]);
}    

// delete user
export async function DELETE (_request: Request, { params }: {params: Promise<{ params: { id: string } }>}) {
    const { id } = await params;
    const index = data.findIndex((user) => user.id === parseInt(id));

    const deletedUser = data[index];
    data.splice(index, 1);
    return Response.json({ message:"user Deleted", deletedUser }, { status: 200 });
}