import { interval, Observable, of } from "rxjs"
import { map, exhaustMap, delay } from "rxjs/operators"
import { EventEmitter } from "events"

const calcHumidity = () => {
  const humidity = Math.floor(Math.random() * 100)
  if (Math.random() < 0.25) {
    return of(humidity).pipe(delay(10000))
  } else {
    return of(humidity)
  }
}

export const humidity$ = (events: EventEmitter): Observable<void> => interval(100).pipe(
  exhaustMap(() => calcHumidity().pipe()),
  map((humidity) => {
    events.emit("data", {
      humidity
    })
  })
)