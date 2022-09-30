import React, { useState, useEffect } from 'react'
import "./style.css"

// get the localStroage data back
const Todo = () => {

    const getLocalData = () => {
        const lists = localStorage.getItem("mytodolist");
        if (lists) {
            return JSON.parse(lists);
        } else {
            return []
        }
    }


    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () => {
        if (!inputdata) {
            alert("plz fill the data");
        }
        else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id == isEditItem) {
                        return { ...curElem, name: inputdata }
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null)
            setToggleButton(false);

        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData])
            setInputData("");
        }
    }

    const editItem = (itemId) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id = itemId
            //   console.log(curElem.name);
        })
        setInputData(item_todo_edited.name);
        setIsEditItem(itemId)
        setToggleButton(true);
    }

    const deleteItem = (itemId) => {
        const updateItems = items.filter((curElem) => {
            return curElem.id != itemId
        });
        setItems(updateItems);
    }

    const removeAll = () => {
        setItems([]);
    }

    //adding in localstorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Item" className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)} />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}

                    </div>
                    <div className="showItems">
                        {   
                            items.map((item, index) => {
                                return (
                                    <div className="eachItem" key={item.id}>
                                        <h3>{item.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(item.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(item.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECKLIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo