import { LOAD_RANDOM_USER } from '../constants'

export function loadRandomUser () {
  return {
    type: LOAD_RANDOM_USER,
    callAPI: 'https://randomuser.me/api/?results=1000&nat=us&inc=name,id'
  }
}
