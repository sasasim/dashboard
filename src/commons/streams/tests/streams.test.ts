import { EventEmitter } from "events"
import { temperature$ } from "../temperature$"
import { airPressure$ } from "../airPressure$"
import { humidity$ } from "../humidity$"

it("temperature$ should emit greater than 0", (done) => {
  const event = new EventEmitter()
  const subscription = temperature$(event).subscribe()
  event.on("data", (data) => {
    const { temperature } = data
    expect(temperature).toBeGreaterThanOrEqual(0)
    subscription.unsubscribe()
    done()
  })
})

it("airPressure$ should emit greater than 0", (done) => {
  const event = new EventEmitter()
  const subscription = airPressure$(event).subscribe()
  event.on("data", (data) => {
    const { airPressure } = data
    expect(airPressure).toBeGreaterThanOrEqual(0)
    subscription.unsubscribe()
    done()
  })
})

it("humidity$ should emit greater than 0", (done) => {
  const event = new EventEmitter()
  const subscription = humidity$(event).subscribe()
  event.on("data", (data) => {
    const { humidity } = data
    expect(humidity).toBeGreaterThanOrEqual(0)
    subscription.unsubscribe()
    done()
  })
})