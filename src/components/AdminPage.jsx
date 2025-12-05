import { useState } from "react"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'


function AdminDashboard() {

  var DoctorO = {
    firstName: "",
    lastName: "",
    specialty: ""
  }

  const [doctor, setDoctor] = useState(DoctorO)

  const [doctorList, setDoctorList] = useState([])

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value })
  }

  const deleteDoctor = (targetFirstName, targetLastName, targetIndex) => {
    Swal.fire({
      icon: 'warning',
      text: `Delete Dr. ${targetFirstName} ${targetLastName}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setDoctorList(doctorList.filter((entry) => entry.firstName !== targetFirstName || entry.lastName !==  targetLastName));
        toast.info("Doctor was deleted successfully");
      }
    })
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
              if (!doctor.firstName.trim() || !doctor.specialty.trim() || !doctor.lastName.trim()) {
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
                name="firstName"
                type="text"
                placeholder="Doctor's First Name"
                value={doctor.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                name="lastName"
                type="text"
                placeholder="Doctor's Last Name"
                value={doctor.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <input
                name="specialty"
                type="text"
                placeholder="Doctor's Specialty"
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
                    <p className="font-bold">{entry.firstName} {entry.lastName}</p>
                    <p className="text-sm text-gray-600">{entry.specialty}</p>
                  </div>
                  <button
                    onClick={() => deleteDoctor(entry.firstName, entry.lastName, entry.index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
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