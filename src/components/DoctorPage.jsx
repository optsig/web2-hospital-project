import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function DoctorPage() {

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };

  const { username, userId } = useContext(GlobalContext);

  const AvailabilityO = {
    date: "",
    time: ""
  };

  const [doctorAvailability, setDoctorAvailability] = useState(AvailabilityO);
  const [doctorAvailabilityList, setDoctorAvailabilityList] = useState([]);
  const [bookedAppointmentList, setBookedAppointmentList] = useState([]);

  const [editIndex, setEditIndex] = useState(null);


  const handleChange = (e) => {
    setDoctorAvailability({ ...doctorAvailability, [e.target.name]: e.target.value });
  };

  const getDoctorAvailabilities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getdoctoravailabilities/" + userId);
      if (response.status === 200) {
        console.log('====================================');
        console.log("AVAILABILITIES RESPONSE STRUCTURE: ", response.data);
        console.log('====================================');
        setDoctorAvailabilityList(response.data);
      } else if (response.status === 204) {
        setDoctorAvailabilityList([]);
      }
    } catch (error) {
      console.log("error in getDoctorAvailabilities:", error);
    }
  };

  const getDoctorAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getdoctorappointments/" + userId);
      if (response.status === 200) {
        console.log("APPOINTMENTS RESPONSE STRUCTURE: ", response.data[0]);
        setBookedAppointmentList(response.data);
      } else if (response.status === 204) {
        setBookedAppointmentList([]);
      }
    } catch (error) {
      console.log("error in getDoctorAppointments:", error);
    }
  };

  useEffect(() => {
    getDoctorAvailabilities();
    getDoctorAppointments();
  }, []);



  const addAvailability = async () => {
    const { date, time } = doctorAvailability;

    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    try {
      console.log('====================================');
      console.log("ID: ", userId);
      console.log('====================================');
      const response = await axios.post("http://localhost:5000/addavailability", { userId, date, time });
      if (response.status === 201) {
        toast.success("Availability added");
        setDoctorAvailability(AvailabilityO);
        getDoctorAvailabilities();
      }
    } catch (error) {
      toast.error("Failed to add availability");
      console.log("error in addAvailability:", error);
    }
  };

  const updateAvailability = async () => {
    if (editIndex === null) {
      toast.error("Select a slot first");
      return;
    }

    const availabilityId = doctorAvailabilityList[editIndex].id;

    try {
      const response = await axios.put("http://localhost:5000/updateavailability/" + availabilityId,
        {
          date: doctorAvailability.date,
          time: doctorAvailability.time,
        }
      );

      if (response.status === 200) {
        toast.success("Availability updated");
        setDoctorAvailability(AvailabilityO);
        setEditIndex(null);
        getDoctorAvailabilities();
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("This slot is already booked");
      } else {
        toast.error("Failed to update availability");
      }
      console.log("error in updateAvailability:", error);
    }
  };


  const cancelAvailability = (availabilityId) => {
    Swal.fire({
      icon: "warning",
      text: "Confirm cancellation of this availability slot?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("http://localhost:5000/deleteavailability/" + availabilityId);
          if (response.status === 200) {
            toast.info("availability canceled");
            getDoctorAvailabilities();
          }
        } catch (error) {
          if (error.response.status === 409) {
            toast.error("this slot is already booked");
          } else {
            toast.error("failed to cancel availability");
          }
          console.log("error in cancelAvailability:", error);
        }
      }
    });
  };

  const cancelAppointment = (appointment) => {
    Swal.fire({
      icon: "warning",
      text: `Cancel appointment with ${appointment.first_name} ${appointment.last_name}?`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("http://localhost:5000/doctor/deleteappointment/" + appointment.id);

          if (response.status === 200) {
            toast.info("Appointment canceled");
            getDoctorAppointments();
            getDoctorAvailabilities();
          }
        } catch (error) {
          if (error.response.status === 404) {
            toast.error("Appointment no longer exists");
            getDoctorAppointments();
          } else {
            toast.error("Failed to cancel appointment");
          }
          console.log("error in cancelAppointment:", error);
        }
      }
    });
  };

  const selectForUpdate = (entry, index) => {
    const formattedDate = entry.availability_date.split('T')[0];
    setDoctorAvailability({
      date: formattedDate ,
      time: entry.availability_time,
    });
    setEditIndex(index);
  };


  return (
    <div className="p-4 md:p-8 max-w-6xl my-12 mx-auto bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8 border-b pb-4 capitalize">
        Hello {username}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-blue-50 shadow-lg p-6 rounded-lg border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm">Booked Appointments</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{bookedAppointmentList.length}</p>
        </div>
        <div className="bg-green-50 shadow-lg p-6 rounded-lg border-l-4 border-green-600">
          <p className="text-gray-600 text-sm">Availabilities</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{doctorAvailabilityList.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="p-6 bg-gray-50 rounded-xl shadow-inner border">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            {editIndex !== null ? "Edit Availability" : "Add New Availability"}
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                name="date"
                type="date"
                value={doctorAvailability.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                name="time"
                type="time"
                value={doctorAvailability.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={addAvailability}
                disabled={editIndex !== null}
                className={`flex-1 font-semibold py-2 rounded-md transition duration-150 shadow-md ${editIndex !== null ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Add Slot
              </button>
              <button
                type="button"
                onClick={updateAvailability}
                disabled={editIndex === null}
                className={`flex-1 font-semibold py-2 rounded-md transition duration-150 shadow-md ${editIndex === null ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                Update
              </button>
            </div>
            {editIndex !== null && (
              <button
                onClick={() => { setEditIndex(null); setDoctorAvailability(AvailabilityO) }}
                className="w-full text-sm text-black"
              >
                Cancel Editing
              </button>
            )}
          </form>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Current Availabilities</h2>
          {doctorAvailabilityList.length === 0 ? (
            <p className="text-lg font-thin text-gray-600">No availability slots added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctorAvailabilityList.map((entry, index) => (
                    <tr key={index} className={editIndex === index ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(entry.availability_date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTime(entry.availability_time)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => selectForUpdate(entry, index)}
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-md text-sm transition"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => cancelAvailability(entry.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Booked Appointments</h2>

        {bookedAppointmentList.length === 0 && (
          <p className="text-lg font-thin text-gray-600">No current booked appointments.</p>
        )}

        {bookedAppointmentList.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookedAppointmentList.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{entry.first_name + " " + entry.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(entry.availability_date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTime(entry.availability_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => cancelAppointment(entry)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-150"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPage;