$(document).ready(() => {
    console.log(Date.now());

    $('form').on('submit', (e) => {
        e.preventDefault();

        let todo = {
            id: Date.now(),
            text: $('#todoInput').val()
        }
    
        createItem(todo);

        $('#todoInput').val('');

    });

    $('#todoInput').on('input', function() {
        if ($('#todoInput').val().length >= 5 ) {
            $('#createBTN').prop('disabled', false);
        } else {
            $('#createBTN').prop('disabled', true);
        }
    });

    function createItem(item, target) {
        if (typeof target == 'undefined') {
            target = '#listTodo';
        }

        let html = '',
            id = null;

        if (target == '#listTodo') {
            id = `todo-${item.id}`;
            html = `<li class="list-group-item">
                        <div class="row">
                            <div class="col col-md-8">
                            <input type="text" class="form-control" 
                                value="${item.text}" 
                                style="display:none;">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="${id}">
                                    <label class="form-check-label" for="${id}">
                                        ${item.text}</label>
                                </div>
                            </div>
                            <div class="col col-md-4 text-right">
                                <button type="button" class="btn btn-primary btn-sm editBTN">Edit</button>
                                <button type="button" class="btn btn-danger btn-sm deleteBTN">Delete</button>
                                <button type="button" class="btn btn-primary btn-sm saveBTN" style="display:none;">Save</button>
                                <button type="button" class="btn btn-danger btn-sm cancelBTN" style="display:none;">Cancel</button>
                            </div>
                        </div>
                    </li>`;
        } else {
            html = `<li class="list-group-item">${item.text}</li>`
        }

        $(target).prepend(html);

    }

    $('body').on('change', '[type="checkbox"]',function(e) {
        let text = $(this).next().text().trim();
        createItem({text: text}, '#listCompleted');
        deleteItem($(this).parents('li'));
    })

    $('body').on('click', '.editBTN',function(e) {
        let parent = $(this).parents('li');

        hideItems(parent, ['.form-check', '.editBTN', '.deleteBTN'])
        showItems(parent, ['[type="text"]', '.saveBTN', '.cancelBTN'])

    })

    $('body').on('click', '.saveBTN',function(e) {
        let parent = $(this).parents('li'),
            text = parent.find('[type="text"]').val().trim();
        
        parent.find('label').text(text);

        hideItems(parent, ['[type="text"]', '.saveBTN', '.cancelBTN'])
        showItems(parent, ['.form-check', '.editBTN', '.deleteBTN'])

    })

    $('body').on('click', '.cancelBTN',function(e) {
        let parent = $(this).parents('li');

        hideItems(parent, ['[type="text"]', '.saveBTN', '.cancelBTN'])
        showItems(parent, ['.form-check', '.editBTN', '.deleteBTN'])

    })

    $('body').on('click', '.deleteBTN',function(e) {
        deleteItem($(this).parents('li'));
    })

    function deleteItem(item) {
        item.remove();
    }

    function hideItems(parent, items) {
        $(items).each((i, item) => {
            $(parent).find(item).hide();
        })
    }

    function showItems(parent, items) {
        $(items).each((i, item) => {
            $(parent).find(item).fadeIn();
        })
    }

});