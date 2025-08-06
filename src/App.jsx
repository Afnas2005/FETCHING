import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
  
    const load = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quotes");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();             
        setQuotes(data.quotes.slice(0, 10));       
      } catch (e) {
        setErr(e.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: "red" }}>Error: {err}</p>;

  return (
    <div style={{ padding: 16 }}>
      {quotes.map((q) => (
        <h1 key={q.id}>{q.quote}</h1>
      ))}
    </div>
  );
}

export default App;
