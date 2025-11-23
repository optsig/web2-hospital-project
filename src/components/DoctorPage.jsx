import React, { useState } from "react";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function DoctorPage() {


  var AvailabilityO = {
    date: "",
    time: "",
  }

  const initialAppointments = [
    { patient: "Alice Johnson", date: "2025-11-25", time: "10:00 AM", reason: "Annual checkup" },
    { patient: "Bob Smith", date: "2025-11-25", time: "02:30 PM", reason: "Follow-up consultation" },
    { patient: "Charlie Brown", date: "2025-11-26", time: "09:00 AM", reason: "New patient visit" },
  ];

  const [doctorAvailability, setDoctorAvailability] = useState(AvailabilityO);
  const [doctorAvailabilityList, setDoctorAvailabilityList] = useState([]);
  const [bookedAppointmentList, setBookedAppointmentList] = useState(initialAppointments);

  const handleChange = (e) => {
    setDoctorAvailability({ ...doctorAvailability, [e.target.name]: e.target.value });
  };

  const addAvailability = (e) => {
    e.preventDefault();
    const { date, time } = doctorAvailability;

    if (!date.trim() || !time.trim()) {
      toast.error("Please select both date and time for availability");
      return;
    }
    setDoctorAvailabilityList([...doctorAvailabilityList, doctorAvailability]);
    setDoctorAvailability(AvailabilityO);
    toast.success(`Availability added successfully`);
  }

  const cancelAvailability = (targetDate, targetTime) => {
    Swal.fire({
      icon: 'warning',
      text: `Confirm cancellation of availability for ${targetDate} at ${targetTime}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setDoctorAvailabilityList(doctorAvailabilityList.filter(
          (entry) => entry.date !== targetDate || entry.time !== targetTime
        ));
        toast.info("Availability slot was canceled successfully");
      }
    });
  };

  const cancelAppointment = (patientName) => {
    Swal.fire({
      icon: 'warning',
      text: `Are you sure you want to cancel the appointment with ${patientName}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setBookedAppointmentList(bookedAppointmentList.filter((entry) => entry.patient !== patientName));
        toast.info(`Appointment with ${patientName} was canceled`);
      }
    });
  };


  return (
    <div className="p-4 md:p-8 max-w-6xl my-12 mx-auto bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8 border-b pb-4">
        Doctor Dashboard
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add New Availability</h2>
          <form className="space-y-4" onSubmit={addAvailability}>

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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-150 shadow-md"
            >
              Add Slot
            </button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctorAvailabilityList.map((entry) => (
                    <tr key={entry.date + entry.time}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => cancelAvailability(entry.date, entry.time)}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookedAppointmentList.map((entry) => (
                  <tr key={entry.patient}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => cancelAppointment(entry.patient)}
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