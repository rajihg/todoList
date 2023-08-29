import React from 'react'
import TasksForm from './TasksForm'
import Popup from '../components/Popup';
import { makeStyles, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from '../components/useTable';
import ActionButton from '../components/ActionButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DisplayMap from '../components/DisplayMap';
import Tasks from './Tasks';
import { useTaskContext } from './TaskContext';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'taskName', label: 'Task Name' },
    { id: 'subject', label: 'Subject' },
    { id: 'priority', label: 'Priority' },
    { id: 'date', label: 'Due Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Admin() {
    const classes = useStyles();

    const {
        records,
        setRecords,
        openPopup,
        setOpenPopup,
        recordForEdit,
        setRecordForEdit,
        filterFn,
        setFilterFn,
      } = useTaskContext();

    function formatDate(date) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true);
      }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    return (
        <>
            <PageHeader
                title='Admin'
                subTitle='Only you decide what to do'
                icon={<SupervisorAccountIcon fontSize='large' />}
            />
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.taskName}</TableCell>
                                <TableCell>{item.taskSubject}</TableCell>
                                <TableCell>{item.myPriority}</TableCell>
                                <TableCell>{formatDate(item.myDate)}</TableCell>
                                <TableCell>
                                    <ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}>
                                        <EditIcon fontSize="small" />
                                    </ActionButton>
                                    <ActionButton
                                        color="secondary"
                                        onClick={() => { Tasks.deleteTask(item) }}>
                                        <DeleteIcon fontSize="small" />
                                    </ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Button
                text="Add Task"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => { setOpenPopup(true); setRecordForEdit(null) }}
            />
            <div>
                <DisplayMap tasks={records} />
            </div>
            <Popup
                title="Task Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <TasksForm
                    recordForEdit={recordForEdit}
                    addOrEdit={Tasks.addOrEdit} />
            </Popup>
        </>
    )
}
