import config from "./Global";

export const getStringSession = (session) => {
    return session + ''
}
export const searchArray = (arr, { key, value }) => {
    for (let i = 0; i < arr.length; i++) {
        const o = arr[i];
        if (o[key] === value) {
            return arr[i]
        }
    }
}
export const findEntryMessage = (messages) => {
    for (let i = 0; i < messages.length; i++) {
        const m = messages[i];

        if (m.message === 'tgPost:entry') {
            return m
        }

    }
}

export function toBase64(arr) {
    arr = new Uint8Array(arr)
    return window.btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}
export const filterPosts = (messages, me) => {
    let returnData = []
    messages.forEach((m) => {
        if (m.message != null) {
            if (m.message.startsWith(`{"post":{"`)) {
                m.message = JSON.parse(m.message)
                m.message.sender = { name: me.firstName + me.lastName, userName: me.username, photo: me.photo }
                returnData.push(m)
            }
        }
    })
    return returnData
}
export const setImageBuffer = (buffer, id, photo) => {
    try {
        if (photo) {
            let src = `data:image/png;base64,${toBase64(buffer)}`
            document.getElementById(id).src = src;
        } else {
            let src = `data:video/mp4;base64,${toBase64(buffer)}`
            var video = document.getElementById((id));
            if (video.src != null) {
                video.src = src;
                if (video.load) {
                    video.load();
                    video.play();
                }
            }
        }
    } catch (e) {

    }
}