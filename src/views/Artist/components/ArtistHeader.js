import PropTypes from 'prop-types';
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '../../../components/Typography';

export function ArtistHeader({ artistName, artistImage, artistFansTotal }) {
    return (
        <Card elevation={4} sx={{ position: 'relative' }}>
            <CardMedia component="img" height="340" image={artistImage} alt={artistName} />
            <Typography
                variant="labelLarge"
                sx={{
                    position: 'absolute',
                    bottom: 50,
                    left: 15,
                    color: 'white',
                    textShadow: '2px 2px 4px #000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    padding: '5px',
                }}
            >
                {artistName}
            </Typography>
            <Typography
                variant="labelLarge"
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 15,
                    color: 'white',
                    textShadow: '2px 2px 4px #000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    padding: '5px',
                }}
            >
                Total Fans: {artistFansTotal.toLocaleString()}
            </Typography>
        </Card>
    );
}

ArtistHeader.propTypes = {
    artistName: PropTypes.string.isRequired,
    artistImage: PropTypes.string.isRequired,
    artistFansTotal: PropTypes.number.isRequired,
};
