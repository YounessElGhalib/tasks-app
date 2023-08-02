// initial state
// shape: [{ id, quantity }]
const state = () => ({
  items: [],
  checkoutStatus: 'youness',
});

// getters
const getters = {
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
};

// actions
const actions = {
  inc() {
    console.log("hahahah...");
  },
};

// mutations
const mutations = {
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
