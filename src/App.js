import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  // const fetchJobs = async () => {

  //   await new Promise((resolve) =>
  //     setTimeout(resolve, 3000)
  //   );

  //   const response = await fetch(
  //     "https://jsonplaceholder.typicode.com/users"
  //   );

  //   const data = await response.json();

  //   setJobs(data);

  //   setLoading(false);
  // };

  const fetchJobs = async () => {

  try {

    setLoading(true);

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
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

  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(search.toLowerCase())
  ); 
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Job Listing App</h1>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid gray",
          marginBottom: "20px"
        }}
      />

      {filteredJobs.map((job) => (
  <div
    key={job.id}
    style={{
      border: "1px solid gray",
      padding: "10px",
      margin: "10px",
      borderRadius: "8px"
    }}
  >
    <h3>{job.name}</h3>

    <p>{job.email}</p>

    <p>{job.company.name}</p>
  </div>
))}
    </div>
  );
}

export default App;