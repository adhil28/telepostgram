let imgDescId = 'desc_img', imgShortDescId = 'sht_desc_img';
let textMessageId = 'msg_text';
let vidDescId = 'desc_vid', vidShortDescId = 'sht_desc_vid';

export const Validate = (selected, media) => {
    if (selected == 'img') {
        let data = {
            selected: selected,
            expanded_description: document.getElementById(imgDescId).value,
            description: document.getElementById(imgShortDescId).value,
            media: media,
            type: selected
        }
        return data
    } else if (selected == 'txt') {
        let data = {
            selected: selected,
            message: document.getElementById(textMessageId).value,
            type: selected
        }
        return data
    } else {
        let data = {
            selected: selected,
            expanded_description: document.getElementById(vidDescId).value,
            description: document.getElementById(vidShortDescId).value,
            media: media,
            type: selected
        }
        return data
    }
}