import React from "react";
import Todo from "./Todo";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase-config";

function TodoList() {
  // const [mode, setMode] = React.useState("All");
  const todosCollectionRef = collection(db, "todos");
  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState([
    // {
    //   id: 1,
    //   text: "Javascript 공부하기",
    //   checked: false,
    // },
  ]);

  const [filteredTodos, setFilteredTodos] = React.useState([]);

  const { pathname } = useLocation();

  function onChangeText(e) {
    setText(e.target.value);
  }

  async function addTodo() {
    await addDoc(todosCollectionRef, {
      text: text,
      checked: false,
    });
    // setTodos([
    //   ...todos,
    //   {
    //     id:
    //       todos.length === 0
    //         ? 1
    //         : Math.max.apply(
    //             Math,
    //             todos.map((x) => {
    //               return x.id;
    //             })
    //           ) + 1,
    //
    //     text: text,
    //     checked: false,
    //   },
    // ]);

    setText("");
  }

  function enterInput(e) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  async function toggleTodo(id, checked) {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, { checked: !checked });
    // let bool = todos.map((x) => {
    //   if (x.id === id) {
    //     return !x.checked;
    //   }
    // });
    // await updateDoc(docRef, {
    //   checked: bool,
    // });
    // setTodos(
    //
    //   // todos.map((x) => {
    //   //   if (x.id === id) {
    //   //     return {
    //   //       ...x,
    //   //       checked: !x.checked,
    //   //     };
    //   //   } else {
    //   //     return x;
    //   //   }
    //   // })
    // );
  }

  async function deleteTodo(id) {
    // setTodos(todos.filter((x) => x.id !== id));
    await deleteDoc(doc(db, "todos", id));
  }

  function clearCompleted() {
    setTodos(todos.filter((x) => !x.checked));
  }

  function allDone() {
    if (todos.filter((x) => !x.checked).length === 0) {
      setTodos(
        todos.map((x) => ({
          ...x,
          checked: false,
        }))
      );
    } else {
      setTodos(
        todos.map((x) => ({
          ...x,
          checked: true,
        }))
      );
    }
  }

  function onEdit(id, text) {
    setTodos(
      todos.map((x) => {
        if (x.id === id) {
          return {
            ...x,
            text,
          };
        } else {
          return x;
        }
      })
    );
  }

  React.useEffect(() => {
    const unsub = onSnapshot(todosCollectionRef, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsub();
    };
  }, []);

  React.useEffect(() => {
    setFilteredTodos(
      todos.filter((x) => {
        // if (mode === "Active") {
        if (pathname === "/active") {
          return !x.checked;
          // } else if (mode === "Completed") {
        } else if (pathname === "/completed") {
          return x.checked;
        } else {
          return true;
        }
      })
    );
    // const getData = async () => {
    //   const data = await getDocs(todosCollectionRef);
    //   setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getData();
  }, [pathname, todos]);

  return (
    <div
      className={"min-h-screen flex justify-center items-center bg-gray-200"}
    >
      <div className={"m-10"}>
        <h1 className={"text-8xl text-gray-600 text-center m-10"}>Todos</h1>

        <div className={"p-5 bg-white"}>
          <Header
            allDone={allDone}
            onChangeText={onChangeText}
            enterInput={enterInput}
            text={text}
            addTodo={addTodo}
          />
          {filteredTodos.map((x, i) => (
            <Todo
              key={i}
              id={x.id}
              text={x.text}
              checked={x.checked}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              allDone={allDone}
              onEdit={onEdit}
            />
          ))}
          <Footer
            count_all={todos.length}
            count_active={todos.filter((x) => !x.checked).length}
            count_completed={todos.filter((x) => x.checked).length}
            // setMode={setMode}
            clearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
