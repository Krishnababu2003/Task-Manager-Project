package com.krishnababu.task_manager_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krishnababu.task_manager_api.model.Task;
import com.krishnababu.task_manager_api.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task saveTask(Task task) {
        return repo.save(task);
    }

    public Task updateTask(Long id, Task task) {
        Task t = repo.findById(id).orElseThrow();
        t.setTitle(task.getTitle());
        t.setStatus(task.getStatus());
        return repo.save(t);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}
