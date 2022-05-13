import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
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
import { MessageInterface } from "../../../Helpers/interfaces"
import config from '../../../Helpers/Global';
import { toBase64 } from '../../../Helpers/Utils';
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



export default function ImageMessageLayout({ configs }: Options) {
    const telegram = config.telegram
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ref = React.useRef() as React.RefObject<HTMLDivElement>;
    const inViewport = IsVisible(ref, '250px');

    if (inViewport) {
        if (config.telegram != null) {
            let data = document.getElementById((configs.chat.id + configs.id)) as any
            data = data.src != 'https://www.digital4n6journal.com/wp-content/themes/D4n6J/images/loader.gif'
            if (!data) { telegram.loadMedia(configs, configs.chat.id + configs.id) }
        }
    }

    return (
        <div ref={ref}>
            <Card style={{ marginTop: '10px' }}>
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
                <CardMedia
                    component="img"
                    image={'https://www.digital4n6journal.com/wp-content/themes/D4n6J/images/loader.gif'}
                    id={configs.chat.id + configs.id}
                    alt={configs.message.sender.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary" style={{ fontWeight: "bold", fontSize: '20px' }}>
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
                        <Typography paragraph style={{ fontSize: '18px' }}>
                            {configs.message.post.expanded_description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
