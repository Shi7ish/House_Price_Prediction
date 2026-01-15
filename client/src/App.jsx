import React,{useState} from 'react'
import Home from './pages/Home'

const App = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Boston House Price Predictor 🏡
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Enter the property characteristics below and get an estimated house
        price based on the Boston Housing dataset.
      </p>

      <Home onPredict={setPrediction} />

      {prediction && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-xl border max-w-md text-center">
          <h2 className="text-xl font-semibold text-green-600">
            Estimated Price
          </h2>
          <p className="text-4xl font-bold mt-2 text-gray-900">
            ${(prediction * 1000).toFixed(0)}
          </p>
        </div>
      )}
    </div>
  );
}

export default App
