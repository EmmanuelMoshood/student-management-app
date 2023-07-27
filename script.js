let selectedRow = null;

//show alerts
const showAlert = (message, className) =>{
    const div = document.createElement("div");
    div.className = `alert alert-${className}`

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(),3000);
}

//clear fields
const clearFields = () => {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

//add data or update data on submit
//add listener on submit element
document.querySelector("#submit").addEventListener("click", (e) => {
    //disables refreshing the browser on submit
    e.preventDefault();

    //get form values from the form
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    //validate the values to avoid empty input
    if(firstName == "" || lastName == "" || rollNo == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        //if this is not a row from the table
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            //create a new element for row
            const row = document.createElement("tr");
            //dynamically fill in the values
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            //add new row to the table of students
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success")

        }
        //if this an exist row from the table
        else {
            console.log("selectedRow is not empty");
    
            // Update the selected row on the table directly with the new values
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
    
            showAlert("Student Updated", "info"); // Show a message indicating successful update

            
        }
        //set the state for editing row back to null
        selectedRow = null;
        //clean up the form
        clearFields()

    }
})

//edit data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    let firstNameFromRow = target.parentElement.parentElement.children[0].textContent;
    let lastNameFromRow = target.parentElement.parentElement.children[1].textContent;
    let rollNoFromRow = target.parentElement.parentElement.children[2].textContent;

    if (target.classList.contains("edit")) {
        console.log("edit2");
        selectedRow = target.parentElement.parentElement; // Store the selected row for later use

        document.getElementById('firstName').value = firstNameFromRow;
        document.getElementById('lastName').value = lastNameFromRow;
        document.getElementById("rollNo").value = rollNoFromRow;
    }
})

//delete data 
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;  
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted","danger")
    }
})



const printValues = () => {
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    console.log(firstName, lastName, rollNo)
}

const addValue = (text) => {
    document.getElementById('firstName').value = text
}