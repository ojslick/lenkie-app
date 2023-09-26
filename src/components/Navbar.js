import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MusicNoteSharp from '@mui/icons-material/MusicNoteSharp';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';

import { Typography } from './Typography';

export function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <ButtonBase disableRipple component={Link} to="/" aria-label="navigate-to-home">
                    <MusicNoteSharp sx={{ mr: 2 }} />
                    <Typography variant="headline" color="inherit" noWrap>
                        Artist Search
                    </Typography>
                </ButtonBase>
            </Toolbar>
        </AppBar>
    );
}
