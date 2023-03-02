import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Rightbar from './components/Rightbar';
import { Box, createTheme, Divider, Drawer, Paper, Stack, ThemeProvider,Grid } from '@mui/material';
import Navbar from './components/Navbar';
import Add from './components/Add';
import { useEffect, useState } from 'react';

import { getAllPost } from './services/postServices';
import MobileSidebarHeader from './components/MobileSidebarHeader';
import MobileSidebarBody from './components/MobileSidebarBody';

function App() {
  const [mode, setMode] = useState('light');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const Theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1760a5',
        light: 'skyblue',
      },
      navbar:{
        main:'#fff'
      },
      secondary: {
        main: '#15c630',
      },
      otherColor: {
        main: '#ddd',
      },
    },
  });
  useEffect(() => {
    getAllPost(setAllPosts, setError, setLoading);
  }, []);
  const handleCloseDrawer=()=>{
    setOpenDrawer(false)
  }
  return (
    <ThemeProvider theme={Theme}>
      <Box
        bgcolor={'background.default'}
        color={'text.primary'}
        sx={{minHeight:'100vh'}}
      >
        <Navbar
          searchText={searchText}
          setSearchText={setSearchText}
          setOpenDrawer={setOpenDrawer}
        />
        {/* <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
        > */}
        <Grid container spacing={2}>
          <Sidebar
            setMode={setMode}
            mode={mode}
          />
          <Feed
            searchText={searchText}
            loading={loading}
            allPosts={allPosts}
            error={error}
            setAllPosts={setAllPosts}
          />
          <Rightbar />
          </Grid>
        {/* </Stack> */}
        <Add setAllPosts={setAllPosts} />
      </Box>
      {/* mobile sidebar */}
      <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor={'left'}>
        <Box sx={{width:'75vw',p:2,height:'100%'}}component={Paper} elevation={0}>
          <MobileSidebarHeader handleCloseDrawer={handleCloseDrawer}/>
          <Divider sx={{my:1}} />
          <MobileSidebarBody setMode={setMode}
            mode={mode} />
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

export default App;
