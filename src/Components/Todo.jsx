import React, { useState } from "react";
import todo from "../images/todo.png";
import "../App.css";
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItem] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  //   Add items
  const addItem = () => {
    if (!inputData) {
      alert("Please fille the data!");
    } else if (inputData && !toggleSubmit) {
      setItem(
        items.map((elem) => {
          if (elem.id === isEditing) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData('');
      setIsEditing(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...items, allInputData]);
      setInputData("");
    }
  };

  //   Delete Items
  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItem(updatedItems);
  };
  //   Edit Items
  const editItem = (id) => {
    const newEditItems = items.find((elem) => {
      return elem.id === id;
    });
    // console.log(newEditItems);
    setToggleSubmit(false);
    setInputData(newEditItems.name);
    setIsEditing(id);
  };
  const removeAll = () => {
    setItem([]);
  };
  return (
    <>
      <div className="main_div">
        <div className="child_div">
          <figure>
            <img src={todo} alt="Todo List" className="photo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="add_items">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus-square add-btn"
                title="Add Items!"
                onClick={addItem}
              />
            ) : (
              <i
                className="fa fa-edit add-btn"
                title="Update Items!"
                onClick={addItem}
              />
            )}
          </div>
          <div className="show_items">
            {items.map((elem) => {
              return (
                <div className="each_items" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <i
                    className="fa fa-edit add-btn"
                    title="Edit Items"
                    onClick={() => editItem(elem.id)}
                  />
                  <i
                    className="fa fa-trash add-btn"
                    title="Delete Items"
                    onClick={() => deleteItem(elem.id)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={removeAll}>Remove All</button>
        </div>
      </div>
    </>
  );
};

export default Todo;
