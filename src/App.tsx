import { useState } from "react";

import Title from './components/Title'
import Form from "./components/Form";
import Results from "./components/Results";
import Loading from "./components/Loading";
import './App.css';

type ResultsStateType = {
    country: string;
    cityName: string;
    temperature: string;
    conditionText: string;
    icon: string;
}

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [city, setCity] = useState<string>("");
    const [results, setResults] = useState<ResultsStateType>({
        country: "",
        cityName: "",
        temperature: "",
        conditionText: "",
        icon: ""
    })

    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        fetch(`https://api.weatherapi.com/v1/current.json?key=c65884559c094c688b3124350212207&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                setResults({
                    country: data.location.country,
                    cityName: data.location.name,
                    temperature: data.current.temp_c,
                    conditionText: data.current.condition.text,
                    icon: data.current.condition.icon
                });
                setCity("");
                setLoading(false);
            })
            .catch(err => alert("エラーが発生しました。もう一度リトライしてください。"))

    }
  return (
    <div className="App">
        <Title />
        <Form city={city} setCity={setCity} getWeather={getWeather} />
        {loading ? <Loading /> : <Results results={results} />}
    </div>
  );
}

export default App;
