import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "./Card";

function App() {
  const [data, setData] = useState([]);
  // const [totalData, setTotalData] = useState("");
  // const [checkData, setCheckData] = useState(0);

  async function getData() {
    try {
      const response = await axios.get("https://ivory-tame-sunstone.glitch.me/todos");

      // console.log(response.data);
      setData(response.data);
      // console.log(response.data.length);
      // setTotalData(response.data.length);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function deleteData(id) {
    try {
      Swal.fire({
        title: "Do you want to delete this?",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`https://ivory-tame-sunstone.glitch.me/todos/${id}`);

          Swal.fire({
            title: `Action is deleted`,
            icon: "success",
          });

          getData();
        }
      });
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: `Error ${error.response.status}`,
        text: error.response.data,
        icon: "error",
      });
    }
  }

  // function handleCheck(event) {
  //   if (event.currentTarget.checked) {
  //     setCheckData(checkData + 1);
  //   } else {
  //     setCheckData(checkData - 1);
  //   }
  // }

  const filterData = data.filter((el) => {
    return el.completed == true
  })

  async function handleCompleted(id, status){
    console.log(id, status);

    try {
      let input = status ? {completed: false} : {completed: true};
      const response =  await axios.patch(`https://ivory-tame-sunstone.glitch.me/todos/${id}`, input);

      getData();
      
      console.log(response);
      
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <>
      <div className="todo container-lg py-5">
        <h1 className="todoTitle text-uppercase fw-bold text-center mt-0 mb-5">
          todo list
        </h1>
        <div className="todoHeader d-flex align-items-center justify-content-between mb-3">
          <Link
            to={"/add"}
            className="todoHeaderAdd fw-medium text-capitalize rounded-1 px-3 py-2"
          >
            add task
          </Link>
          <div className="todoHeaderCount fw-medium rounded-1 px-3 py-2">
            Task: {filterData.length}/{data.length}
          </div>
        </div>
        <div className="todoBody w-100 p-3 p-lg-4">
          {data.map((el) => (
            <Card
              key={el.id}
              item={el}
              deleteData={deleteData}
              handleCompleted={handleCompleted}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
