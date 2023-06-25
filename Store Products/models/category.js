let categories = [];

module.exports = {
  Category: (name, user) => ({
    id: new Date().getTime(), name: name, userId: user
  }),

  getById: (cId, uId) => categories.find(it => it.id === Number(cId) && it.userId === Number(uId)),
  getAll: (uId) => categories.filter(it => it.userId === Number(uId)),
  getIndex: (cId) => categories.findIndex(it => it.id === Number(cId)),
  create: (category) => categories.push(category),
  update: (index, category) => categories[index] = category,
  delete: (index) => categories.splice(index, 1)
}