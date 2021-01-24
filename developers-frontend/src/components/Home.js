import { Typography, Paper, Box } from '@material-ui/core'
import React from 'react'

const Home = () => {

  return (
    <Paper style={{ marginTop: 100 }} >
      <Box p={5}>
        <Typography variant="h2">Developers</Typography>
        <Typography variant="body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
      </Box>
    </Paper>
  )
}


export default Home