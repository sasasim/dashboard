import { interval, Observable, of } from "rxjs"
import { map, exhaustMap, delay } from "rxjs/operators"
import { EventEmitter } from "events"

const calcTemperature = () => {
  const temperature = Math.floor(Math.random() * 100)
  if (Math.random() < 0.25) {
    return of(temperature).pipe(delay(10000))
  } else {
    return of(temperature)
  }
}

export const temperature$ = (events: EventEmitter): Observable<void> => interval(200).pipe(
  exhaustMap(() => calcTemperature().pipe()),
  map((temperature) => {
    events.emit("data", {
      temperature
    })
  })
)