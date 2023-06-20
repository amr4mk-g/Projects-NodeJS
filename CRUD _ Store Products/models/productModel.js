let products = [];

module.exports = {
  getIndex: (id) => products.findIndex(it => it.id === id),
  getAll: () => products,
  getOne: (index) => products[index],
  createOne: (product) => products.push(product),
  updateOne: (index, product) => products[index] = product,
  deleteOne: (index) => products.splice(index, 1)
}