import { Api, TelegramClient } from "telegram";
import { setImageBuffer, toBase64 } from "./Utils";

export class Downloder {
    medias: { m: Api.Message, imId: string }[] = []
    running: boolean = false
    client: TelegramClient;

    constructor(client: TelegramClient) {
        this.client = client
    }
    addData(data: { m: Api.Message, imId: string }) {
        this.medias.push(data)
        if (!this.running) {
            this.run()
            this.running = true
        }
    }
    private async run() {
        if (this.medias[0] != null) {
            let bData = await this.client.downloadMedia(this.medias[0].m, {})
            setImageBuffer(bData, this.medias[0].imId, this.medias[0].m.photo)
            this.medias.shift();
            this.run()
        } else {
            this.running = false
        }
    }
}