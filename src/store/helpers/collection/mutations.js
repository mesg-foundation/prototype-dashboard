import Utils from '@/utils'

const updateItem = (state, item) => replaceItem(state, {
  ...state.collectionById[(item.id || item._id)],
  ...item
})

const createItem = (state, item) => replaceItem(state, item)

const replaceItem = (state, item) => (state.collectionById = {
  ...state.collectionById,
  [(item.id || item._id)]: item
})

const deleteItem = (state, id) => {
  const newState = { ...state.collectionById }
  newState[id] = null
  delete newState[id]
  state.collectionById = newState
}

const updateCollection = (state, collection) => (state.collectionById = {
  ...state.collectionById,
  ...collection.reduce((accumulator, item) => {
    accumulator[(item.id || item._id)] = item
    return accumulator
  }, {})
})

const updateCollectionList = (state, key, collection) => {
  state.collectionList = {
    ...state.collectionList,
    [key]: collection
      .map(x => x.id)
  }
}

export default {
  createItem: (state, { item }) => createItem(state, item),
  updateItem: (state, { item }) => updateItem(state, item),
  replaceItem: (state, { item }) => replaceItem(state, item),
  deleteItem: (state, { id }) => deleteItem(state, id),
  updateCollection: (state, { collection }) => updateCollection(state, collection),
  updateCollectionList: (state, { variables, data }) => updateCollectionList(state, Utils.dataToUrlString(variables), data)
}
