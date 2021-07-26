import React, { useCallback, useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import f from '../image/f.png';
import loading from '../image/Ellipsis.gif';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }
   
    const KeyPress = useCallback(e=>
        {
            if (e.key==='Enter' && !modal) {
                setModal(true);
                console.log("press");
            }
        }
        );
        useEffect(
            ()=>{
                document.addEventListener('keydown',KeyPress);
                return()=>document.removeEventListener('keydown',KeyPress);

            },[KeyPress]
        );
    

    


    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)}  >Create Task</button>
            </div>
            <div className="task-container">
                {(taskList && !taskList.length) ? <div className="empty">
                    <img src={f} style={{ "width": "60%" }} />
                    <br />
                    <img src={loading} style={{ "width": "100px", "marginTop": "-80px" }} />
                </div> : taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;