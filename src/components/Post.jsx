import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  BookmarkBorder,
  Bookmark,
  CloseRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Link,
  Tooltip,
  Typography,
  styled,
  Modal,
  Stack,
} from '@mui/material';
import { useState } from 'react';
const SytledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '2rem 0',
});
const Post = ({ post, setAllPosts, uniqueIndex, allPosts }) => {
  const [isShowCommentsClicked, setIsShowCommentsClicked] = useState(false);
  const [selectedComents, setSelectedComents] = useState([]);
  const handleLike = (e) => {
    const isLiked = e.target.checked;
    const tempAllPosts = [...allPosts];
    tempAllPosts[uniqueIndex].likes = isLiked
      ? tempAllPosts[uniqueIndex].likes + 1
      : tempAllPosts[uniqueIndex].likes - 1;
    setAllPosts(tempAllPosts);
  };
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'red' }}
            src={post?.creatorProfileImageUrl}
          >
            {post?.creatorName && post?.creatorName[0]?.toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title={post?.creatorName}
        subheader={post?.location}
      />
      <CardMedia
        component="img"
        image={post?.postImageUrl}
        alt={post?.creatorName}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {post?.postDescription}
        </Typography>
        <Typography
          variant="span"
          sx={{ fontWeight: 500, marginTop: 0.5, display: 'block' }}
        >
          {post?.likes} likes
        </Typography>
        <Typography
          component={'small'}
          sx={{ marginTop: 0.5, display: 'block', fontSize: 'small' }}
        >
          {post?.createdAt}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <IconButton>
            <Tooltip title={'Like'}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                onChange={handleLike}
              />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={'share'}>
              <Share />
            </Tooltip>
          </IconButton>
          {post?.comments?.length > 0 ? (
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setSelectedComents(post?.comments);
                setIsShowCommentsClicked(true);
              }}
            >
              show All {post?.comments?.length} comments
            </Link>
          ) : null}
        </Box>
        <Box>
          <Tooltip title={'Add to Favourite'}>
            <Checkbox
              icon={<BookmarkBorder />}
              checkedIcon={<Bookmark sx={{ color: 'gold' }} />}
            />
          </Tooltip>
        </Box>
      </CardActions>
      <SytledModal
        open={isShowCommentsClicked}
        onClose={() => setIsShowCommentsClicked(false)}
      >
        <Box
          sx={{ width: { xs: '90vw', sm: '65vw', md: '40vw' } }}
          bgcolor={'background.default'}
          color={'text.primary'}
          px={3}
          py={1}
          borderRadius={5}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              All {selectedComents?.length} Comments
            </Typography>
            <CloseRounded
              onClick={() => setIsShowCommentsClicked(false)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
          {selectedComents?.map((c, i) => (
            <Box key={i}>
              <Stack
                direction={'row'}
                spacing={2}
              >
                <Avatar
                  src={c?.creatorProfileImageUrl}
                  sx={{ bgcolor: 'red', width: 30, height: 30 }}
                >
                  {c?.creatorName && c?.creatorName[0]?.toUpperCase()}
                </Avatar>
                <Stack>
                  <Typography sx={{ fontWeight: 600, fontSize: 'small' }}>
                    {c?.creatorName}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, opacity: 0.5, fontSize: 'x-small' }}
                  >
                    {c?.createdAt}
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pl: 2, fontSize: 'small', my: 1 }}
              >
                {c?.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      </SytledModal>
    </Card>
  );
};

export default Post;
