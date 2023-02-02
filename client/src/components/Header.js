import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'left', width: '100%'}}>
        <Typography sx={{p: 2, fontWeight: 'bold', fontSize: '30px', color: "white"}} poppins="true">PDF Viewer</Typography>
    </Box>
  )
}


export default Header