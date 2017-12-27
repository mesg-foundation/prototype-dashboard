const convertParam = param => param.toFormat
  ? param.toFormat()
  : param.toString()

export default constant => (contract, args = []) => new Promise((resolve, reject) => {
  contract[constant](...args, (err, result) => err
    ? reject(err)
    : resolve(convertParam(result))
  )
})
