import { Mail, Notifications, Instagram,MenuOutlined } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '60px',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme?.palette?.otherColor?.main : 'black',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
const Navbar = ({ searchText, setSearchText,setOpenDrawer }) => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" color={'navbar'} >
      <StyledToolbar>
        <Box sx={{alignItems:'center',gap:1,display: { xs: 'none', sm: 'flex' } }}>
          <Instagram fontSize='large' />
          <Typography
            variant="h6"
          >
            Instagram
          </Typography>
        </Box>
        <Box sx={{display:{xs:'block',sm:'none'}}}>
          <MenuOutlined fontSize='large' onClick={()=>setOpenDrawer(true)} />
        </Box>
        <Search>
          <InputBase
            placeholder="search by friends name..."
            sx={{ width: '100%' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Search>
        <Icons>
          <Badge
            badgeContent={4}
            color="error"
          >
            <Mail />
          </Badge>
          <Badge
            badgeContent={2}
            color="error"
          >
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">Steve</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
      
    </AppBar>
  );
};

export default Navbar;
