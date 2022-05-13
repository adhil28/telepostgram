import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import config from '../../../Helpers/Global';
import { IsVisible } from '../../SpecialComponents/isVisible';
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
interface Options {
    configs: any
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function VideoMessageLayout({ configs }: Options) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ref = React.useRef() as React.RefObject<HTMLDivElement>;
    const inViewport = IsVisible(ref, '0px');
    let telegram = config.telegram

    if (inViewport) {
        if (config.telegram != null) {
            let data = document.getElementById((configs.chat.id + configs.id)) as any
            data = data.src != ''
            if (!data) { telegram.loadMedia(configs, configs.chat.id + configs.id) }
        }
    }

    /*  React.useEffect(() => {
 
 
     }, []) */





    return (
        <div ref={ref}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {configs.message.sender.name.split('')[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={configs.message.sender.name}
                    subheader={configs.date}
                />
                {/* <CardMedia
                component="video"
                src={media}
                id={configs.chat.id + configs.id}
                controls
            /> */}
                <video muted id={configs.chat.id + configs.id} controls style={{ width: '100%' }} poster="https://www.digital4n6journal.com/wp-content/themes/D4n6J/images/loader.gif">
                    <source type='video/mp4'></source>
                </video>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {configs.message.post.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {configs.message.post.expanded_description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
