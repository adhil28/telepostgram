import { Box, Fab, Grid, } from '@mui/material'
import React from 'react'
import { MessageInterface } from '../../Helpers/interfaces'
import AppBar from './AppBar/AppBar'
import ImageMessageLayout from './MessageLayouts/ImageMessageLayout'
import TextMessageLayout from './MessageLayouts/TextMessageLayout'
import VideoMessageLayout from './MessageLayouts/VideoMessageLayout'
import configs from "../../Helpers/Global"
import AddIcon from '@mui/icons-material/Add';
import AddPostDialogue from './AddPostDialogue/AddPostDialogue'
import { Api } from 'telegram'

function Home() {

  const [messages, setMessages] = React.useState<any[]>([])
  const [openAddPost, setOpenAddPost] = React.useState(false)
  let telegram = configs.telegram



  const post = async (data: {}) => {
    if (telegram != null) {
      await telegram.addPost(data)
      setOpenAddPost(false)
    }
  }
  React.useEffect(() => {
    if (telegram != null) {
      telegram.getPosts().then((posts) => {
        if (posts != undefined) {
          setMessages(posts)
        }
      })
    }
  }, [])



  return (
    <div>

      <AddPostDialogue open={openAddPost} onCancelButtonClicked={() => setOpenAddPost(false)} onPostButtonClicked={post} />
      <Box sx={{ '& > :not(style)': { m: 1 }, float: 'right', position: 'fixed', marginTop: `${window.innerHeight - 80}px`, marginLeft: `${window.innerWidth - 80}px` }}>
        <Fab color="primary" aria-label="add" onClick={() => {
          setOpenAddPost(true)
        }}>
          <AddIcon />
        </Fab>
      </Box>
      <div>
        <AppBar />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          rowSpacing={1}
          style={{ marginBottom: '20px', marginTop: '10px' }}
        >
          {
            messages.map((m, i) => {
              if (m.message.post.type === 'img') {
                return (
                  <Grid key={i} item xs={12} style={{ width: '500px', maxWidth: `${(window.innerWidth - 40)}px` }}>
                    <ImageMessageLayout configs={m} />
                  </Grid>
                )
              } else if (m.message.post.type === 'vid') {
                return (
                  <Grid key={i} item xs={12} style={{ width: '500px' }}>
                    <VideoMessageLayout configs={m} />
                  </Grid>
                )
              } else if (m.message.post.type == 'txt') {
                return (
                  <Grid key={i} item xs={12} style={{ width: '500px' }}>
                    <TextMessageLayout configs={m} />
                  </Grid>
                )
              }
            })
          }

        </Grid>
      </div>

    </div >
  )
}

export default Home