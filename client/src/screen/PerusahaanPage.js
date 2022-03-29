import axios from "axios";
import { useEffect, useState } from "react";

function PerusahaanPage() {
  const [perusahaanData, setPerusahaanData] = useState([]);
  const [inputPerusahaan, setInputPerusahaan] = useState("");
  const [editPerusahaan, setEditPerusahaan] = useState("");
  const [editId, setEditId] = useState();

  useEffect(() => {
    axios({ url: "http://localhost:3000/perusahaan", method: "get" })
      .then((data) => setPerusahaanData(data.data))
      .catch((err) => console.log(err));
  }, []);

  function onDeletePerusahaan(perusahaanId) {
    axios({ url: `http://localhost:3000/perusahaan/${perusahaanId}`, method: "delete" })
      .then((data) => {
        setPerusahaanData(perusahaanData.filter((x) => x.id != perusahaanId));
      })
      .catch((err) => console.log(err));
  }

  function onInputPerusahaan(perusahaanId) {
    axios({
      url: `http://localhost:3000/perusahaan`,
      method: "post",
      data: { name: inputPerusahaan },
    })
      .then((data) => {
        axios({ url: "http://localhost:3000/perusahaan", method: "get" })
          .then((data) => {
            setPerusahaanData(data.data);
            setInputPerusahaan("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function onEdit(perusahaanId) {
    axios({
      url: `http://localhost:3000/perusahaan/${editId}`,
      method: "put",
      data: { name: editPerusahaan },
    })
      .then((data) => {
        axios({ url: "http://localhost:3000/perusahaan", method: "get" })
          .then((data) => {
            setPerusahaanData(data.data);
            setInputPerusahaan("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <h1>Table perusahaan</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {perusahaanData?.map((e) => (
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
                  onClick={() => onDeletePerusahaan(e.id)}
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
                value={inputPerusahaan}
                onChange={(e) => {
                  setInputPerusahaan(e.target.value);
                }}
              />
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onInputPerusahaan();
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
                value={editPerusahaan}
                onChange={(e) => setEditPerusahaan(e.target.value)}
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

export default PerusahaanPage;
