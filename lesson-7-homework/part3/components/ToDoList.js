import styles from "./ToDoList.module.css";
import { useState } from "react";

export default function ToDoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [finish, setFinish] = useState([]);

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTasks((tasks) => tasks.concat(task));
    setFinish((fin) => fin.concat(false));
    setTask("");
  };

  function handleClear(e) {
    setTasks([]);
    setFinish([]);
  }

  function handleFinish(e, index) {
    console.log(e.target.value)
    setFinish((fin) => fin.map((v, i) => i === index ? !v : v))
  }

  function handleDelete(e, index) {
    setTasks((tasks) => tasks.filter((_, i) => i !== index))
    setFinish((fin) => fin.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.bg}>
      <div className={styles.main}>
        <h1 className={styles.title}>TO-DO LIST</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.inputArea}
            type="text"
            placeholder="new task"
            name="task"
            onChange={handleChange}
            value={task}
          />
          <button className={styles.button} type="submit">
            <strong>ADD</strong>
          </button>
        </form>
        {tasks.length > 0 && (
          <div className={styles.tasksBoard}>
            <ul className={styles.ul}>
              {tasks.map((val, index) => (
                <li className={styles.li} key={index} index={index}>
                  <input type="checkbox" checked={finish[index]} onChange={(e) => handleFinish(e, index)}/>
                  <span className={finish[index] ? styles.finish_text : styles.text}>{val}</span>
                  <a className={styles.delete} onClick={(e) => handleDelete(e, index)}>x</a>
                </li>
              ))}
            </ul>
            <a className={styles.a} onClick={handleClear}>
              Clear
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
