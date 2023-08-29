import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@mui/material/colors';

function TaskCard(props) {

    const { task, onDelete, onEdit, onCompleteChange } = props;

    const [completed, setCompleted] = useState(false);

    function formatDate(date) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    const handleComplete = () => {
        setCompleted(!completed);
        onCompleteChange(task.id, !completed);
    };

    return (
        <Card sx={{
            maxWidth: 250, border: completed ? '1px solid green' : '1px solid gray',
            outline: completed ? '1px solid green' : 'none',
            textDecoration: completed ? 'line-through' : 'none',
            backgroundColor: completed ? '#92b093' : '',
            color: completed ? 'white' : 'black'
        }}>
            <CardContent>
                <Typography>Name: {task.taskName}</Typography>
                <Typography>Subject: {task.taskSubject}</Typography>
                <Typography>Priority: {task.myPriority}</Typography>
                <Typography>Due Date: {formatDate(task.myDate)}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to completed" onClick={handleComplete}>
                    <CheckIcon style={{ color: green[500] }} />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => onDelete(task)}>
                    <DeleteIcon color="secondary" />
                </IconButton>
                <IconButton aria-label="Edit" onClick={() => onEdit(task)}>
                    <EditIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default TaskCard;
