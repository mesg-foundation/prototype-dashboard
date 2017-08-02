const dataForUrl = data => Object.keys(data)
  .sort()
  .filter(e => data[e])
  .filter(e => ['rowsPerPage', 'totalItems'].indexOf(e) < 0)
  .reduce((res, e) => {
    res[e] = data[e]
    return res
  }, {})

const dataToUrlString = data => Object.keys(dataForUrl(data))
  .map(e => [e, data[e]].join('='))
  .join('&')

const toHuman = str => [
  str[0].toUpperCase(),
  str.substr(1)
].filter(x => x).join('')

const conditionFromKey = key => ({
  key,
  predicate: key.split('=')[0],
  value: key.split('=')[1]
})

const testItem = item => ({ predicate, value }) => {
  if (!predicate) { return false }
  if (predicate.endsWith('Id')) {
    const entity = predicate.match(/^(.*)Id$/)[1]
    if (item[entity].id === value) { return true }
  }
  return item[predicate] === value
}

export default {
  dataForUrl,
  dataToUrlString,
  toHuman,
  conditionFromKey,
  testItem
}
