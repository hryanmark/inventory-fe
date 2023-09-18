
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {DRAWER_WIDTH} from '../config.js';

export default function Header(){
    return(
        <AppBar 
            position="fixed"
            sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }}
        >
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
                Inventory Management System
            </Typography>
            </Toolbar>
        </AppBar>
    )
}