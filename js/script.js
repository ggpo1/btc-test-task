const API_ROUTE = 'https://api.bittrex.com/api/v1.1/public/getmarketsummary?market=usd-btc';

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
}

const store = createStore(reducer, initialState);
store.subscribe(dispatchCallback);

let getDataAction = async () => {
    await fetch(API_ROUTE, {
        method: 'GET',
        headers: {
            'Host': 'bittrex.com',
            'Origin': 'https://ggpo1.github.io/'
        }
    }).then((response) => response.json()).then((body) => {
        console.log(body);
        // let airplanes = [];
        // Object.keys(body)
        //     .filter(key => typeof body[key] === "object")
        //     .forEach(key => airplanes.push(converter(key, body[key])));
        store.dispatch(fillAction(body));
    });
}

document.getElementById('get-data-button').addEventListener('click', getDataAction);
