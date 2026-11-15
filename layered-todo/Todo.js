// Model
class Todo {
  constructor(id, title, done = false) {
    this.id = id;
    this.title = title;
    this.done = done;
  }
}

// Repository layer: data access only
// (No interfaces in JS: any class with findById/save works here)
class InMemoryTodoRepository {
  #store = new Map(); // # makes it private

  findById(id) {
    return this.#store.get(id) ?? null;
  }

  save(todo) {
    this.#store.set(todo.id, todo);
  }
}

// Service layer: business logic
class TodoService {
  #repo;

  constructor(repo) {
    this.#repo = repo;
  }

  getTodoById(id) {
    const todo = this.#repo.findById(id);
    if (!todo) {
      throw new Error(`Todo not found: ${id}`);
    }
    return todo;
  }
}

// Controller layer: handles requests and responses
class TodoController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  handleGetTodo(id) {
    try {
      return { status: 200, body: this.#service.getTodoById(id) };
    } catch (err) {
      return { status: 404, body: { error: err.message } };
    }
  }
}

// Wiring
const repo = new InMemoryTodoRepository();
repo.save(new Todo("1", "Learn system design"));

const service = new TodoService(repo);
const controller = new TodoController(service);

console.log(controller.handleGetTodo("1"));
console.log(controller.handleGetTodo("2"));