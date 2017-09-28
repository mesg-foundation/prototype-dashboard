const dataForUrl = data => Object.keys(data)
  .sort()
  .filter(e => data[e])
  .filter(e => ['totalItems'].indexOf(e) < 0)
  .reduce((res, e) => {
    res[e] = data[e]
    return res
  }, {})

const dataToUrlString = data => (data && Object.keys(dataForUrl(data))
  .map(e => [e, data[e]].join('='))
  .join('&')) || 'default'

const toHuman = str => [
  str[0].toUpperCase(),
  str.substr(1)
].filter(x => x).join('')

const conditionFromKey = key => ({
  key,
  conditions: key.split('&').map(x => ({
    predicate: x.split('=')[0],
    value: x.split('=')[1]
  }))
})

const testItem = item => ({ key, conditions }) => conditions.some(({ predicate, value }) => {
  if (!predicate) { return false }
  if (predicate.endsWith('Id')) {
    const entity = predicate.match(/^(.*)Id$/)[1]
    if (item[entity] && item[entity].id === value) { return true }
  }
  return item[predicate] === value
})

const flattenGraphQlData = (data, exclude = []) => {
  if (!data) { return null }
  const reducer = (acc, key) => key === '__typename'
    ? acc
    : typeof data[key] === 'object' && exclude.indexOf(key) < 0
      ? { ...acc, [`${key}Id`]: (data[key] || {}).id }
      : { ...acc, [key]: data[key] }
  return Object.keys(data)
    .reduce(reducer, {})
}

export default {
  dataForUrl,
  dataToUrlString,
  toHuman,
  conditionFromKey,
  testItem,
  flattenGraphQlData
}
