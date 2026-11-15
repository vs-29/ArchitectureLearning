import java.util.*;

class Todo {
    private final String id;
    private final String title;
    private final boolean done;

    Todo(String id, String title, boolean done) {
        this.id = id; this.title = title; this.done = done;
    }
    String getId() { return id; }

    @Override
    public String toString() {
        return "Todo{id=" + id + ", title=" + title + ", done=" + done + "}";
    }
}

interface TodoRepository {
    Optional<Todo> findById(String id);
    void save(Todo todo);
    List<Todo> findAll();
}

class InMemoryTodoRepository implements TodoRepository {
    private final Map<String, Todo> store = new HashMap<>();

    public Optional<Todo> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
    public void save(Todo todo) {
        store.put(todo.getId(), todo);
    }

    public List<Todo> findAll(){
       List<Todo> todos= new ArrayList<>();

       for(Todo todo:store.values()){
        todos.add(todo);
       }
        return todos;
    }
}

class TodoService {
    private final TodoRepository repo;

    TodoService(TodoRepository repo) { this.repo = repo; }

    Todo getTodoById(String id) {
        return repo.findById(id)
                   .orElseThrow(() -> new NoSuchElementException("Todo not found: " + id));
    }

    List<Todo> getAllTodos(){
        List<Todo> todos=repo.findAll();
        if (todos.isEmpty()) {
        throw new NoSuchElementException("No todos found");
    }
    return todos;

    }
}

class TodoController {
    private final TodoService service;

    TodoController(TodoService service) { this.service = service; }

    Todo handleGetTodo(String id) {
        return service.getTodoById(id);
    }
    List<Todo> HandleGetAllTodos(){
        return service.getAllTodos();
    }
}

public class TodoApp {
    public static void main(String[] args) {
        TodoRepository repo = new InMemoryTodoRepository();
        repo.save(new Todo("1", "Learn system design", false)); // sample data

        TodoService service = new TodoService(repo);
        TodoController controller = new TodoController(service);

        System.out.println(controller.handleGetTodo("1"));
        System.out.println(controller.HandleGetAllTodos());
    }
}