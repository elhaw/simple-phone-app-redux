function reducer(state, action) {
  if (action.type === "ADD_CONTACT") {
    // action.payload.blocked = false
    return {
      contactList: [...state.contactList, {...action.payload,blocked:false}],
    };
  }

  if (action.type === "DELETE_CONTACT") {
    return {
      contactList: state.contactList.filter((contact) => {
        return contact.id !== action.payload;
      }),
    };
  } else if (action.type === "BLOCK_CONTACT") {
    return {
      contactList: state.contactList.map((contact) => {
        if (contact.id === action.payload) {
          return Object.assign({}, contact, {
            blocked: true,
          });
        }
        return contact;
      }),
    };
  } else {
    return state;
  }
}

const initialState = {
  contactList: [
    // {
    //   name: "Ahmed",
    //   email: "Ahmed@m3ntorship.com",
    //   phone: "444 555 555",
    //   blocked: false,
    //   id: 1,
    // },
  ],
};
const store = createStore(reducer, initialState);

store.subscribe(() => {
  console.log(
    "===================\n unblocked contacts  \n\n ================="
  );
  let contactList = store.getState().contactList;
  let nonBlockedContacts = contactList.filter((contact) => {
    return !contact.blocked;
  });
  console.log(nonBlockedContacts);
});

const subscribe = (subscribtion)=>{
  store.subscribe(subscribtion)
}

const addContact = (contact) => {
  store.dispatch({
    type: "ADD_CONTACT",
    payload: contact,
  });
};

const deleteContact = (id) => {
  store.dispatch({
    type: "DELETE_CONTACT",
    payload: id,
  });
};

const blockContact = (id) => {
  store.dispatch({
    type: "BLOCK_CONTACT",
    payload: id,
  });
};

const getWhiteList = () => {
  return store.getState().contactList.filter((contact) => {
    return !contact.blocked;
  });
};

const getBlackList = () => {
  return store.getState().contactList.filter((contact) => {
    return contact.blocked;
  });
}; 

const getAll = ()=>{
  return store.getState().contactList;
}