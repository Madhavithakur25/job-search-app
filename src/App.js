import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = (id) => { 
    if (savedJobs.includes(id)) {
      setSavedJobs(
        savedJobs.filter((jobId) => jobId !== id)
      );
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div
      className="container"
      style={{
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Job Listing App</h1>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      <div className="top-section">
        <input
          className="search-input"
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            darkMode={darkMode}
            savedJobs={savedJobs}
            handleSaveJob={handleSaveJob}
          />
        ))
      ) : (
        <h2>No jobs found</h2>
      )}
    </div>
  );
}

export default App;
