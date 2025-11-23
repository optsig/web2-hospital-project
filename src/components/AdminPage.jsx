import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AdminDashboard() {

  var DoctorO = {
    fullName: "",
    specialty: "",
  }

  const [doctor, setDoctor] = useState(DoctorO)

  const [doctorList, setDoctorList] = useState([])

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value })
  }

  const deleteDoctor = (targetName) => {
    setDoctorList(doctorList.filter((entry) => entry.fullName !== targetName))
  }
  return (
    <div className="p-8 max-w-3xl my-24 mx-auto bg-slate-50 h-full">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-500 text-sm">Total Doctors</p>
          <p className="text-2xl font-bold">{doctorList.length}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-500 text-sm">Total Patients</p>
          <p className="text-2xl font-bold">32</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>

      <div>
        <div className="mb-8 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
          <form
            className="space-y-4"

            onSubmit={(e) => {
              e.preventDefault()
              if (!doctor.fullName.trim() || !doctor.specialty.trim()) {
                toast.error("Please fill in both the name and specialty fields.")
                return
              }
              setDoctorList([...doctorList, doctor])
              setDoctor(DoctorO)
              toast.success("Doctor added successfully!");
              console.log(doctorList)
            }}
          >
            <div>
              <input
                name="fullName"
                type="text"
                placeholder="Doctor's Name"
                value={doctor.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                name="specialty"
                type="text"
                placeholder="Specialty"
                value={doctor.specialty}
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

          {doctorList.length === 0 && (
            <h1 className="text-lg font-thin text-gray-800 mb-4 p-4">
              No Doctors Found
            </h1>
          )}

          {doctorList.length !== 0 && (
            <ul className="space-y-4">
              {doctorList.map((entry, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 shadow rounded"
                >
                  <div>
                    <p className="font-bold">{entry.fullName}</p>
                    <p className="text-sm text-gray-600">{entry.specialty}</p>
                  </div>
                  <button
                    onClick={() => deleteDoctor(entry.fullName)}
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
    </div>
  )
}

export default AdminDashboard