import React from "react";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    const saving = props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  const deleting = () => {

    transition(DELETING);

    const deletingInterview = props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  }

  const edit = () => {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && (
          <Empty
            onAdd={() => transition(CREATE)} 
          />
        )}
        {mode === SHOW && props.interview &&(
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={edit}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status 
            message="Saving..."
          />
        )}
        {mode === DELETING && (
          <Status 
            message="Deleting..."
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={() => back()}
            onConfirm={deleting}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}

    </article>
  );
}

