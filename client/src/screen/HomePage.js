import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";

function HomePage() {
  const [transaksiData, settransaksiData] = useState([]);
  const [inputtransaksi, setInputtransaksi] = useState("");
  const [edittransaksi, setEdittransaksi] = useState("");
  const [editId, setEditId] = useState();
  const [dataBarang, setDataBarang] = useState([]);
  const [dataPerusahaan, setDataPerusahaan] = useState([]);
  const [inputBarang, setInputBarang] = useState("");
  const [inputPerusahaan, setInputPerusahaan] = useState("");

  useEffect(() => {
    axios({ url: "http://localhost:3000/transaksi", method: "get" })
      .then((data) => {
        console.log(data.data);
        settransaksiData(data.data);
      })
      .catch((err) => console.log(err));
    axios({ url: "http://localhost:3000/barang", method: "get" })
      .then((data) => setDataBarang(data.data))
      .catch((err) => console.log(err));
    axios({ url: "http://localhost:3000/perusahaan", method: "get" })
      .then((data) => setDataPerusahaan(data.data))
      .catch((err) => console.log(err));
  }, []);

  function onDeletetransaksi(transaksiId) {
    axios({
      url: `http://localhost:3000/transaksi/${transaksiId}`,
      method: "delete",
    })
      .then((data) => {
        settransaksiData(transaksiData.filter((x) => x.id != transaksiId));
      })
      .catch((err) => console.log(err));
  }

  function onInputtransaksi(transaksiId) {
      axios({
        url: `http://localhost:3000/transaksi`,
        method: "post",
        data: { PerusahaanId: inputPerusahaan, BarangId: inputBarang },
      })
        .then((data) => {
          axios({ url: "http://localhost:3000/transaksi", method: "get" })
            .then((data) => {
              settransaksiData(data.data);
              setInputPerusahaan("");
              setInputBarang("");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
  }

  function onEdit(transaksiId) {
    axios({
      url: `http://localhost:3000/transaksi/${editId}`,
      method: "put",
      data: { name: edittransaksi },
    })
      .then((data) => {
        axios({ url: "http://localhost:3000/transaksi", method: "get" })
          .then((data) => {
            settransaksiData(data.data);
            setInputtransaksi("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <h1>Table transaksi</h1>
      <CSVLink data={transaksiData}>Download me</CSVLink>;
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nama Perusahaan</th>
            <th scope="col">Nama Barang</th>
            <th scope="col">History Transaksi</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {transaksiData?.map((e) => (
            <tr key={e.id}>
              <th scope="row">{e.id}</th>
              <td>{e.Perusahaan?.name}</td>
              <td>{e.Barang?.name}</td>
              <td>{e.createdAt}</td>
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
                  onClick={() => onDeletetransaksi(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row">Add</th>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                value={inputPerusahaan}
                onChange={(e) => setInputPerusahaan(e.target.value)}
              >
                <option defaultValue>Open this select menu</option>
                {dataPerusahaan?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                value={inputBarang}
                onChange={(e) => setInputBarang(e.target.value)}
              >
                <option defaultValue>Open this select menu</option>
                {dataBarang?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </td>
            <td colSpan={2}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onInputtransaksi();
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
                value={edittransaksi}
                onChange={(e) => setEdittransaksi(e.target.value)}
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

export default HomePage;
