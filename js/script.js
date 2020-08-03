const API_ROUTE = 'http://localhost:3000';

// actions
const fillAction = (data) => { return { type: 'FILL', data } };

let initialState = {
    data: {}
}

function reducer(state, action) {
    switch (action.type) {
        case 'FILL': return { ...state, ...action.data }
    }
}

function dispatchCallback() {
    // fill front
    const block = document.getElementById('data-block'),
        price = store.getState().price;

    block.innerHTML = '';
    block.innerHTML = price.toFixed(2);
}

const store = createStore(reducer, initialState);
store.subscribe(dispatchCallback);

let getDataAction = async () => {
    await fetch(API_ROUTE, {
        method: 'GET'
    }).then((response) => response.json()).then((body) => {
        store.dispatch(fillAction(body));
    });
}

document.getElementById('get-data-button').addEventListener('click', getDataAction);
