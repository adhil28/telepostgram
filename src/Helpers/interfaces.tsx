import { Api } from "telegram"

export interface TelegramInterface {
    apiId: number,
    apiHash: string,
    stringSession?: string | null
}
export interface signInEvents {
    onInputPhoneNumber: () => Promise<string>,
    onInputPhoneCode: () => Promise<string>,
    onInputPassword: () => Promise<string>,
}
export interface MessageInterface {
    name: string,
    profile_photo?: string,
    date: string,
    media?: Api.Message,
    description?: string,
    expanded_description?: string,
    type: "vid" | "txt" | "img",
    key: string,
    text?: string
}