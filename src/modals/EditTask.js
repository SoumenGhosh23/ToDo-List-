import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {

        const { name, value } = e.target

        if (name === "taskName") {
            setTaskName(value)
        } else {
            setDescription(value)
        }


    }

    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(taskObj.Description)
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Name'] = taskName
        tempObj['Description'] = description
        updateTask(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader className="modalbg" toggle={toggle}></ModalHeader>
            <ModalBody>
                <div className="bodybg">
                    <div className="create-div">

                        <div className="title">Update Task</div>
                        <div className="fields">
                            <div className="task_name">
                                <input type="text"
                                    className="user-input"
                                    value={taskName} onChange={handleChange} name="taskName"
                                    placeholder="Task Name"
                                    autoComplete="off"
                                /></div>
                            <div className="description">
                                <textarea className="desc"
                                    placeholder="Description"
                                    value={description} onChange={handleChange} name="description"
                                    autoComplete="off" /></div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="modalbg">
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;