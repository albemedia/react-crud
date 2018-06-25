export default function productsReducer(state = [], action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return state.concat({ ...action.product, quantity: 1 });
    case "REMOVE_PRODUCT":
      return state.filter(p => p.id !== action.id);
    case "INCREMENT_PRODUCT":
      return state.map(p => {
        if (p.id === action.id) {
          return Object.assign({}, p, { quantity: p.quantity + 1 });
        }

        return p;
      });
    case "DECREMENT_PRODUCT":
      return state.map(p => {
        if (p.id === action.id) {
          return Object.assign({}, p, { quantity: p.quantity - 1 });
        }

        return p;
      });
    default:
      return state;
  }
}
