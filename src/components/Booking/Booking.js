import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/booking?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, []);
  return (
    <div>
      <h1>my booking</h1>
      {booking.map((booking) => {
        return (
          <p>
            {booking.email} from {"  "}
            {new Date(booking.checkIn).toDateString("dd/MM/yyyy")} to {"  "}
            {new Date(booking.checkOut).toDateString("dd/MM/yyyy")}
          </p>
        );
      })}
    </div>
  );
};

export default Booking;
