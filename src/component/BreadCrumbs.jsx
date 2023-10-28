
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BreadCrumbs(){
    return (
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" sx={{fontSize: "12px"}}>
              Home
            </Link>
            <Typography color="text.primary" sx={{fontSize: "12px"}}>Temporary</Typography>
          </Breadcrumbs>
        </div>
    )
}