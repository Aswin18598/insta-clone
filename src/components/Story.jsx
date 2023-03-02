import { Avatar, Box, Divider, Modal, Paper, styled, Typography, useTheme } from '@mui/material';
import React from 'react'
import {
    CloseRounded,
  } from '@mui/icons-material';

const Story = ({story,open,onClose,}) => {
    const SytledModal = styled(Modal)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      });
                                                                                                                                                
  return (
    <SytledModal open={open} onClose={onClose}>
        <Box component={Paper} sx={{width:{sx:'90vw',sm:'60vw',md:'30vw'},height:'90vh',display:'flex',flexDirection:'column',justifyContent:'space-between',p:2,border:'none',outline:'none'}}>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                    <Avatar src={story.creatorProfileImageUrl}>
                    {story?.creatorName && story?.creatorName[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 'small' }}>
                            {story?.creatorName}
                        </Typography>
                        <Typography
                            sx={{ fontWeight: 500, opacity: 0.5, fontSize: 'x-small' }}
                        >
                            {story?.createdAt}
                        </Typography>
                    </Box>
                </Box>
                <CloseRounded sx={{cursor:'pointer'}} onClick={onClose} />
            </Box>
            <Divider />
            <Box sx={{height:'calc( 100% - 50px)',width:'100%'}}>
                {
                    story?.stories?.map((s,i)=>(
                        <Box component={'img'} src={s?.url} alt={story?.creatorName}  sx={{width:'100%',height:'100%',objectFit:'cover'}} key={i} />
                    ))
                }
            </Box>
        </Box>
    </SytledModal>
  )
}

export default Story
