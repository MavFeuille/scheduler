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