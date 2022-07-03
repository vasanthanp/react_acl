const customer = ['getProductsCotroller'];
const supporter = [...customer,'deleteProductCotroller'];
const seller = [...customer,'createProductCotroller','updateProductCotroller'];
module.exports = {Permission : {customer,supporter,seller}}

