import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        // ({
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, [setState]);

  const bookInterview = (id, interview) => {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Filter days Array to get that day's name for later update spots
    const filteredAppointmentsDays = state.days.findIndex((singleDay) =>
      singleDay.appointments.includes(id)
    );

    let day = {
      ...state.days[filteredAppointmentsDays],
      spots: state.days[filteredAppointmentsDays].spots,
    };
    console.log("* day *", day);

    //Update spots when appointment is booked
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[filteredAppointmentsDays],
        spots: state.days[filteredAppointmentsDays].spots - 1,
      };
    } else {
      day = {
        ...state.days[filteredAppointmentsDays],
        spots: state.days[filteredAppointmentsDays].spots,
      };
    }

    const days = [...state.days];
    days.splice(filteredAppointmentsDays, 1, day);

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Filter days Array to get that day's name for later update spots
    const filteredAppointmentsDays = state.days.findIndex((singleDay) =>
      singleDay.appointments.includes(id)
    );

    //Update spots when appointment is cancelled
    const day = {
      ...state.days[filteredAppointmentsDays],
      spots: state.days[filteredAppointmentsDays].spots + 1,
    };
    console.log("* day *", day);

    const days = [...state.days];
    days.splice(filteredAppointmentsDays, 1, day);

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
