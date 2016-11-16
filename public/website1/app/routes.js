import App from './containers/App/app.jsx';
import Home from './containers/Home/home.jsx';      
import Login from './containers/Login/login.jsx';  
import NotFound from './containers/NotFound/notfound.jsx';   
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';


class Routes extends React.Component {
  render() {
    return(
	<Router history = {browserHistory}>
		<Route path = {"/"} component = {App}>
          <IndexRoute component={Home}/>
		  <Route path = {"Login"} component = {Login} />
		  <Route path = "*" component={NotFound} status={404} />
		</Route>
	</Router>
	);
  }
}

ReactDOM.render(<Routes />, document.getElementById('world'));