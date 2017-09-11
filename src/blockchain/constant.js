const convertParam = param => param.toFormat
  ? param.toFormat()
  : param.toString()

export default constant => contract => new Promise((resolve, reject) => {
  contract[constant]((err, result) => err
    ? reject(err)
    : resolve(convertParam(result))
  )
})
