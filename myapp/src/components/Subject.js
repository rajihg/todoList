import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'justifty-start',
        gap: '15px',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },

    selectedChip: {
        backgroundColor: '#333996',
        color: 'white',
    },
}));

export default function Chips(props) {
    const classes = useStyles();

    const { onClick, onChange } = props;

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleClick = (subject) => {
        setSelectedSubject(subject);
        setClicked(!clicked);
        onClick(subject);
    };

    return (
        <div className={classes.root} style={{ paddingTop: '15px'}}>
            <Chip
                avatar={<Avatar> F </Avatar>}
                label="Food"
                clickable
                color="undone"
                onChange={onChange}
                className={selectedSubject == 'Food' ? classes.selectedChip : ''}
                onClick={() => handleClick('Food')}
                deleteIcon={<DoneIcon />}
            />
            <Chip
                avatar={<Avatar> S </Avatar>}
                label="Sports"
                clickable
                color="undone"
                onChange={onChange}
                className={selectedSubject == 'Sports' ? classes.selectedChip : ''}
                onClick={() => handleClick('Sports')}
                deleteIcon={<DoneIcon />}
            />
            <Chip
                avatar={<Avatar> M </Avatar>}
                label="Movies"
                clickable
                color="undone"
                onChange={onChange}
                className={selectedSubject == 'Movies' ? classes.selectedChip : ''}
                onClick={() => handleClick('Movies')}
                deleteIcon={<DoneIcon />}
            />
            <Chip
                avatar={<Avatar> W </Avatar>}
                label="Work"
                clickable
                color="undone"
                onChange={onChange}
                className={selectedSubject == 'Work' ? classes.selectedChip : ''}
                onClick={() => handleClick('Work')}
                deleteIcon={<DoneIcon />}
            />
            <Chip
                avatar={<Avatar> T </Avatar>}
                label="Travel"
                clickable
                color="undone"
                onChange={onChange}
                className={selectedSubject == 'Travel' ? classes.selectedChip : ''}
                onClick={() => handleClick('Travel')}
                deleteIcon={<DoneIcon />}
            />
            <Chip
                avatar={<Avatar> O </Avatar>}
                label="Other"
                clickable
                color="undone"
                onChange={onChange}
                className={selectedSubject == 'Other' ? classes.selectedChip : ''}
                onClick={() => handleClick('Other')}
                deleteIcon={<DoneIcon />}
            />
        </div>
    );
}
