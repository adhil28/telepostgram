import { getItem } from "./StorageHandler"

export const isSignedIn = async (): Promise<string | null> => {
    let signedIn = await getItem('token');
    return signedIn
}