import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  //Set states
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //Helper function to clear form values
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  //Action after 'Cancel' button is clicked
  const cancel = () => {
    reset();
    props.onCancel();
  }
  
 
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input 
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}