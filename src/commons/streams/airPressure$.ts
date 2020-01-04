import { interval, Observable, of } from "rxjs"
import { map, exhaustMap } from "rxjs/operators"
import { EventEmitter } from "events"

const calcAirPressure = () => of(Math.floor(Math.random() * 100))

export const airPressure$ = (events: EventEmitter): Observable<void> => interval(200).pipe(
  exhaustMap(() => calcAirPressure().pipe()),
  map((airPressure) => {
    events.emit("data", {
      airPressure
    })
  })
)