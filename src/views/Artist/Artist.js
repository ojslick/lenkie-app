import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { getAlbums, getArtist, getTopSongs } from '../../services';
import { ArtistHeader } from './components/ArtistHeader';
import { MediaList } from './components/MediaList';
import { Typography } from '../../components/Typography';

export function Artist() {
    const { artistId } = useParams();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { data: artistData, isLoading: isLoadingArtist } = useQuery(
        ['artist', { id: artistId }],
        getArtist,
        {
            onError: () => {
                toast.error('Something went wrong, there was an error fetching this artist');
            },
        }
    );
    const { data: topSongsData, isLoading: isLoadingTopSongs } = useQuery(
        ['topSongs', { id: artistId }],
        getTopSongs,
        {
            enabled: !!artistData?.id,
            onError: () => {
                toast.error('Something went wrong, there was an error fetching top songs');
            },
        }
    );
    const { data: albums, isLoading: isLoadingAlbums } = useQuery(
        ['albums', { id: artistId }],
        getAlbums,
        {
            enabled: !!topSongsData,
            onError: () => {
                toast.error('Something went wrong, there was an error fetching albums');
            },
        }
    );

    const isLoading = isLoadingArtist || isLoadingTopSongs || isLoadingAlbums;

    return (
        <Box sx={{ mt: '100px' }}>
            {isLoading && (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress size={80} />
                </Box>
            )}
            {albums && (
                <Container maxWidth="lg">
                    <ArtistHeader
                        artistImage={artistData?.picture_xl}
                        artistName={artistData?.name}
                        artistFansTotal={artistData?.nb_fan}
                    />
                    <Box
                        data-testid="artist-media-list-container"
                        sx={{
                            display: isMobile ? 'inline-block' : 'flex',
                            justifyContent: isMobile ? undefined : 'space-between',
                        }}
                    >
                        <Box
                            sx={{ width: isMobile ? '100%' : '48%' }}
                            data-testid="top-songs-media-list-container"
                        >
                            <Box sx={{ mt: 5 }}>
                                {!isEmpty(topSongsData.data) && (
                                    <MediaList
                                        title="Top songs"
                                        mediaData={topSongsData.data}
                                        showDuration
                                    />
                                )}
                                {isEmpty(topSongsData.data) && !isLoadingTopSongs && (
                                    <Typography variant="labelLarge" color="textSecondary">
                                        No top songs found
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{ width: isMobile ? '100%' : '48%' }}
                            data-testid="album-media-list-container"
                        >
                            <Box sx={{ mt: 5 }}>
                                {!isEmpty(albums.data) && (
                                    <MediaList
                                        title="Albums"
                                        mediaData={albums.data}
                                        showReleaseDate
                                    />
                                )}
                                {isEmpty(albums.data) && !isLoadingAlbums && (
                                    <Typography variant="labelLarge" color="textSecondary">
                                        No albums found
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            )}
        </Box>
    );
}
