/* global $ */

$(document).ready(function(){
    
    $.getJSON("/api/todos")
    .then(showTasks);
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13) {
            createTask();
        }
    });
    
    $('.list').on('click', 'li', function(){
        crossOutTask($(this));
    });
    
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        deleteTask($(this).parent());
    });
    
});

function showTasks(tasks){
    // Show tasks on the page
    tasks.forEach(function(task){
        updateList(task);
    })
}


function updateList(task) {
    var newTask = $('<li class="task">' + task.text + '<span><i class="fas fa-trash"></i></span></li>');
    newTask.data('id', task._id);
    newTask.data('completed', task.completed);
    
    if(task.completed){
        newTask.addClass("done");
    }
    $('.list').append(newTask);
}


function createTask(taskText){
    var userInput = $('#todoInput').val();
    // console.log(userInput);
    $.post('/api/todos', {text: userInput})
    .then(function(newTask){
        $('#todoInput').val('');
        updateList(newTask);
    })
    .catch(function(err){
        console.log(err);
    })
}


function crossOutTask(task){
    var clickedTask = task.data('id')
    var isCompleted = !task.data('completed');
    var updateData = {completed: isCompleted}
    
    $.ajax({
        method: 'PUT',
        url: '/api/todos/' + clickedTask,
        data: updateData
    })
    .then(function(crossedtask){
        task.toggleClass("done");
        task.data('completed', isCompleted);
    })
}


function deleteTask(task){
    var clickedId = task.data('id')
    
    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + clickedId
    })
    .then(function(data){
        task.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}