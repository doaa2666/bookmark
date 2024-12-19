var promarkbook = document.getElementById("promarkbook");
var prolink = document.getElementById("prolink");
var button = document.getElementById("btn");
var tableContent = document.getElementById("tableContent");
var list;

if (localStorage.getItem('list') != null) {
    list = JSON.parse(localStorage.getItem('list'));
    display();
} else {
    list = [];
}

promarkbook.addEventListener('input', function() {
    validateInputs();
});

prolink.addEventListener('input', function() {
    validateLinkInput();
});

button.onclick = function () {
    if (validateInputs() && validateLinkInput()) {
        data();
        clear();
        display();
        hideErrorMessage();
        promarkbook.classList.remove('is-valid');
        prolink.classList.remove('is-valid');
    } else {
        showErrorMessage();
    }
};

function data() {
    var obj = {
        pname: promarkbook.value,
        link: prolink.value
    };
    list.push(obj);
    localStorage.setItem('list', JSON.stringify(list));
}

function clear() {
    promarkbook.value = "";
    prolink.value = "";
}

function display() {
    var box = '';
    for (var i = 0; i < list.length; i++) {
        box += `<tr>
            <td>${i + 1}</td>
            <td>${list[i].pname}</td>
            <td><a href="${list[i].link}" target="_blank" class="btn btn-success text-white"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button class="btn btn-danger" onclick="deletefun(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
    }
    tableContent.innerHTML = box;
}

function deletefun(index) {
    list.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(list));
    display();
}

function validateInputs() {
    var markbookValue = promarkbook.value.trim();
    if (markbookValue.length < 3) {
        promarkbook.classList.add('is-invalid');
        promarkbook.classList.remove('is-valid');
        return false;
    } else {
        promarkbook.classList.remove('is-invalid');
        promarkbook.classList.add('is-valid');
    }
    return true;
}

function validateLinkInput() {
    var linkValue = prolink.value.trim();
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegex.test(linkValue)) {
        prolink.classList.remove('is-invalid');
        prolink.classList.add('is-valid');
        return true;
    } else {
        prolink.classList.add('is-invalid');
        prolink.classList.remove('is-valid');
        return false;
    }
}

function showErrorMessage() {
    var errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";

    var closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", hideErrorMessage);
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
}

function hideErrorMessage() {
    var errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none";
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}
