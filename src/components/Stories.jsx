import { Avatar, Box, Skeleton, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllStories } from '../services/storiesService';
import Story from './Story';

const Stories = () => {
    const theme = useTheme()
    const [allStories,setAllStories] = useState([]);
    const [loading,setLoading] = useState(true);
    const [open,setOpen] = useState(false);
    const [story,setStory] = useState({});
    useEffect(()=>{
        getAllStories(setAllStories,setLoading)
    },[])
    const triggerViewStory=(story,index)=>{
        setOpen(true)
        setStory(story)
        const tempAllStories = [...allStories];
        const selectedStory = tempAllStories[index];
        selectedStory['isViewed'] = true
        setAllStories(tempAllStories)
    }   
    
    if(!allStories?.length && !loading){
        return <></>
    }
  return (
    <Box sx={{px:5,pt:1.5}}>
        {
          loading && <Skeleton
                variant="text"
                height={20}
                width={'95%'}
              />
            
        }
      {
        !loading && allStories.length && <Box sx={{display:'flex',alignItems:'center',gap:1,width:'100%',overflowX:'auto',"&::-webkit-scrollbar": {
            width: 2,
            height:2
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette?.otherColor?.main
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: 'darkgray',
            borderRadius: 2
          },pb:2}}>
            {
                allStories.map((story,index)=>(
                    <Box key={index} >
                        <Avatar src={story.creatorProfileImageUrl} sx={{border:`3px solid ${story.isViewed ? theme.palette.otherColor.main:theme.palette.primary.main}`,cursor:'pointer',width:{xs:50,sm:60},height:{xs:50,sm:60}}} onClick ={()=>triggerViewStory(story,index)}>
                            {story?.creatorName && story?.creatorName[0]?.toUpperCase()}
                        </Avatar>
                        <Typography sx={{ fontWeight: 500, fontSize: 'x-small',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                            {story?.creatorName}
                        </Typography>
                    </Box>
                ))
            }
        </Box>
      }
      <Story open={open} onClose={()=>setOpen(false)} story={story} />
    </Box>
  )
}

export default Stories
