let products = [];

module.exports = {
  Product: (name, price, cat, user) => ({
    id: new Date().getTime(), name: name, price: price, categoryId: cat, userId: user
  }),

  getById: (pId, uId) => products.find(it => it.id === Number(pId) && it.userId === Number(uId)),
  getByCat: (cId) => products.filter(it => it.categoryId === Number(cId)),
  getAll: (uId) => products.filter(it => it.userId === Number(uId)),
  getIndex: (pId) => products.findIndex(it => it.id === Number(pId)),
  create: (product) => products.push(product),
  update: (index, product) => products[index] = product,
  delete: (index) => products.splice(index, 1)
}