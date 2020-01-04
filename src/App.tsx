import React, { useState, useEffect } from 'react';
import './App.css';
import { temperature$ } from './commons/streams/temperature$';
import { combineLatest } from 'rxjs';
import { airPressure$ } from './commons/streams/airPressure$';
import { humidity$ } from './commons/streams/humidity$';
import { EventEmitter } from 'events';

const App: React.FC = () => {
  const [temperature, setTemperature] = useState(0)
  const [airPressure, setAirPressure] = useState(0)
  const [humidity, setHumidity] = useState(0)

  const registerEvent = () => {
    const events = new EventEmitter()
    events.on("data", (data) => {
      const {humidity, airPressure, temperature} = data
      humidity !== undefined && setHumidity(humidity)
      airPressure !== undefined && setAirPressure(airPressure)
      temperature !== undefined && setTemperature(temperature)
    })
    return events
  }
  
  useEffect(() => {
    const events = registerEvent()
    const events$ = combineLatest(temperature$(events), airPressure$(events), humidity$(events)).pipe()
    const subscription = events$.subscribe()
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Temperature: {temperature}
        </p>
        <p>
          Air Pressure: {airPressure}
        </p>
        <p>
          Humidity: {humidity}
        </p>
      </header>
    </div>
  );
}

export default App;
