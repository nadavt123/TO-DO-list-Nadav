function saveFunc(){                        //הפונקציה מוסיפה משימה ל div
    const inputValue=document.getElementById("taskInput").value;

    if(inputValue==""){
    alert("Please enter a valid task");
    return;
    }

    const newTaskElement = buildNewTask(inputValue);
    const tasksDiv=document.getElementById("tasks");
    tasksDiv.appendChild(newTaskElement);
}

function buildNewTask(inputValue) {                         //הפונקציה מקבלת את הקלט ומוסיפה לו את כל האלמנטים שקשורים אליו
    const newTaskElement=document.createElement("div");   
    newTaskElement.classList.add("theTask");
    const liElement=document.createElement("li");
    liElement.setAttribute("class","liClass");
    newTaskElement.appendChild(liElement);

    const inputElement=document.createElement("input");
    inputElement.setAttribute("type","text");
    inputElement.setAttribute("class","text");
    inputElement.setAttribute("readonly","");
    inputElement.setAttribute("value",inputValue);

    const buttonRemove=document.createElement("button");
    buttonRemove.setAttribute("class","remove");  
    buttonRemove.innerHTML="✔️";
    buttonRemove.setAttribute("onclick","removeFunc(this.parentNode.parentNode)");

    const buttonEdit=document.createElement("button");
    buttonEdit.setAttribute("class","edit");
    buttonEdit.innerHTML="Edit";
    buttonEdit.setAttribute("onclick","editFunc(this)");

    liElement.appendChild(inputElement);
    liElement.appendChild(buttonRemove);
    liElement.appendChild(buttonEdit);
    return newTaskElement;
}

function removeFunc(event)  //הפונקציה מקבלת אלמנט ומוחקת אותו
{
    let elementRemove=event;
    elementRemove.remove();

}

function editFunc(buttonElement)   //פונקציה המופעלת כאשר לוחצים על כפתור העריכה ומאפשרת לערוך את המשימה. 
{
    let elementEdit=buttonElement;
    let parent=elementEdit.parentNode;
    let sibling=elementEdit.parentNode.childNodes[0];// מוצא את הסיבלינג שהוא הקלט
    elementEdit.innerHTML="Done";
    sibling.removeAttribute("readonly");
    elementEdit.setAttribute("onclick","recoverReadOnly(this)");



}

function recoverReadOnly(buttonElement)  //פונקציה המופעלת כאשר לוחצים על כפתור ה DONE. 
                                         //  מחזירה לאלמנט את הערך של readonly
{
    let elementEdit=buttonElement;
    let sibling=elementEdit.parentNode.childNodes[0];
    elementEdit.innerHTML="Edit";
    sibling.setAttribute("readonly","");
    elementEdit.setAttribute("onclick","editFunc(this)");

}
function searchExecute(){      //פונצקיה המופעלת כאשר לוחצים על כפתור החיפוש 
const searchValue=document.getElementById("searchInput").value;
const tasksId=document.getElementById("tasks");
let tasksList=[];
let i=0;
while(tasksId.children[i]!=undefined)    // הלולאה בודקת כל עוד ישנו ערך במערך הילדים 
{
    const childSave=tasksId.children[i]; //המשתנה הזה רץ על הילדים של tasksId.
    const childSave2=childSave.children[0]; //המשתנה הזה שומר את הילד שהוא li
    const childSave3= childSave2.children[0]; //המשתנה הזה שומר את הטקסט של המשימה
    tasksList.push(childSave3); //דוחפים למערך החדש את ערכי הטקסט של המשימות כדי לשמור אותם
    i++;

}
for(let i=0;i<tasksList.length;i++)
{
    if(searchValue=="")   //אם הקלט הוא סטרינג ריק התכנית תחזיר את כל המשימות שהוסתרו
    {
        tasksList[i].parentNode.style.display="block";

    }
   else if(!tasksList[i].getAttribute("value").includes(searchValue)) //אם הקלט לא מוכל באחת מן המשימות התכנית תסתיר את כל המשימות שהקלט לא מוכל בהן
    {
        tasksList[i].parentNode.style.display="none";
    }

}

}

function createIncomplete() //הפונקציה בונה סטרינג שאומר כמה משימות נשארו
{
    
    const para=document.getElementById("paraIncomplete")
    const tasksId=document.getElementById("tasks");
    let amountOfTasks=countOfTasks();
    para.innerHTML="You have "+amountOfTasks+" incomplete tasks";
    amountOfTasks=0;
}

function countOfTasks() //הפונקציה סופרת את כמות המשימות
{
    const tasksId=document.getElementById("tasks");
    let counter=0;
    for(let i=0; i<tasksId.children.length;i++)
    {
        if(tasksId.children[i].hasChildNodes())
        {
            counter++;
        }

    }

    return counter;

}







