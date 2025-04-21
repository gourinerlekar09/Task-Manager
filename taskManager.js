$(document).ready(function() {
    
    loadTasks();

    
    $('#addTaskButton').on('click', function() {
        let taskInput = $('#taskInput').val().trim();
        if (taskInput) {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ id: Date.now(), task: taskInput });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            $('#taskInput').val('');
            loadTasks();
        }
    });

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        $('#taskList').empty();
        tasks.forEach(function(task) {
            $('#taskList').append(`
                <div class="task-item" data-id="${task.id}">
                    <span>${task.task}</span>
                    <div>
                        <button class="btn btn-warning btn-sm editTaskButton">Edit</button>
                        <button class="btn btn-danger btn-sm deleteTaskButton">Delete</button>
                    </div>
                </div>
            `);
        });
    }

    
    $(document).on('click', '.editTaskButton', function() {
        let taskId = $(this).closest('.task-item').data('id');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let taskToEdit = tasks.find(task => task.id === taskId);
        
        
        let newTaskDescription = prompt('Edit Task', taskToEdit.task);
        if (newTaskDescription && newTaskDescription !== taskToEdit.task) {
            taskToEdit.task = newTaskDescription;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    });

    
    $(document).on('click', '.deleteTaskButton', function() {
        let taskId = $(this).closest('.task-item').data('id');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    });
});
