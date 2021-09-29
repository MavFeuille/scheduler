import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import classNames from 'classnames';


export default function InterviewerList(props) {
  const interviewerClass = classNames (
    "interviewers__item", {
    "interviewers__item--selected" :props.selected,
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}