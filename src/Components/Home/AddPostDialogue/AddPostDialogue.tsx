import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { toBase64 } from '../../../Helpers/Utils'
import { RoundTextFiled } from '../../SpecialComponents/RoundComponents'
import { getImage } from '../Utils'
import { Validate } from './DataValidator'
import TypeSelect from './TypeSelect'
interface Options {
    onDialogueClosed?: () => any,
    onCancelButtonClicked: () => any,
    onPostButtonClicked: (data: {}) => any,
    open: boolean
}
function AddPostDialogue(options: Options) {

    const [selectedType, setselectedType] = React.useState('txt')
    const [selectedMedia, setSelectedMedia] = React.useState('')
    const [selectedMediaSrc, setselectedMediaSrc] = React.useState('')

    return (
        <Dialog open={options.open} onClose={() => { if (options.onDialogueClosed) { options.onDialogueClosed() } }}>
            <DialogTitle>Post</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    You can make your post private or public. your posts are saved in your telegram channel "tgPosts"
                </DialogContentText>
                <br />
                <TypeSelect onSelected={(value) => {
                    setselectedType(value)
                }} />
                {selectedType === 'img' ?
                    <div className="img_prv">
                        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ width: '100%', minHeight: '100px', marginTop: '10px', textAlign: 'center' }} sx={{ border: 1, borderColor: 'grey.500', borderRadius: '16px' }}>
                            {selectedMedia == '' ?
                                <div>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                        onChange={(e) => {
                                            getImage(e.target.files).then((i) => {
                                                setSelectedMedia(i)
                                                let src = `data:image/png;base64,${toBase64(i)}`
                                                setselectedMediaSrc(src)
                                            })
                                        }}
                                    />
                                    <label style={{ width: '100%' }} htmlFor="raised-button-file">
                                        <Button style={{ width: '100%' }} component="span" >
                                            pick image
                                        </Button>
                                    </label>
                                </div>
                                : <img src={selectedMediaSrc} alt='prev' width={'100%'} style={{ borderRadius: '16px' }} />}
                        </Grid>
                        <RoundTextFiled id='sht_desc_img' fullWidth style={{ marginTop: '10px' }} label="short description" />
                        <RoundTextFiled id='desc_img' fullWidth style={{ marginTop: '10px' }} label="description" />
                    </div>
                    : selectedType === 'txt' ? <div className='txt_prv'>
                        <RoundTextFiled id='msg_text' fullWidth style={{ marginTop: '10px' }} multiline label="Message" />
                    </div>
                        :
                        <div className="vid_prv">
                            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ width: '100%', minHeight: '100px', marginTop: '10px', textAlign: 'center' }} sx={{ border: 1, borderColor: 'grey.500', borderRadius: '16px' }}>
                                {selectedMedia == '' ?
                                    <div>
                                        <input
                                            accept="video/*"
                                            style={{ display: 'none' }}
                                            id="raised-button-file"
                                            multiple
                                            type="file"
                                            onChange={(e) => {
                                                getImage(e.target.files).then((i) => {
                                                    setSelectedMedia(i)
                                                    let src = `data:video/mp4;base64,${toBase64(i)}`
                                                    setselectedMediaSrc(src)
                                                })
                                            }}
                                        />
                                        <label style={{ width: '100%' }} htmlFor="raised-button-file">
                                            <Button style={{ width: '100%' }} component="span" >
                                                pick video
                                            </Button>
                                        </label>
                                    </div>
                                    :
                                    <video autoPlay controls muted width={'100%'} style={{ borderRadius: '16px' }} >
                                        <source src={selectedMediaSrc}></source>
                                    </video>}
                            </Grid>
                            <RoundTextFiled id='sht_desc_vid' fullWidth style={{ marginTop: '10px' }} label="short description" />
                            <RoundTextFiled id='desc_vid' fullWidth style={{ marginTop: '10px' }} label="description" />
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => options.onCancelButtonClicked()}>Cancel</Button>
                <Button onClick={() => {
                    setSelectedMedia('')
                    let data = Validate(selectedType, selectedMedia)
                    options.onPostButtonClicked(data)
                }}>Post</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPostDialogue