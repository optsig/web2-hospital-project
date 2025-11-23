import React, { useState } from "react";

function AdminDashboard() {
  var doctorO = {
    name: "",
    specialty: "",
  };

  const [docs, setDocs] = useState([]);

  const [state, setState] = useState(doctorO);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const remove = (value) => {
    setDocs(docs.filter((item) => item.name !== value));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-slate-50 h-full">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      <div className="mb-8 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setDocs([...docs, state]);
            setState(doctorO);
            console.log(docs);
          }}
        >
          <div>
            <input
              name="name"
              type="text"
              placeholder="Doctor's Name"
              value={state.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              name="specialty"
              type="text"
              placeholder="Specialty"
              value={state.specialty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Doctor
          </button>
        </form>
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-4 p-4">Current Doctors</h2>

        {docs.length === 0 && (
          <h1 className="text-lg font-thin text-gray-800 mb-4 p-4">
            No Doctors Found
          </h1>
        )}

        {docs.length !== 0 && (
          <ul className="space-y-4">
            {docs.map((doc, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-4 shadow rounded"
              >
                <div>
                  <p className="font-bold">{doc.name}</p>
                  <p className="text-sm text-gray-600">{doc.specialty}</p>
                </div>
                <button
                  onClick={() => remove(doc.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

  );
}

export default AdminDashboard;