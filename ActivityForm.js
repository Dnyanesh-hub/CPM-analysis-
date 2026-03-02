import { useState } from "react";

function ActivityForm({ onSubmit }) {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    id: "",
    predecessors: "",
    duration: ""
  });

  const handleAdd = () => {
    if (!form.id || !form.duration) return;

    const newActivity = {
      id: form.id,
      predecessors: form.predecessors
        ? form.predecessors.split(",").map(p => p.trim())
        : [],
      duration: Number(form.duration)
    };

    setActivities([...activities, newActivity]);
    setForm({ id: "", predecessors: "", duration: "" });
  };

  const handleSubmit = () => {
    onSubmit(activities);
  };

  return (
    <div>
      <h3>Add Activity</h3>

      <input
        placeholder="Activity ID"
        value={form.id}
        onChange={e => setForm({ ...form, id: e.target.value })}
      />

      <input
        placeholder="Predecessors (comma separated)"
        value={form.predecessors}
        onChange={e =>
          setForm({ ...form, predecessors: e.target.value })
        }
      />

      <input
        placeholder="Duration"
        type="number"
        value={form.duration}
        onChange={e =>
          setForm({ ...form, duration: e.target.value })
        }
      />

      <button onClick={handleAdd}>Add</button>

      <hr />

      <button onClick={handleSubmit}>Calculate CPM</button>

      <h4>Current Activities:</h4>
      {activities.map(a => (
        <div key={a.id}>
          {a.id} → {a.predecessors.join(",")} ({a.duration})
        </div>
      ))}
    </div>
  );
}

export default ActivityForm;