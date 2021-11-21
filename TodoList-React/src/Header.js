import React from "react";

function header(props) {
  return (
    <React.Fragment>
      <div
        className={"flex items-center border-b border-teal-500 py-2"}
        style={{
          margin: "0 0 20px 0",
        }}
      >
        <button
          onClick={props.allDone}
          className={
            "flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          }
        >
          ✓
        </button>
        <input
          className={
            "appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          }
          type="text"
          placeholder="Todo"
          onChange={props.onChangeText}
          value={props.text}
          onKeyPress={props.enterInput}
        />
        <button
          className={
            "flex-shrink-0 bg-gray-500 hover:bg-gray-800 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
          }
          type="button"
          onClick={props.addTodo}
        >
          Submit
        </button>
      </div>
      {/*<input*/}
      {/*  onChange={props.onChangeText}*/}
      {/*  value={props.text}*/}
      {/*  onKeyPress={props.enterInput}*/}
      {/*/>*/}
    </React.Fragment>
  );
}

export default header;
