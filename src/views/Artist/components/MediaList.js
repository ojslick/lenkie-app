import PropTypes from 'prop-types';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Typography } from '../../../components/Typography';
import { styled } from '@mui/material/styles';

const TopSongsWrapper = styled('div')`
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledListItem = styled(ListItem)`
    border-bottom: 1px solid #f1f1f1;
    padding: 8px 0;

    &:last-child {
        border-bottom: none;
    }
`;

export function MediaList({ title, mediaData, showDuration, showReleaseDate }) {
    const convertDurationToMinutes = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;
        return `${minutes}:${seconds}`;
    };

    return (
        <TopSongsWrapper>
            <Typography variant="titleMedium" gutterBottom>
                {title}
            </Typography>
            <List sx={{ maxHeight: '240px', overflow: 'auto' }}>
                {mediaData.map((data, index) => (
                    <StyledListItem key={data.id}>
                        <Box flexGrow={0} marginRight={2}>
                            <ListItemText primary={`${index + 1}.`} />
                        </Box>
                        <Box flexGrow={1}>
                            <ListItemText primary={data.title} />
                        </Box>
                        {showDuration && (
                            <Box flexGrow={0}>
                                <ListItemText
                                    primary={`${convertDurationToMinutes(data.duration)} seconds`}
                                />
                            </Box>
                        )}
                        {showReleaseDate && (
                            <Box flexGrow={0}>
                                <ListItemText primary={data.release_date} />
                            </Box>
                        )}
                    </StyledListItem>
                ))}
            </List>
        </TopSongsWrapper>
    );
}

MediaList.propTypes = {
    title: PropTypes.string.isRequired,
    mediaData: PropTypes.array.isRequired,
    showDuration: PropTypes.bool,
    showReleaseDate: PropTypes.bool,
};
