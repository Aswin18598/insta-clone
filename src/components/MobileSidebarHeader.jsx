import { Box, Typography} from '@mui/material'
import React from 'react'
import {
    CloseRounded,Instagram
  } from '@mui/icons-material';

const MobileSidebarHeader = ({handleCloseDrawer}) => {
  return (
    <Box sx={{alignItems:'center',display:'flex',justifyContent:'space-between' }}>
    <Box sx={{alignItems:'center',gap:1,display:'flex',}}>
    <Instagram fontSize='large' />
    <Typography
      variant="h6"
    >
      Instagram
    </Typography>
    </Box>
    <Box><CloseRounded onClick={handleCloseDrawer} /></Box>
  </Box>
  )
}

export default MobileSidebarHeader
