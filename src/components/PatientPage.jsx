import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function PatientPage() {

  const [availableSlots, setAvailableSlots] = useState([]);

  const [patientAppointmentsList, setPatientAppointmentsList] = useState([]);

  const bookAppointment = (slot) => {
    Swal.fire({
      icon: "question",
      text: `Book an appointment with ${slot.doctor} on ${slot.date} at ${slot.time}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setPatientAppointmentsList([...patientAppointmentsList, slot]);
        setAvailableSlots(
          availableSlots.filter(
            (s) =>
              !(
                s.doctor === slot.doctor &&
                s.date === slot.date &&
                s.time === slot.time
              )
          )
        );
        toast.success("Appointment booked successfully");
      }
    });
  };

  const cancelAppointment = (doctorName) => {
    Swal.fire({
      icon: "warning",
      text: `Cancel your appointment with ${doctorName}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setPatientAppointmentsList(
          patientAppointmentsList.filter((entry) => entry.doctor !== doctorName)
        );
        toast.info("Appointment was canceled");
      }
    });
  };

  const getAvailabilities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getavailabilities")
      console.log("RESPONSE IN getAvailabilities:", response)
      if (response.status === 200) {
        setAvailableSlots(response.data)
        console.log("AVAILABILITY RESPONSE DATA FORMAT:", response.data)
      }
      else if (response.status === 204) {
        setAvailableSlots([])
      }
    }
    catch (error) {
      console.log("error in getDoctors: ", error)
    }
  }

  useEffect(() => {
    getAvailabilities()
  }, [])



  return (
    <div className="p-4 md:p-8 max-w-6xl my-12 mx-auto bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8 border-b pb-4">
        Patient Dashboard
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
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {slot.first_name + " " + slot.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slot.availability_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slot.availability_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => cancelAppointment(entry.doctor)}
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