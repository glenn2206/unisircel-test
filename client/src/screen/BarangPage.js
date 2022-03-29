import axios from "axios";
import { useEffect, useState } from "react";

function BarangPage() {
  const [barangData, setBarangData] = useState([]);
  const [inputBarang, setInputBarang] = useState("");
  const [editBarang, setEditBarang] = useState("");
  const [editId, setEditId] = useState();

  useEffect(() => {
    axios({ url: "http://localhost:3000/barang", method: "get" })
      .then((data) => setBarangData(data.data))
      .catch((err) => console.log(err));
  }, []);

  function onDeleteBarang(barangId) {
    axios({ url: `http://localhost:3000/barang/${barangId}`, method: "delete" })
      .then((data) => {
        setBarangData(barangData.filter((x) => x.id != barangId));
      })
      .catch((err) => console.log(err));
  }

  function onInputBarang(barangId) {
    axios({
      url: `http://localhost:3000/barang`,
      method: "post",
      data: { name: inputBarang },
    })
      .then((data) => {
        axios({ url: "http://localhost:3000/barang", method: "get" })
          .then((data) => {
            setBarangData(data.data);
            setInputBarang("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function onEdit(barangId) {
    axios({
      url: `http://localhost:3000/barang/${editId}`,
      method: "put",
      data: { name: editBarang },
    })
      .then((data) => {
        axios({ url: "http://localhost:3000/barang", method: "get" })
          .then((data) => {
            setBarangData(data.data);
            setInputBarang("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <h1>Table Barang</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {barangData?.map((e) => (
            <tr key={e.id}>
              <th scope="row">{e.id}</th>
              <td>{e.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setEditId(e.id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => onDeleteBarang(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row">Add</th>
            <td>
              <input
                value={inputBarang}
                onChange={(e) => {
                  setInputBarang(e.target.value);
                }}
              />
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onInputBarang();
                }}
              >
                ADD +++++
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Name
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                value={editBarang}
                onChange={(e) => setEditBarang(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => onEdit()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarangPage;
