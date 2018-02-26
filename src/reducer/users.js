import { FAIL, LOAD_RANDOM_USER, SUCCESS } from '../constants'

export default (users = {
  entities: [{id: null, name: '', surname: '', coords: {x: null, y: null}}],
  loading: false,
  loaded: false,
  fail: false
}, action) => {
  const {type, data} = action

  switch (type) {
    case LOAD_RANDOM_USER:
      return {...users, loading: true}
    case LOAD_RANDOM_USER + SUCCESS:
      const entities = data.results.reduce((acc, item) => {
        return [...acc, {
          id: item.id.value,
          name: item.name.first,
          surname: item.name.last,
          coords: {
            x: getNumberByWorld(item.name.first),
            y: getNumberByWorld(item.name.last)
          }
        }]
      }, [])

      return {
        entities, loading: false, loaded: true
      }
    case LOAD_RANDOM_USER + FAIL:
      return {...users, loading: false, fail: true}
  }

  return users
}

const getNumberByWorld = (word) => [].reduce.call(word, (acc, char) => acc + char.charCodeAt(), 0) % 100
