export default class ScheduleHandler {
  constructor() {
    this.name = this.constructor.name
  }

  logMessage(message) {
    console.log(`Scheduler | ${this.name} | ${message}`)
  }

  logSuccess(message) {
    console.log(`Scheduler | ${this.name} | Success: ${message}`)
  }

  logError(message, err) {
    console.log(`Scheduler | ${this.name} | Error: ${message}\n => `, err)
  }
}
