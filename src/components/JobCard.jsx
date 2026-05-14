function JobCard({ 
  job, 
  darkMode, 
  savedJobs, 
  handleSaveJob 
}) {
  return (
    <div className={`job-card ${darkMode ? "dark-card" : ""}`}>
      <h3>{job.name}</h3>

      <p>{job.email}</p>

      <p>{job.company.name}</p>

      <button
        className="save-btn"
        onClick={() => handleSaveJob(job.id)}
      >
        {savedJobs.includes(job.id)
          ? "Saved ❤️"
        : "Save Job"}
      </button>
    </div>
  );
}

export default JobCard;
