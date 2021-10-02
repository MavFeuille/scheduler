import InterviewerList from "components/InterviewerList";


export function getAppointmentsForDay(state, day) {
  let appointments = [];

  //Filter days Array to get that day's name
  const filteredAppointmentsDays= state.days.filter(singleDay => singleDay.name === day);
  
  //Then map with days.appointments with appointments object
  if (filteredAppointmentsDays.length) {
      appointments = filteredAppointmentsDays[0].appointments.map(
        appt => state.appointments[appt]
      );
  }
  return appointments;
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  } else {
    const interviewerID = interview.interviewer;
    const interviewerObject = {
      student: interview.student,
      interviewer: state.interviewers[interviewerID]
    }
    return interviewerObject
  }
}

