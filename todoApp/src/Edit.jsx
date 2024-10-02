import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    action: "",
    completed: false,
  });

  async function getDataById() {
    try {
      const response = await axios.get(`https://ivory-tame-sunstone.glitch.me/todos/${id}`);

      //   console.log(response.data.action);

      setInput({
        action: response.data.action,
        completed: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataById();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleEdit(event) {
    event.preventDefault();
    try {

      if (!input.action) {
        Swal.fire({
          title: "Field cannot be empty",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Do you want to change this action?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {

        if (result.isConfirmed) {
          await axios.put(`https://ivory-tame-sunstone.glitch.me/todos/${id}`, input);

          Swal.fire({
            title: `Successfully Updated!`,
            icon: "success",
          });

          navigate("/");
        }
        
      });

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
            onSubmit={handleEdit}
          >
            <input
              className="updateFormInput fw-medium text-capitalize px-3 py-2"
              type="text"
              name="action"
              value={input.action}
              onChange={handleChange}
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
