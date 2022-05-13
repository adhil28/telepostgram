import { TelegramClient, Api } from "telegram";
import { filterPosts, findEntryMessage, getStringSession, searchArray, toBase64 } from "./Utils";
import { signInEvents, TelegramInterface, MessageInterface } from "./interfaces";
import { save } from "./StorageHandler";
import { Buffer } from 'buffer';
import { Downloder } from "./MediaDownloadThread";

const { StringSession } = require("telegram/sessions");

export class Telegram {
    private apiId: number;
    private apiHash: string;
    private stringSession: string;
    private client: TelegramClient;
    private dbChannel?: string;

    constructor(config: TelegramInterface) {
        this.apiId = config.apiId
        this.apiHash = config.apiHash

        if (config.stringSession == null) { this.stringSession = "" }
        else { this.stringSession = config.stringSession }

        this.client = new TelegramClient(new StringSession(this.stringSession), this.apiId, this.apiHash, {});
    }
    private debug(msg: string) {
        console.log(new Date().toDateString() + msg)
    }
    async signIn(events: signInEvents) {
        return new Promise(async (resolve) => {
            await this.client.start({
                phoneNumber() {
                    return events.onInputPhoneNumber()
                },
                phoneCode(isCodeViaApp?) {
                    return events.onInputPhoneCode()
                },
                password(hint?) {
                    return events.onInputPassword()
                },
                onError(err) {
                    console.log(err.cause, err.message, err.name, err.stack);
                },
            })
            save('token', getStringSession(this.client.session.save()))
            resolve('done')
        })
    }
    getAccountDetails() {
        return this.client.getMe()
    }
    getApiIdAndHash() {
        return { apiId: this.apiId, apiHash: this.apiHash }
    }
    async getMe() {
        return JSON.parse(JSON.stringify((await this.client.getMe())))
    }
    async setUpDatabase() {
        if (!this.client.connected) {
            await this.client.connect()
        }
        //check database exist
        const dialogs = await this.client.getDialogs({});
        if (searchArray(dialogs, { key: 'name', value: 'tgPosts' }) === undefined) {
            //database not found. creatingg new one
            const result: Api.Updates = await this.client.invoke(
                new Api.channels.CreateChannel({
                    title: "tgPosts",
                    geoPoint: new Api.InputGeoPoint({
                        lat: 8.24,
                        long: 8.24,
                        accuracyRadius: 43,
                    }),
                    about: "Datas will be saved here",
                    address: "datas will be save here"
                })
            ) as Api.Updates;

            this.dbChannel = result.chats[0].id + ''
            await this.client.sendMessage(this.dbChannel, { message: "tgPost:entry" });

        } else {
            let channel = searchArray(dialogs, { key: 'name', value: 'tgPosts' })
            this.dbChannel = channel.id

            //check for "tgPost:entry" message found
            let message = findEntryMessage(await this.client.getMessages(this.dbChannel, { ids: [1, 2, 3, 4, 5] }))
            if (message !== undefined) {
                //configured
                return
            } else {
                if (this.dbChannel != null) {
                    await this.client.deleteMessages(this.dbChannel, [], { revoke: false });
                    await this.client.sendMessage(this.dbChannel, { message: "tgPost:entry" });
                }
            }

        }
    }

    async addPost(data: {}) {
        let postData = data as { selected: string, expanded_description: string, description: string, media: string, message: string }
        console.log(postData.media);

        if (this.dbChannel != null) {
            if (postData.selected === 'img' || postData.selected === 'vid') {
                let media = Buffer.from(postData.media)


                await this.client.sendFile(this.dbChannel, {
                    file: media,
                    caption: JSON.stringify({
                        post: {
                            description: postData.description,
                            expanded_description: postData.expanded_description,
                            type: postData.selected
                        }
                    })
                })
            } else {
                await this.client.sendMessage(this.dbChannel, {
                    message: JSON.stringify({
                        post: {
                            text: postData.message,
                            type: postData.selected
                        }
                    })
                })
            }
        }

    }
    async getPosts() {
        if (this.dbChannel != null) {
            let messages = await this.client.getMessages(this.dbChannel, {})
            let posts = filterPosts(messages, await this.client.getMe())
            return posts
        }
    }
    getClient() {
        return this.client
    }
    mediaDownloader?: Downloder;
    loadMedia(m: Api.Message, id: string) {
        if (this.mediaDownloader == null) {
            this.mediaDownloader = new Downloder(this.client)
            this.mediaDownloader.addData({ m: m, imId: id })
        } else {
            this.mediaDownloader.addData({ m: m, imId: id })
        }
    }
}
