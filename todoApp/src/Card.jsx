import { Link } from "react-router-dom";

export default function Card({ item, deleteData, handleCompleted }) {


  // console.log(item.id);
  return (
    <>
      <div className="card d-flex align-items-center justify-content-between px-3 py-4 w-100 flex-row bg-white">
        <div className="cardContent d-flex align-items-center gap-2">
          <label className="cardContentCheck d-flex align-items-center justify-content-center c-pointer">
            <input
              className="cardContentCheckInput c-pointer"
              type="checkbox"
              checked= {item.completed}
              onChange={() => {
                handleCompleted(item.id, item.completed)
              }}
            />
          </label>
          <p className="cardContentTitle m-0 text-capitalize fw-medium">
            {item.action}
          </p>
        </div>
        <div className="cardContent d-flex align-items-center gap-2">
          <button
            className="cardContentButton"
            onClick={() => {
              deleteData(item.id);
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <Link to={`/edit/${item.id}`} className="cardContentButton">
            <i className="fa-solid fa-pen" style={{ marginTop: "6px" }}></i>
          </Link>
        </div>
      </div>
    </>
  );
}
