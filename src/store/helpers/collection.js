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

export const state = {
  collectionById: {}
}

export const getters = {
  collection: state => state.collectionById,
  collectionList: state => Object.keys(state.collectionById)
    .map(id => state.collectionById[id])
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
}

export const mutations = {
  createItem: (state, { item }) => createItem(state, item),
  updateItem: (state, { item }) => updateItem(state, item),
  replaceItem: (state, { item }) => replaceItem(state, item),
  deleteItem: (state, { id }) => deleteItem(state, id),
  updateCollection: (state, { collection }) => updateCollection(state, collection)
}

export default () => ({
  state,
  getters,
  mutations
})
