import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { Add as AddIcon, Image } from '@mui/icons-material';
import { Box } from '@mui/system';
import {
  CURRENT_USER_IMAGE,
  CURRENT_USER_NAME,
  CURRENT_USER_LOCATION,
  MONTHS,
} from '../constants/appConstants';
import { createPost } from '../services/postServices';

const SytledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
});

const Add = ({ setAllPosts }) => {
  const fileRef = useRef();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [description, setDescription] = useState('');
  const handleFileChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
    setSelectedImageUrl(url);
  };
  const createNewPost = async () => {
    if (!selectedImage) {
      setError(true);
      return undefined;
    }
    const newPostDetails = {
      creatorProfileImageUrl: CURRENT_USER_IMAGE,
      creatorName: CURRENT_USER_NAME,
      location: CURRENT_USER_LOCATION,
      createdAt: `${
        MONTHS[new Date().getMonth()]
      } ${new Date().getDate()}, ${new Date().getFullYear()}`,
      postImageUrl: selectedImageUrl,
      postDescription: description,
      likes: 0,
      comments: [],
      isFavourite: false,
    };
    createPost(newPostDetails, setLoading, setError, setAllPosts, setOpen);
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Post"
        sx={{
          position: 'fixed',
          bottom: 20,
          left: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <Box
          width={400}
          height={280}
          bgcolor={'background.default'}
          color={'text.primary'}
          p={3}
          borderRadius={5}
        >
          <Typography
            variant="h6"
            color="gray"
            textAlign="center"
          >
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src={CURRENT_USER_IMAGE}
              sx={{ width: 30, height: 30 }}
            />
            <Typography
              fontWeight={500}
              variant="span"
            >
              {CURRENT_USER_NAME}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: '100%' }}
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Stack
            direction="row"
            gap={1}
            mt={2}
            mb={3}
            alignItems={'center'}
          >
            <input
              type={'file'}
              ref={fileRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept={'.png,.jpeg'}
            />
            <Tooltip title={'choose Image'}>
              <Image
                color="secondary"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (fileRef.current) {
                    fileRef.current.click();
                  }
                }}
              />
            </Tooltip>
            {selectedImage && (
              <Box
                component={'small'}
                color={'text.secondary'}
              >
                {selectedImage?.name}
              </Box>
            )}
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
          >
            <Button onClick={createNewPost} disabled={!selectedImageUrl || !description}>Post</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
