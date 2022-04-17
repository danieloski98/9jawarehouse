import { queryClient } from "../../App";
import { IReturnObject } from "../../types/ServerReturnType";
import { url } from "../../utils/url";

export default async function getRecords () {
    const request = await fetch(`${url}/user/images/records`);
    const json = await request.json() as IReturnObject;

    if (!request.ok) {
        throw new Error('An Error Occured');
    }
    return json;
}

export async function approveRecord(id: string, setLoading: Function) {
    setLoading(true);
    const request = await fetch(`${url}/user/records/${id}`, {
        method: 'put',
    });
    const json = await request.json() as IReturnObject;
    queryClient.invalidateQueries();
    setLoading(false);
    return json;
}

export async function deleteRecord(id: string, setLoading: Function) {
    setLoading(true);
    const request = await fetch(`${url}/user/records/${id}`, {
        method: 'delete',
    });
    const json = await request.json() as IReturnObject;
    queryClient.invalidateQueries();
    setLoading(false);
    return json;
}