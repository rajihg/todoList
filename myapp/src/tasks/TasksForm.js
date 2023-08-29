import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import DatePicker from '../components/DatePicker';
import { useForm, Form } from '../components/useForm';
import Button from '../components/Button';
import Priority from '../components/Priority'
import Subject from '../components/Subject';
import OpenLayersMap from '../components/OpenLayersMap';

const initialValues = {
    id: 0,
    taskName: '',
    taskSubject: '',
    myPriority: 5,
    myDate: new Date(),
    taskLocation: null,
    isCompleted: 0,
};

export default function TasksForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const {
        values,
        setValues,
        handleInputChange,
        resetForm,
    } = useForm(initialValues, true);

    const handleSubmit = e => {
        addOrEdit(values, resetForm);
        resetForm();
    }

    const onClick = (subject) => {
        console.log(`Subject clicked: ${subject}`);
        setValues({ ...values, taskSubject: subject });
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const handleLocationSelected = (location) => {
        setValues(prevValues => ({ ...prevValues, taskLocation: location }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name='taskName'
                        label="TaskName"
                        placeholder="Enter Your Task"
                        multiline
                        variant="outlined"
                        value={values.taskName}
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        name="myDate"
                        label="Date"
                        value={values.myDate}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Priority
                        name="myPriority"
                        label="Priority"
                        value={values.myPriority}
                        onChange={handleInputChange}
                    />
                    <Subject
                        onClick={onClick}
                        onChange={handleInputChange}
                    />
                </Grid>
                <OpenLayersMap onLocationSelected={handleLocationSelected} />

                <div>
                    <Button text="Create" type="submit"/>

                    <Button text='Reset' color='default' onClick={resetForm} />
                </div>
            </Grid>
        </Form>
    )
}
