import { Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/active" element={<TodoList />} />
        <Route path="/completed" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
