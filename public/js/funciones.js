function resetForm() {
    document.getElementById("signForm").reset();
}

function submitForm() {
    document.getElementById("signForm").submit();
}

function submitLogin() {
    document.getElementById("loginForm").submit();
}

function noButton() {
    window.location.href = 'https://www.youtube.com/embed/jn7D5XP4Gac';
}

function analyzeTable() {
    // Analyze data
    let x = document.getElementById("tableData").rows.length - 1;
    let text = "Usuarios totales: " + x ;
    // Appear
    document.getElementById("tableData").remove();
    let para = document.createElement("p");
    let node = document.createTextNode(text);    
    para.appendChild(node);
    let element = document.getElementById("tableDiv");
    element.appendChild(para); 
}

var originaltable = document.getElementById("tableDiv").innerHTML;

function resetTable() {
    if (document.getElementById("tableData") === null) {
        document.getElementById("tableDiv").innerHTML = "";
        let table = document.createElement('table');
        table.className = "table table-hover";
        table.id = "tableData";
        table.innerHTML = originaltable;
        let element = document.getElementById("tableDiv");
        element.appendChild(table);
    } else {
        window.alert("Ya hay una tabla.");
    }
}

function validateForm()
{
    let fields = ["fname", "lname", "user", "pass", "birth", "gender", "mail", "ifmail"]
    let l = fields.length;
    let fieldname;
    for (let i = 0; i < l; i++) {
    fieldname = fields[i];
    if (document.forms["signForm"][fieldname].value === "") {
        alert("Por favor llene todos los campos.");
        return false;
    }
    }
    submitForm();
}

function validateLogin()
{
    let fields = ["loginUser", "loginPass"]
    let l = fields.length;
    let fieldname;
    for (let i = 0; i < l; i++) {
    fieldname = fields[i];
    if (document.forms["loginForm"][fieldname].value === "") {
        alert("Por favor llene todos los campos.");
        return false;
    }
    }
    submitLogin();
}



