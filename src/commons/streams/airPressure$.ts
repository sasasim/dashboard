import { interval, Observable, of } from "rxjs"
import { map, exhaustMap, delay } from "rxjs/operators"
import { EventEmitter } from "events"

const calcAirPressure = () => {
  const airPressure = Math.floor(Math.random() * 100)
  if (Math.random() < 0.25) {
    return of(airPressure).pipe(delay(10000))
  } else {
    return of(airPressure)
  }
}

export const airPressure$ = (events: EventEmitter): Observable<void> => interval(100).pipe(
  exhaustMap(() => calcAirPressure().pipe()),
  map((airPressure) => {
    events.emit("data", {
      airPressure
    })
  })
)