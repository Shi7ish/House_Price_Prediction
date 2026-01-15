import React, { useState } from 'react'

const Home = ({ onPredict }) => {
  const [form, setForm] = useState({
    CRIM: "",
    ZN: "",
    INDUS: "",
    CHAS: "",
    NOX: "",
    RM: "",
    AGE: "",
    DIS: "",
    RAD: "",
    TAX: "",
    PTRATIO: "",
    B: "",
    LSTAT: "",
  });

  const featureInfo = {
    CRIM: "Per capita crime rate (ex: 0.1)",
    ZN: "Residential land zoned % (ex: 12.5)",
    INDUS: "Non-retail business acres % (ex: 7.5)",
    CHAS: "Charles River dummy 1/0 (ex: 0)",
    NOX: "Nitric oxide concentration (ex: 0.48)",
    RM: "Avg no. of rooms (ex: 6.3)",
    AGE: "Owner-occupied units % built before 1940 (ex: 65.2)",
    DIS: "Distance to jobs centers (ex: 4.09)",
    RAD: "Accessibility to highways (ex: 4)",
    TAX: "Property tax per 10k (ex: 296)",
    PTRATIO: "Pupil-teacher ratio (ex: 16.0)",
    B: "1000(Bk − 0.63)^2 (ex: 395)",
    LSTAT: "% lower status population (ex: 12.5)",
  };

  const examples = {
    CRIM: "0.1",
    ZN: "12.5",
    INDUS: "7.5",
    CHAS: "0",
    NOX: "0.48",
    RM: "6.3",
    AGE: "65.2",
    DIS: "4.09",
    RAD: "4",
    TAX: "296",
    PTRATIO: "16.0",
    B: "395",
    LSTAT: "12.5",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const values = Object.values(form).map(Number);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: values }),
      });

      const data = await res.json();
      onPredict(data.predicted_price || data.prediction);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 bg-white shadow-lg p-6 rounded-xl border max-w-3xl"
    >
      {Object.keys(form).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            {key} — {featureInfo[key].split("(")[0]}
          </label>
          <input
            type="number"
            step="any"
            required
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={`ex: ${examples[key]}`}
            className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <button
        className="col-span-2 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
      >
        Predict Price
      </button>
    </form>
  );
}

export default Home
