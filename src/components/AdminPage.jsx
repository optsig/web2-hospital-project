import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { GlobalContext } from "./GlobalContext"

function AdminDashboard() {

  const {username} = useContext(GlobalContext)

  var DoctorO = {
    firstName: "",
    lastName: "",
    specialty: "",
    username: "",
    password: ""
  }

  const [doctor, setDoctor] = useState(DoctorO)

  const [doctorList, setDoctorList] = useState([])

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value })
  }

  const deleteDoctor = (targetFirstName, targetLastName, targetId) => {
    Swal.fire({
      icon: 'warning',
      text: `Delete Dr. ${targetFirstName} ${targetLastName}?`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("http://localhost:5000/doctors/" + targetId)
          if (response.status === 200) {
            setDoctorList(doctorList.filter((doctor) => doctor.id !== targetId))
            toast.info("Doctor was deleted successfully")
            getDoctors()
          }
        }
        catch (error) {
          if(error.response.status === 404 && error.response.type === "doctor_not_found"){
            toast.error("doctor was already deleted")
            getDoctors()
          }
          console.log("ERROR IN DELETE DOCTOR: ", error)
        }
      }
    })
  }

  const addDoctor = async () => {
    const doctorToAdd = doctor
    if (!doctor.firstName) {
      toast.error("please fill in the first name")
    }
    if (!doctor.lastName) {
      toast.error("please fill in the last name")
    }
    if (!doctor.specialty) {
      toast.error("please fill in the specialty")
    }
    if (!doctor.username) {
      toast.error("please fill in the username")
    }
    if (!doctor.password) {
      toast.error("please fill in the password")
    }

    try {
      const response = await axios.post("http://localhost:5000/adddoctor", doctor)
      if (response.status === 201) {
        const newDoctor = { ...doctorToAdd }
        setDoctorList([...doctorList, newDoctor])
        setDoctor(DoctorO)
        toast.success("doctor added successfully")
        getDoctors()
      }
    }
    catch (error) {
      if (error.response.status === 400 && error.response.data.type === "duplicate_user") {
        toast.error("username already exists")
      }
      else if (error.response.status === 400 && error.response.data.type === "duplicate_doctor") {
        toast.error("doctor with the same first and last names exists already exists")
      }
      console.log("ERROR IN ADD DOCTOR: ", error);
    }
  }

  const getDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getdoctors")
      console.log("RESPONSE IN GETDOCTORS:", response)
      if (response.status === 200) {
        setDoctorList(response.data)
      }
    }
    catch (error) {
      console.log("error in getDoctors: ", error)
    }
  }

  const [appointmentsNum, setAppointmentsNum] = useState()

  const getAppointmentsNumber = async() => {
    try{
      const response = await axios.get("http://localhost:5000/getnumberofappointments")
      console.log("response in getAppointmentsNumber:", response)
       if (response.status === 200) {
        console.log("RESPONSE STRUCTURE:", response)
        setAppointmentsNum(response.data.count)
      }
    }
    catch (error) {
      console.log("error in get getAppointmentsNumber:", error)
    }
  }

  const [patientsNum, setPatientsNum] = useState()

  const getPatientsNum = async() => {
    try{
      const response = await axios.get("http://localhost:5000/getnumberofpatients")
       if (response.status === 200) {
        setPatientsNum(response.data.count)
      }
    }
    catch (error) {
      console.log("error in get getPatientsNum:", error)
    }
  }

  useEffect(() => {
    getDoctors()
    getAppointmentsNumber()
    getPatientsNum()
  }, [])


  return (
    <div className="p-8 max-w-3xl my-24 mx-auto bg-slate-50 h-full">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 capitalize">Hello {username}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-500 text-sm">Total Doctors</p>
          <p className="text-2xl font-bold">{doctorList.length}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-500 text-sm">Total Patients</p>
          <p className="text-2xl font-bold">{patientsNum}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <p className="text-2xl font-bold">{appointmentsNum}</p>
        </div>
      </div>

      <div>
        <div className="mb-8 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
          <form
            className="space-y-4"

            onSubmit={(e) => {
              e.preventDefault()
              addDoctor()
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

            <div>
              <input
                name="username"
                type="text"
                placeholder="Doctor's username"
                value={doctor.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <input
                name="password"
                type="text"
                placeholder="Doctor's password"
                value={doctor.password}
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
                    <p className="font-bold capitalize">{entry.first_name + " " + entry.last_name}</p>
                    <p className="text-sm text-gray-600 capitalize">{entry.specialty}</p>
                  </div>
                  <button
                    onClick={() => deleteDoctor(entry.first_name, entry.last_name, entry.id)}
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