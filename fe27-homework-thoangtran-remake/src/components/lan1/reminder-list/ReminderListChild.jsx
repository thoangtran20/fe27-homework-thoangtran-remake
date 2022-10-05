import { useContext } from "react";
import { ReminderContext } from "../../../context/ReminderContext";

function ReminderListChild() {
  const context = useContext(ReminderContext);

  console.log(context.listReminder);

  return <div></div>
}

export default ReminderListChild
