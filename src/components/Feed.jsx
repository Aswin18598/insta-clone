import { Box, Stack, Skeleton, Typography, Grid } from '@mui/material';
import Post from './Post';
import Stories from './Stories';

const Feed = ({ loading, allPosts, error, setAllPosts, searchText }) => {
  if (!loading && error) {
    return (
      <Box
        sx={{
          flex: 4,
          height: 'calc(100vh - 65px)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginTop: '2rem' }}
        >
          Failed to load Posts
        </Typography>
      </Box>
    );
  }
  return (
    <Grid
      item
      xs={12} sm={9} md={6} lg={7} xl={7} 
      p={{ xs: 0, md: 2 }}
      component={'div'}
      id={'post_container'}
    >
      {loading ? (
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={2}
          >
            <Skeleton
              variant="circular"
              height={30}
              width={30}
            />
            <Skeleton
              variant="text"
              height={20}
              width={'95%'}
            />
          </Stack>
          <Skeleton
            variant="text"
            height={20}
          />
          <Skeleton
            variant="rectangular"
            height={300}
          />
          <Skeleton
            variant="text"
            height={30}
          />
        </Stack>
      ) : (
        <Box >
          <Stories />
          {allPosts
            ?.filter((p) =>
              p.creatorName?.toLowerCase().includes(searchText.toLowerCase())
            )
            ?.map((post, index) => (
              <Post
                post={post}
                key={index}
                setAllPosts={setAllPosts}
                uniqueIndex={index}
                allPosts={allPosts}
              />
            ))}
        </Box>
      )}
    </Grid>
  );
};

export default Feed;
