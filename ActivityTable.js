function ActivityTable({ activities }) {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>ES</th>
          <th>EF</th>
          <th>LS</th>
          <th>LF</th>
          <th>Slack</th>
        </tr>
      </thead>
      <tbody>
        {activities.map(a => (
          <tr
            key={a.id}
            style={{
              backgroundColor: a.isCritical ? "#ffcccc" : "white"
            }}
          >
            <td>{a.id}</td>
            <td>{a.ES}</td>
            <td>{a.EF}</td>
            <td>{a.LS}</td>
            <td>{a.LF}</td>
            <td>{a.slack}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ActivityTable;