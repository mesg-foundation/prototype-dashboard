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

export default {
  dataForUrl,
  dataToUrlString,
  toHuman
}
