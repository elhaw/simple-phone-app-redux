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

function reducer(state, action) {
  if (action.type === "ADD_CONTACT") {
    return {
      contactList: [...state.contactList, action.contact],
    };
  }

  if (action.type === "DELETE_CONTACT") {
    return {
      contactList: state.contactList.filter((contact) => {
        return contact.id !== action.id;
      }),
    };
  } 
  else {
    return state;
  }
}

const initialState = {
  contactList: [
    {
      name: "Ahmed",
      email: "Ahmed@m3ntorship.com",
      phone: "444 555 555",
      blocked: false,
      id: 1,
    },
  ],
};

let addContact1 = {
  type: "ADD_CONTACT",
  contact: {
    name: "Mahmoud",
    email: "Mahmoud@m3ntorship",
    phone: "555 555 ",
    blocked: true,
    id: 2,
  },
};

let  addContact2 = {
  type: "ADD_CONTACT",
  contact: {
    name: "Mahmoud",
    email: "Mahmoud@m3ntorship",
    phone: "555 555 ",
    blocked: false,
    id: 2,
  },
};

let addContact3 = {
  type: "ADD_CONTACT",
  contact: {
    name: "Mahmoud",
    email: "Mahmoud@m3ntorship",
    phone: "555 555 ",
    blocked: false,
    id: 3,
  },
};
let deleteContact = {
  type: "DELETE_CONTACT",
  id: 3,
};


const store = createStore(reducer, initialState);
store.subscribe(() => {
  console.log('===================\n\ unblocked contacts  \n\n =================')
  let contactList = store.getState().contactList
  let nonBlockedContacts = contactList.filter((contact)=> {
    return !contact.blocked ;
  })
  console.log(nonBlockedContacts);
});


store.dispatch(contact1);
store.dispatch(contact2);
store.dispatch(contact3);
store.dispatch(deleteContact);
