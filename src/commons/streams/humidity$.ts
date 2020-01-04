import { interval, Observable, of } from "rxjs"
import { map, exhaustMap } from "rxjs/operators"
import { EventEmitter } from "events"

const calcHumidity = () => of(Math.floor(Math.random() * 100))

export const humidity$ = (events: EventEmitter): Observable<void> => interval(200).pipe(
  exhaustMap(() => calcHumidity().pipe()),
  map((humidity) => {
    events.emit("data", {
      humidity
    })
  })
)