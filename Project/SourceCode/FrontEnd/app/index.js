const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app');
const {Provider} = require('react-redux');
const store = require('./store/index');


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById('root')
);
