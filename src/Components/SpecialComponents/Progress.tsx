import { Dialog, CircularProgress, DialogContent, Box, } from '@mui/material'
import React from 'react'

interface Options {
    open: boolean
}
function Progress({ open }: Options) {
    return (
        <Dialog key={"Ad"} open={open} >
            <DialogContent style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Box textAlign='center'>
                    <CircularProgress />
                </Box>
            </DialogContent>
        </Dialog >
    )
}

export default Progress