function initTasks(tracker_list, values) {
    counter = 1;
    tracker_list.innerHTML = '';

    for (const value of values) {
        addTask(tracker_list, value);
    }
}

function appendTask(tracker_list) {
    addTask(tracker_list);
}

function addTask(tracker_list, value = '') {
    tracker_list.insertAdjacentHTML(
        'beforeend', 
        `<div class="tracker__item js-item" data-id="${ counter }">
            <input class="tracker__input js-item-input" type="text" value="${ value }">
            <button type="button" class="tracker__delete js-item-delete" data-id="${ counter }">
                &#10005;
            </button>
        </div>`
    );
    ++counter;
}

function deleteTask(id) {
    let item = document.querySelector(`.js-item[data-id="${ id }"]`);
    item.remove();
}

function getInputValues() {
    let inputs = document.querySelectorAll('.tracker__input');
    return Array.from(inputs).map((elem, i) => elem.value);
}

function sortAscending(values) {
    return values.sort();
}

function sortDescending(values) {
    return values.sort(function(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });
}

let counter = 2;

window.onload = function() {
    let tracker_list = document.getElementById('js-tracker-list'); 

    let item_add = document.querySelector('.js-item-add');
    item_add.addEventListener('click', () => { appendTask(tracker_list); });

    document.body.addEventListener('click', function(e) {
        if (!e.target) return;

        if (e.target.classList.contains('js-item-delete')) {
            let id = e.target.getAttribute('data-id');
            deleteTask(id);
        }
    });

    document.body.addEventListener('dblclick', function(e) {
        if (!e.target) return;

        if (e.target.classList.contains('js-item-input')) {
            e.preventDefault();
            let input = e.target;
            input.removeAttribute('readonly', false);
        }
    });

    document.body.addEventListener('keypress', function(e) {
        if (!e.target) return;

        if (e.key == 'Enter' && e.target.classList.contains('js-item-input')) {
            e.preventDefault();
            let input = e.target;
            input.setAttribute('readonly', true);
        }
    });

    let tracker_sort = document.getElementById('js-items-sort');
    tracker_sort.addEventListener('click', function(e) {
        let icon = this.querySelector('.js-sort-icon');
        let values = getInputValues();
        let new_values = null;

        if (icon.classList.contains('bi-sort-down-alt')) {
            icon.classList.remove('bi-sort-down-alt');
            icon.classList.add('bi-sort-up-alt');

            new_values = sortAscending(values);
        } else if (icon.classList.contains('bi-sort-up-alt')) {
            icon.classList.remove('bi-sort-up-alt');
            icon.classList.add('bi-sort-down-alt');

            new_values = sortDescending(values);
        }

        initTasks(tracker_list, new_values);
    });
};