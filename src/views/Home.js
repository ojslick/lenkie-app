import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { SearchOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { isEmpty } from 'lodash';
import Pagination from '@mui/material/Pagination';

import { ArtistCard } from '../components/ArtistCard';
import { Typography } from '../components/Typography';
import { getArtists } from '../services';

export function Home() {
    const [search, setSearch] = useState('');
    const [paginationDetails, setPaginationDetails] = useState({
        limit: 20,
        pageIndex: 0,
        page: 1,
    });
    const { data: artists, isLoading } = useQuery(
        [
            'artists',
            { q: search, limit: paginationDetails.limit, index: paginationDetails.pageIndex },
        ],
        getArtists,
        {
            enabled: Boolean(search),
        }
    );
    const totalPages = Math.ceil(artists?.total / paginationDetails.limit);

    useEffect(() => {
        if (search) {
            setPaginationDetails((prevState) => ({ ...prevState, page: 1, pageIndex: 0 }));
        }
    }, [search]);

    const handleChange = debounce((e) => setSearch(e.target.value), 500);

    const handlePageChange = (e, page) => {
        if (page === paginationDetails.page) return;

        setPaginationDetails((prevState) => ({
            ...prevState,
            page,
            pageIndex: (page - 1) * paginationDetails.limit,
        }));
    };

    return (
        <main>
            <Container maxWidth="sm" sx={{ mt: 12 }}>
                <TextField
                    variant="outlined"
                    InputProps={{ endAdornment: <SearchOutlined /> }}
                    placeholder="Search for an artist..."
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                />
            </Container>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {!isEmpty(artists?.data) && (
                <Container
                    sx={{
                        py: 8,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    maxWidth="xl"
                >
                    <Grid container spacing={4} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        {artists.data.map((artist) => (
                            <Grid item key={artist.id} xs={12} sm={6} md={4} lg={2.4}>
                                <ArtistCard artist={artist} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        sx={{ mt: 4 }}
                        count={totalPages}
                        page={paginationDetails.page}
                        onChange={handlePageChange}
                    />
                </Container>
            )}
            {isEmpty(artists) && !isLoading && (
                <Container sx={{ py: 8, display: 'flex', justifyContent: 'center' }} maxWidth="xl">
                    <Typography variant="smallHeadline">
                        Your searched artist will appear here
                    </Typography>
                </Container>
            )}
            {!isEmpty(artists) && isEmpty(artists.data) && !isLoading && (
                <Container sx={{ py: 8, display: 'flex', justifyContent: 'center' }} maxWidth="xl">
                    <Typography variant="smallHeadline">No artist found</Typography>
                </Container>
            )}
        </main>
    );
}
