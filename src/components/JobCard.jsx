function JobCard({ job, darkMode }) {
  return (
    <div className={`job-card ${darkMode ? "dark-card" : ""}`}>

      <h3>{job.name}</h3>

      <p>{job.email}</p>

      <p>{job.company.name}</p>

    </div>
  );
}

export default JobCard;