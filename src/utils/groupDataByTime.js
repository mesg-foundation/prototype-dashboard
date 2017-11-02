const GROUP_BY = {
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  min: 60 * 1000
}

const METHODS = {
  count: list => list.length,
  sum: list => list.reduce((prev, val) => prev + val, 0),
  avg: list => list.length === 0
    ? 0
    : list.reduce((prev, val) => prev + val, 0) / list.length
}

const resultSize = (from, to, interval) => Math.ceil((+to - from) / interval)

export default (data, {
  groupBy = 'day',
  dateAttribute = 'createdAt',
  method = 'count',
  attribute = 'createdAt',
  from = new Date(data[0][dateAttribute]),
  to = new Date(data[data.length - 1][dateAttribute])
} = {}) => {
  const interval = GROUP_BY[groupBy]
  const size = resultSize(from, to, interval)
  const labels = [...new Array(size)]
    .map((_, i) => new Date(+from + i * interval))
  const res = [...new Array(size)]
    .map(() => [])
  data.forEach(x => {
    const index = Math.trunc((+new Date(x[dateAttribute]) - from) / interval)
    res[index].push(x[attribute])
  })
  return {
    labels,
    data: res.map(METHODS[method] || method)
  }
}
