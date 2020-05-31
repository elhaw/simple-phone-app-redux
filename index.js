
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_CONTACT') {
      
    return {
    state : [...state.contactList, action.contact]
    }
  }
  else {
    return state;
  }
}

const initialState = { contactList: [
    {
        name : 'Ahmed',
        email : 'Ahmed@m3ntorship.com',
        phone: '444 555 555',
        blocked: false,
        id: 1
    }
] };

let addContactAction = {
    type:'ADD_CONTACT',
    contact : {
        name: 'Mahmoud',
        email : 'Mahmoud@m3ntorship',
        phone: '555 555 ',
        blocked : true,
        id : 2
    }
}

const store = createStore(reducer, initialState);
store.subscribe(()=>{
    console.log(store.getState().state)
})

store.dispatch(addContactAction)
