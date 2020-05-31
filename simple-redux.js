function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => listeners.push(listener);

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}
