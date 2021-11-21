import React from "react";
import { Link } from "react-router-dom";

function footer(props) {
  // const handleSelect = (e) => {
  //   props.setMode(e.target.value);
  // };
  return (
    <div
      style={{
        margin: "20px 0 0 0",
        display: "flex",
        justifyContext: "space-around",
      }}
    >
      <div className={"flex items-center mx-4"}>
        <Link
          to="/"
          className={
            "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          }
        >
          All ({`${props.count_all}`}){" "}
        </Link>
        <Link
          to="/active"
          className={
            "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          }
        >
          Active ({`${props.count_active}`}){" "}
        </Link>
        <Link
          to="/completed"
          className={
            "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          }
        >
          Completed ({`${props.count_completed}`}){" "}
        </Link>
      </div>
      {/*<div className="inline-block relative min-w-full">*/}
      {/*  <select*/}
      {/*    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"*/}
      {/*    onChange={handleSelect}*/}
      {/*    value={props.mode}*/}
      {/*  >*/}
      {/*    <option value="All">All ({`${props.count_all}`})</option>*/}
      {/*    <option value="Active">Active ({`${props.count_active}`})</option>*/}
      {/*    <option value="Completed">*/}
      {/*      Completed ({`${props.count_completed}`})*/}
      {/*    </option>*/}
      {/*  </select>*/}
      {/*  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">*/}
      {/*    <svg*/}
      {/*      className="fill-current h-4 w-4"*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*      viewBox="0 0 20 20"*/}
      {/*    >*/}
      {/*      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />*/}
      {/*    </svg>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default footer;
