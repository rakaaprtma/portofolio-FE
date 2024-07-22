import React, { useState, useEffect } from 'react';
import './App.css';
import raka from '../src/assets/tess.jpg';

type Pengguna = {
  id: number;
  nama: string;
  jurusan: string;
};

function App() {
  const [pengguna, setPengguna] = useState<Pengguna[]>([]);
  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/get-pengguna');
      const data = await response.json();
      if (data.success) {
        setPengguna(data.data);
      } else {
        console.error('Failed to fetch data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editId ? 'http://localhost:3000/update-pengguna' : 'http://localhost:3000/store-pengguna';
      const method = 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editId, nama, jurusan })
      });
      const data = await response.json();
      if (data.success) {
        alert('Data berhasil disimpan');
        setNama('');
        setJurusan('');
        setEditId(null);
        fetchData();
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (pengguna: Pengguna) => {
    setNama(pengguna.nama);
    setJurusan(pengguna.jurusan);
    setEditId(pengguna.id);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('http://localhost:3000/deleted-pengguna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        alert('Data berhasil dihapus');
        fetchData();
      } else {
        alert('Gagal menghapus data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a href="#">Portfolio</a></li>
              <li>
                <a href="#">About</a>
                <ul className="p-2">
                  <li><a href="https://www.instagram.com/_rakaaprtma" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="https://github.com/rakaaprtma" target="_blank" rel="noopener noreferrer">Github</a></li>
                </ul>
              </li>
              <li><a href="#">UI/UX</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">UI/UX</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li><a href="#">Home</a></li>
            <li>
              <details>
                <summary>About</summary>
                <ul className="p-2">
                  <li><a href="https://www.instagram.com/_rakaaprtma" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="https://github.com/rakaaprtma" target="_blank" rel="noopener noreferrer">Github</a></li>
                </ul>
              </details>
            </li>
            <li><a href="mailto:pratamaraka32030@gmail.com" target="_blank" rel="noopener noreferrer">E-mail</a></li>
          </ul>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img src={raka} className="max-w-sm rounded-lg shadow-2xl" alt="Raka Pratama" />
          <div>
            <h1 className="text-5xl font-bold text-blue-500">Hi, I'm Raka Pratama!</h1>
            <p className="py-6 text-xl text-white">
              Halo! Saya Raka Pratama, seorang UI/UX Designer dengan rasa ingin tahu yang tinggi dan semangat yang besar. 👋
              Saya berdedikasi untuk menciptakan pengalaman pengguna yang tak hanya indah secara visual, tetapi juga fungsional dan intuitif. Di setiap proyek, saya selalu mencari cara untuk mendorong batasan dan menemukan solusi desain yang inovatif.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Data Pengguna</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama"
            className="input input-bordered w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="text"
            placeholder="Jurusan"
            className="input input-bordered w-full"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full">
            {editId ? 'Update' : 'Tambah'} Pengguna
          </button>
        </form>
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengguna.length > 0 ? (
                pengguna.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td className="text-center">{item.jurusan}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-secondary mr-2">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-error">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ... (rest of the code) */}
    </>
  );
}

export default App;
