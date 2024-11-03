import Data from "../models/data"

// Note: Removed no-cors mode to allow the browser to accessing the response

export type PostData = Pick<Data, 'data'>;
export type PatchData = PostData;

export const getAll = async (): Promise<Data[]> => {
    const response =  await fetch(`http://127.0.01:3000/data`, {
        method: 'GET',
    });

    return (await response.json() as any[]).map((data: any) => {
        return {
            id: data._id,
            data: data.data,
            created: data.created,
            updatedAt: data.updatedAt
        }
    });
}

export const create = async (request: PostData): Promise<Data> => {
    const response = await fetch(`http://127.0.01:3000/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    const data = await response.json();

    return {
        id: data._id,
        data: data.data,
        created: data.created,
        updatedAt: data.updatedAt
    }
}

export const update = async (id: string, request: PatchData): Promise<Data> => {
    const response = await fetch(`http://127.0.01:3000/data/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    const data = await response.json();

    return {
        id: data._id,
        data: data.data,
        created: data.created,
        updatedAt: data.updatedAt
    }
}

export const remove = async (id: string): Promise<Response> => {
    return fetch(`http://127.0.01:3000/data/${id}`, {
        method: 'DELETE',
    });
}