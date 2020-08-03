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
        // console.log(body);
        // let airplanes = [];
        // Object.keys(body)
        //     .filter(key => typeof body[key] === "object")
        //     .forEach(key => airplanes.push(converter(key, body[key])));
        store.dispatch(fillAction(body));
    });
}

document.getElementById('get-data-button').addEventListener('click', getDataAction);
