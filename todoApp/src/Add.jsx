import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Add() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    action: "",
    completed: false,
  });

  function handleInput(event) {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleAdd(event) {
    event.preventDefault();
    try {

      if (!input.action) {
        Swal.fire({
          title: "Field cannot be empty",
          icon: "error",
        });
        return;
      }

      await axios.post("https://ivory-tame-sunstone.glitch.me/todos", input);

      Swal.fire({
        title: "Successfully added!",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  return (
    <>
      <div className="w-100 vh-100 d-flex align-items-center justify-content-center position-relative">
        <div className="update">
          <Link
            to={"/"}
            className="updateBack d-flex align-items-center gap-2 text-capitalize px-3 py-2 w-fit-content position-absolute"
          >
            <i className="fa-solid fa-left-long"></i>
            go back
          </Link>
          <form
            className="updateForm d-flex align-items-center justify-content-center gap-2"
            onSubmit={handleAdd}
          >
            <input
              className="updateFormInput fw-medium text-capitalize px-3 py-2"
              type="text"
              placeholder="Add Todo"
              name="action"
              onChange={handleInput}
            />
            <button className="updateFormButton fw-medium text-capitalize px-3 py-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
