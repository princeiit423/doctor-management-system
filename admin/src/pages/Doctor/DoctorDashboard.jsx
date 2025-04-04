import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
const DoctorDashboard = () => {
  const { dashData, setDashData, getDashData, dToken,completeAppointment,cancelAppointment } =
    useContext(DoctorContext);

  const {currency,slotDateFormat}= useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200">
            <img className="w-14" src={assets.earning_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
              {currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200">
            <img className="w-14" src={assets.appointments_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}{" "}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200">
            <img className="w-14" src={assets.patients_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}{" "}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t">
            <img src={assets.list_icon} />
            <p>Latest Booking</p>
          </div>
          <div className="pt-4 border-t-0">


            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}{" "}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}{" "}
                  </p>
                </div>
                {item.cancelled ? (
                              <p className="text-red-400 text-sm font-medium">Cancelled</p>
                            ) : item.isCompleted ? (
                              <p className="text-green-500 text-sm font-medium">Completed</p>
                            ) : (
                              <div className="flex gap-3">
                                <button
                                  onClick={() => cancelAppointment(item._id)}
                                  className="p-2 rounded-full hover:bg-red-100 transition"
                                >
                                  <img className="w-8" src={assets.cancel_icon} alt="Cancel" />
                                </button>
                                <button
                                  onClick={() => completeAppointment(item._id)}
                                  className="p-2 rounded-full hover:bg-green-100 transition"
                                >
                                  <img className="w-8" src={assets.tick_icon} alt="Approve" />
                                </button>
                              </div>
                            )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
