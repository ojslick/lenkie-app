import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import ReactGA from 'react-ga4';

import { pluralize } from '../../../utils/pluralize';
import { Typography } from '../../../components/Typography';

export function ArtistCard({ artist }) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
            }}
            onClick={() => {
                navigate(`/artist/${artist.id}`);
                ReactGA.event({
                    category: 'Artist',
                    action: 'Clicked Artist Card',
                    label: artist.name,
                });
            }}
            data-testid="artist-card"
        >
            <CardMedia
                component="div"
                sx={{
                    pt: '75.25%',
                }}
                image={artist.picture_medium}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Tooltip title={artist.name}>
                    <Typography gutterBottom variant="headline" component="h2" noWrap>
                        {artist.name}
                    </Typography>
                </Tooltip>
                <Typography variant="bodyBase" display="block">
                    {artist.nb_fan} {pluralize('fan', artist.nb_fan)}
                </Typography>
                {!isMobile && (
                    <Typography variant="bodyBase">
                        {artist.nb_album} {pluralize('album', artist.nb_album)}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        nb_fan: PropTypes.number.isRequired,
        nb_album: PropTypes.number.isRequired,
        picture_medium: PropTypes.string.isRequired,
    }).isRequired,
};
