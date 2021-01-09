import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Booking from "../Booking/Booking";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });
  const handleDateCheckIn = (date) => {
    const newCheckIn = { ...selectedDate };
    newCheckIn.checkIn = date;
    setSelectedDate(newCheckIn);
  };
  const handleDateCheckOut = (date) => {
    const newCheckOut = { ...selectedDate };
    newCheckOut.checkOut = date;
    setSelectedDate(newCheckOut);
  };

  const handleBooking = () => {
    const booking = { ...selectedDate };
    fetch("http://localhost:5000/addBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    }).then((data) => {
      if (data) {
        alert("data insert successfully");
      }
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Let's book a {bedType} Room.</h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="CheckIn"
            label="CheckIn"
            value={selectedDate.checkIn}
            onChange={handleDateCheckIn}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="CheckOut"
            label="CheckOut"
            format="dd/MM/yyyy"
            value={selectedDate.checkOut}
            onChange={handleDateCheckOut}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Button variant="contained" color="primary" onClick={handleBooking}>
        Booking
      </Button>
      <Booking />
    </div>
  );
};

export default Book;
