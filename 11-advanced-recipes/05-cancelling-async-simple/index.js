import { asyncRoutine } from './asyncRoutine.js'
import { CancelError } from './cancelError.js'

async function cancellable (cancelObj) {
  const resA = await asyncRoutine('A')
  console.log(resA)
  if (cancelObj.cancelRequested) {
    throw new CancelError()
  }

  const resB = await asyncRoutine('B')
  console.log(resB)
  if (cancelObj.cancelRequested) {
    throw new CancelError()
  }

  const resC = await asyncRoutine('C')
  console.log(resC)
}

const cancelObj = { cancelRequested: false }
cancellable(cancelObj)
  .catch(err => {
    if (err instanceof CancelError) {
      console.log('Function canceled')
    }
  })

setTimeout(() => {
  cancelObj.cancelRequested = true
}, 100)