import { useState , useEffect} from "react";
import axios from "axios";



export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(response => {
      // console.log(response.data);
      setState(
        prev => ({
        ...prev,
        // ({
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
        // spots: response[3].spots.data
      }))
   });
  }, [setState])

  
  const bookInterview = (id, interview) => {
    console.log(id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

     //Filter days Array to get that day's name
    const filteredAppointmentsDays= state.days.findIndex(singleDay => singleDay.appointments.includes(id));

    const day = {
      ...state.days[filteredAppointmentsDays],
      spots: state.days[filteredAppointmentsDays].spots - 1
    }
    console.log("* day *", day);

    const days = [...state.days]
    days.splice(filteredAppointmentsDays, 1, day)
  
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        setState({
        ...state,
        appointments,
        days
      });
     
      
    })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Filter days Array to get that day's name
    const filteredAppointmentsDays= state.days.findIndex(singleDay => singleDay.appointments.includes(id));

    const day = {
      ...state.days[filteredAppointmentsDays],
      spots: state.days[filteredAppointmentsDays].spots + 1
    }
    console.log("* day *", day);

    const days = [...state.days]
    days.splice(filteredAppointmentsDays, 1, day)

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
        ...state,
        appointments,
        days
      });
     
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  
  };
}