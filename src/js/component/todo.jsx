import React, { useState, useEffect } from "react";



const Todo = () => {

    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([])

    // Traer los "todos" que estan en la API del usuario cm1
    function GetTodoByUser(){
        fetch('https://playground.4geeks.com/todo/users/cm1')
        .then( (response) => response.json() )
        .then ( (data) => {setTask(data.todos) })
        
    };

    // Crear los "todos" desde el input de HTML y guardarlos en la API
    function PostTodoByUser(label){
        let myItem = { 
            label: label,
            is_done: false
        }
        fetch('https://playground.4geeks.com/todo/todos/cm1', {
            method: "POST",
            body: JSON.stringify(myItem),
            headers: {
                "Content-Type": "application/json"
              }
        })
        .then(resp=> resp.json())
        .then(postResponse => {setTask([...task,postResponse])})  //[...task,postResponse] agrega "postResponse" a "task" or podemos usar concat ( //Add into an array --> concat) y quedaria:  {setTask(task.concat([postResponse]))}
        
    };

    //Delete un todo con base en el "id" que se puede ver/consultar en el response body de Post.
    function DeleteTodoByTodoId(id){

        fetch("https://playground.4geeks.com/todo/todos/" + id, {
            method: "DELETE",
        })     
        GetTodoByUser();   
    };


    // El useEffect también serviría para mandar a llamar la función
    useEffect(()=>{
        GetTodoByUser()
    },[])

    
    
    
    
    function saveChanges(e){
        setInputValue(e.target.value);
    }

    function saveItems(e){
        if (e.key == "Enter"){
            PostTodoByUser(inputValue)
            // setTask(task.concat([inputValue])); ---> Ya no se usa, porque esta función es para guardar informacion en la variable inputvalue pero localment, ahora se reemplaza con la funcíón de la linea 19 (PostTodoByUser), ya que esta linked a la API
            setInputValue("")

            
        }
    }

    function deleteItems(idIndex){
        let newItemsList = task.filter((task, index) => idIndex != index)
        setTodos(newItemsList)
    }

    // return (
    //         <div className="text-center">
    //             <h1> Hello</h1>
    //             {task.map( (task)=> <p key={task.id}>{task.name}</p>)}
                
                
    //         </div>
    //     );  
    
        return(
            <div className="container">
                <h1 className="text-center">todos</h1>
                <div className="new-list">
                    <div className="container">
                        <input type="text" 
                        onChange={saveChanges} 
                        value ={inputValue}  placeholder="What needs to be done?" 
                        onKeyDown={saveItems}/>
                    </div>
                    {task.map((item) => {
                        return (
                            <div className="task">
                            {item.label}
                            <span className="delete-icon"
                              onClick={() => DeleteTodoByTodoId(item.id)}  >
                            <button>X</button> </span>
                            </div>
                        )
                    })}
                </div>
                <div className="items-left">{task.length} items left</div>
            </div>
        );
};
    

export default Todo;


