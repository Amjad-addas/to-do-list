// defination
let key=0;
let complate=0;
let taskCounter=0;
const todoList = document.querySelector(".list");
todoList.addEventListener("click", deleteCheck);
let spanTask=document.getElementById("task-counter");
let spanComplated=document.getElementById("complated");
let ulList = document.getElementById("list");
let add = document.getElementById("add-task");
const filterOption = document.querySelector(".filter");
filterOption.addEventListener("change", filterTodo);


//
filterOption.value="all"


//Add task
function addTask(){
    let task = add.value ;
    //add to storage
    window.localStorage.setItem(add.value,add.value)
    add.value="" ;

    if(!task)
        {
            add.style.outlineWidth="2px";
            add.style.outlineStyle="solid";
            add.style.outlineColor="red";
            add.placeholder ="Add task";
        }
        else{
            // counter of task refresh
            taskCounter++;
            // empty input 
            add.style.outline="none";
            add.placeholder ="";

            //li iteme
            let list = document.createElement("li");
            list.id="element"
            list.innerHTML=task
            // completed button
            let done =document.createElement("buttom");
            done.classList.add("done");
            done.classList.add("btn");
            done.id="done" ;
            let doneIcon=document.createElement("i");
            doneIcon.classList.add("fa");
            doneIcon.classList.add("fa-check-circle");
            done.appendChild(doneIcon)
            // trash button
            let trash= document.createElement("button");
            trash.classList.add("trash");
            trash.classList.add("btn");
            trash.id="trash";
            let trashIcon =document.createElement("i");
            trashIcon.classList.add("fa-trash");
            trashIcon.classList.add("fa")
            trash.appendChild(trashIcon);
             //todo div
            let todo =document.createElement("div");
            todo.classList.add("todo");
            todo.id="todo";
            todo.appendChild(list);
            todo.appendChild(done);
            todo.appendChild(trash);
            // append item to list
            ulList.appendChild(todo);
            // counter task refresh
            spanTask.innerHTML=taskCounter;
            

        }
        
}

let localKey=[]
//get item from storage
if(window.localStorage.length!=0){

    for(let i=0 ; i<window.localStorage.length;i++){
        localKey.push(window.localStorage.getItem(localStorage.key(i)))

    }
    for(let i=0 ; i<localKey.length;i++){

       let v= localKey[i]
        // counter of task refresh
        taskCounter++;
        // empty input 
        add.style.outline="none";
        add.placeholder ="";

        //li iteme
        let list = document.createElement("li");
        list.id="element"
        list.innerHTML=v
        // completed button
        let done =document.createElement("buttom");
        done.classList.add("done");
        done.classList.add("btn");
        done.id="done" ;
        let doneIcon=document.createElement("i");
        doneIcon.classList.add("fa");
        doneIcon.classList.add("fa-check-circle");
        done.appendChild(doneIcon)
        // trash button
        let trash= document.createElement("button");
        trash.classList.add("trash");
        trash.classList.add("btn");
        trash.id="trash";
        let trashIcon =document.createElement("i");
        trashIcon.classList.add("fa-trash");
        trashIcon.classList.add("fa")
        trash.appendChild(trashIcon);
        //todo div
        let todo =document.createElement("div");
        todo.classList.add("todo");
        todo.id="todo";
        todo.appendChild(list);
        todo.appendChild(done);
        todo.appendChild(trash);
        // append item to list
        ulList.appendChild(todo);
        // counter task refresh
        spanTask.innerHTML=taskCounter;
    }
}

//trash and complate

function deleteCheck(e){
    const item = e.target;
    //trash
    if(item.classList[0] === "trash" ||item.classList[1] === "trash") {
        // counter task and complete refresh  when delete the task
        
        taskCounter--;
        spanTask.innerHTML=taskCounter
        //remove from storage
        for(let i=0 ; i<window.localStorage.length;i++){
            
        if(item.parentElement.firstChild.innerHTML==window.localStorage.getItem(item.parentElement.firstChild.innerHTML)){
            window.localStorage.removeItem(item.parentElement.firstChild.innerHTML)
        }
        }
        //make sure that the counter is not nigative
        
        if(complate=="0"){
        spanComplated.innerHTML=0
        }
        else{
        complate--;
        spanComplated.innerHTML=complate
        }
        const todo = item.parentElement;
        todo.classList.add("animate");       
        todo.addEventListener("transitionend",function(){
            todo.remove()

        })
        return "ss"
    }
    //completed
    else if(item.classList[0] === "done" && item.parentElement.classList[1]!="layer"){
        //add animation 
        item.parentElement.classList.add("layer")
        item.parentElement.firstChild.style.textDecoration="line-through"
        // refresh complete counter
        complate++
        spanComplated.innerHTML=complate
        
        
    }else if(item.classList[0] === "done" && item.parentElement.classList[1]==="layer"){
        
        item.parentElement.firstChild.style.textDecoration="none"
        item.parentElement.classList.remove("layer")
                // refresh complete counter
                complate--
                spanComplated.innerHTML=complate
    }
}
//clear All

function clearAll(){
    let ulList= document.getElementById("list")
    while(ulList.hasChildNodes()){
        ulList.removeChild(ulList.firstChild)
    }
     // counter refresh when clear all task
    window.localStorage.clear()
    spanTask.innerHTML=0

    spanComplated.innerHTML=0
}

function filterTodo(e){
    const filter = e.target.value
    ulList.childNodes.forEach(function(todo){
        switch(filter) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("layer")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("layer")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
    

}