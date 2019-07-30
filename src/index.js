class ListItem {
    constructor(id, text, isChecked, isRemoved) {
        this.id = id;
        this.text = text;
        this.isChecked = false;
        this.isRemoved = false;
    }
}

// Create object 'storage'
let storage = {
    // Array with items
    items: [],
    checkedAll: false,
    checkItems() {
        this.checkedAll = true;
        this.items.forEach((elem) => {
            if (!elem.isRemoved) elem.isChecked = true;
        })
    },
    uncheckItems() {
        this.checkedAll = false;
        this.items.forEach((elem) => { elem.isChecked = false; })
    }
};

// Get input element
let inputText = document.getElementById('inputText');

// Add event listener to the input element [key === enter]
inputText.addEventListener('keydown', function (e) {
    // Get pressed key
    let key = e.which || e.keyCode;
    if ((key === 13) && (inputText.value !== '')) {
        let item = new ListItem(generateId(), inputText.value);
        // Add new item to the storage
        storage.items.push(item);
        // Clear input
        inputText.value = '';
        // Append <li> to <ul>
        appendItemToList(item.id, item.text);
        countTodoItems();
    }
});

// Add ListItem with checkbox and remove button to UL
function appendItemToList(id, text) {
    let ul = document.getElementById('todo-app-list');
    let checkbox = document.createElement('input');
        checkbox.className = 'todo-app-checkbox';
        checkbox.type = 'checkbox';
    let removeButton = document.createElement('button');
        removeButton.className = 'todo-app-remove';
        removeButton.innerText = 'X';
    let li = document.createElement('li');
        li.setAttribute('data-id', id);
        li.className = 'todo-app-item';
    let span = document.createElement('span');
        span.innerText = text;
        span.className = 'todo-app-item-span';
    li.appendChild(checkbox);
    li.appendChild(removeButton);
    li.appendChild(span);
    ul.appendChild(li);
}

// Add event listener on remove button
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('todo-app-remove')) {
        let element = event.target;
        let elementParentNode = element.parentNode;
        let dataId = elementParentNode.getAttribute('data-id');
        storage.items.forEach((item) => {
            if (item.id === dataId) {
                item.isRemoved = true;
                item.isChecked = false;
                elementParentNode.remove();
                countTodoItems();
            }
        })
    }
});

// Add event listener on checkbox
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('todo-app-checkbox')) {
        let element = event.target;
        let elementParentNode = element.parentNode;
        let dataId = elementParentNode.getAttribute('data-id');
        storage.items.forEach((item) => {
            if ((item.id === dataId) && (!item.isChecked)) {
                item.isChecked = true;
            }
            else if ((item.id === dataId) && (item.isChecked)) {
                item.isChecked = false;
            }
        })
    }
});

// Add event listener on checkItems button
document.addEventListener('click', function (event) {
    let checkboxes = document.querySelectorAll('.todo-app-checkbox');
    if (event.target.classList.contains('todo-app-checkAll') && (storage.checkedAll === false)) {
        checkboxes.forEach((elem) => {
            elem.checked = true;
        });
        storage.checkItems();
    } else if ((event.target.classList.contains('todo-app-checkAll') && (storage.checkedAll === true))) {
        checkboxes.forEach((elem) => {
            elem.checked = false;
        });
        storage.uncheckItems();
    }
});

// Count all list items
function countTodoItems() {
    let counter = 0;
    storage.items.forEach((elem) => {
        (!elem.isRemoved) ? counter++ : null;
    });
    document.getElementById('counter').innerText = counter.toString();
}

// Add event listener on 'clear completed' button
document.addEventListener('click', function (event) {
    if (event.target.id === 'clear-completed') {
        storage.items.forEach((elem) => {
            if (elem.isChecked === true) {
                let parentElement = document.querySelector(`[data-id = '${elem.id}']`);
                elem.isRemoved = true;
                elem.isChecked = false;
                parentElement.remove();
            }
        });
        countTodoItems();
    }
});

// Add event listener on 'completed' button
document.addEventListener('click', function (event) {
    if (event.target.id === 'filter-completed') {
        storage.items.forEach((elem) => {
                let parentElement = document.querySelector(`[data-id = '${elem.id}']`);
                if ((elem.isChecked) && (!elem.isRemoved)) {
                    parentElement.style.display = 'flex';
                }
                else if ((!elem.isChecked) && (!elem.isRemoved))  {
                    parentElement.style.display = 'none';
                }
            }

        )
    }
});

// Add event listener on 'active' button
document.addEventListener('click', function (event) {
    if (event.target.id === 'filter-active') {
        storage.items.forEach((elem) => {
                let parentElement = document.querySelector(`[data-id = '${elem.id}']`);
                if ((!elem.isChecked) && (!elem.isRemoved)) {
                    parentElement.style.display = 'flex';
                }
                else if ((elem.isChecked)) {
                    parentElement.style.display = 'none';
                }
            }

        )
    }
});


// Add event listener on 'all' button
document.addEventListener('click', function (event) {
    if (event.target.id === 'filter-all') {
        storage.items.forEach((elem) => {
                let parentElement = document.querySelector(`[data-id = '${elem.id}']`);
                if (!elem.isRemoved) {
                    parentElement.style.display = 'flex';
                }
            }

        )
    }
});

// Generate random data-id value for <li>
function generateId() {
    return Math.random().toString(36).substr(2, 8);
}

