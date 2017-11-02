const GROUP_BY = {
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  min: 60 * 1000
}

const resultSize = (from, to, interval) => Math.ceil((+to - from) / interval)

export default (data, {
  groupBy = 'day',
  attribute = 'createdAt',
  from = new Date(data[0][attribute]),
  to = new Date(data[data.length - 1][attribute])
} = {}) => {
  const interval = GROUP_BY[groupBy]
  const res = [...new Array(resultSize(from, to, interval))]
    .map((_, i) => [new Date(+from + i * interval), 0])
  data.forEach(x => {
    const index = Math.trunc((+new Date(x[attribute]) - from) / interval)
    if (!res[index]) debugger
    res[index][1]++
  })
  return res
}
