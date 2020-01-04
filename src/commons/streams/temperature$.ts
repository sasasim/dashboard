import { interval, Observable, of } from "rxjs"
import { map, exhaustMap } from "rxjs/operators"
import { EventEmitter } from "events"

const calcTemperature = () => of(Math.floor(Math.random() * 50))

export const temperature$ = (events: EventEmitter): Observable<void> => interval(200).pipe(
  exhaustMap(() => calcTemperature().pipe()),
  map((temperature) => {
    events.emit("data", {
      temperature
    })
  })
)