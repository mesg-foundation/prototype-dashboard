export default (client, { perPage = 500, total = 1 }) => async (query, variables) => {
  let list = []
  for (let i = 0; i < Math.ceil(total / perPage); i++) {
    const res = await client.query({
      query,
      variables: {
        ...variables,
        first: perPage,
        skip: i * perPage
      }
    })
    list = [
      ...list,
      ...res.data[(Object.keys(res.data)[0])]
    ]
  }
  return list
}
