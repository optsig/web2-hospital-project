import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GlobalContext } from "./GlobalContext"


function PatientPage() {

  const { username, userId } = useContext(GlobalContext)

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


  const [availableSlots, setAvailableSlots] = useState([]);

  const [patientAppointmentsList, setPatientAppointmentsList] = useState([]);

  const bookAppointment = (slot) => {
    Swal.fire({
      icon: "question",
      text: `Book an appointment with Dr.${slot.first_name + " " + slot.last_name} on ${formatDate(slot.availability_date)} at ${formatTime(slot.availability_time)}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleBooking(slot.id)
      }
    });
  };

  const cancelAppointment = (appointment) => {
    Swal.fire({
      icon: "warning",
      text: `Cancel your appointment with Dr. ${appointment.first_name} ${appointment.last_name}?`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("https://web2-hospital-backend.onrender.com/appointments/" + appointment.id);
          if (response.status === 200) {
            toast.info("appointment was canceled");
            getAppointments();
            getAvailabilities();
          }
        }
        catch (error) {
          if (error.response.status === 404) {
            toast.error("This appointment no longer exists.");
            getAppointments();
            getAvailabilities();
          }
          console.log("error in cancel appointment: ", error);
        }
      }
    });
  };

  const handleBooking = async (avId) => {
    console.log("Attempting to book with:", { userId, availabilityId: avId });
    try {
      const response = await axios.post("https://web2-hospital-backend.onrender.com/bookappointment", { userId: userId, availabilityId: avId })
      if (response.status === 201) {
        toast.success("appointment booked successfully")
        getAvailabilities()
        getAppointments()
      }
    }
    catch (error) {
      // if (error.response.status === 400) {
      //   toast.error("something went wrong, please relogin")
      // }
      if (error.response.status === 404) {
        toast.error("This availability got canceled")
        getAvailabilities()
      }
      else if (error.response.status === 409) {
        toast.error("this slot was just booked by someone else")
        getAvailabilities()
      }
      console.log("ERROR IN ADD handle Booking: ", error);

    }
  }

  const getAvailabilities = async () => {
    try {
      const response = await axios.get("https://web2-hospital-backend.onrender.com/getavailabilities")
      console.log("RESPONSE IN getAvailabilities:", response)
      if (response.status === 200) {
        console.log("AVAILABILITY RESPONSE DATA FORMAT:", response.data)
        setAvailableSlots(response.data)
      }
      else if (response.status === 204) {
        setAvailableSlots([])
      }
    }
    catch (error) {
      console.log("error in getDoctors: ", error)
    }
  }

  const getAppointments = async () => {
    try {
      console.log("USER ID: ", userId);
      const response = await axios.get("https://web2-hospital-backend.onrender.com/getappointments/" + userId)
      if (response.status === 200) {
        console.log("APPTS RESPONSE DATA FORMAT:", response.data)
        setPatientAppointmentsList(response.data)
      }
      if (response.status === 204) {
        setPatientAppointmentsList([]);
        console.log("no appts found for user_id: ", userId);

      }

    }
    catch (error) {
      console.log("error in getAppointments: ", error)
    }
  }

  useEffect(() => {
    getAvailabilities()
    getAppointments()
  }, [])



  return (
    <div className="p-4 md:p-8 max-w-6xl my-12 mx-auto bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8 border-b pb-4 capitalize">
        Hello {username}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-blue-50 shadow-lg p-6 rounded-lg border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm">Available Slots</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{availableSlots.length}</p>
        </div>

        <div className="bg-green-50 shadow-lg p-6 rounded-lg border-l-4 border-green-600">
          <p className="text-gray-600 text-sm">My Appointments</p>
          <p className="text-3xl font-bold text-green-800 mt-1">
            {patientAppointmentsList.length}
          </p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-lg border mb-12">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Available Appointments</h2>

        {availableSlots.length === 0 && (
          <p className="text-lg font-thin text-gray-600">No available slots at the moment.</p>
        )}

        {availableSlots.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {availableSlots.map((slot, index) => (
                  <tr key={slot.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {slot.first_name + " " + slot.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(slot.availability_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(slot.availability_time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {slot.specialty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => bookAppointment(slot)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition duration-150"
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-6 bg-white rounded-xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">My Appointments</h2>

        {patientAppointmentsList.length === 0 && (
          <p className="text-lg font-thin text-gray-600">No booked appointments.</p>
        )}

        {patientAppointmentsList.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {patientAppointmentsList.map((entry, index) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {entry.first_name + " " + entry.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(entry.availability_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(entry.availability_time)}
                    </td>
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

export default PatientPage;