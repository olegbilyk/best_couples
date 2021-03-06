import { FAIL, START, SUCCESS } from '../constants'

export default store => next => action => {
  const {callAPI, type, ...rest} = action

  if (!callAPI) return next(action)

  next({...rest, type: type + START})

  fetch(callAPI)
    .then(response => response.json().then(data => next({...rest, type: type + SUCCESS, data})))
    .catch(error => next({...rest, type: type + FAIL, error}))

  next(action)
}
