import React, { Component } from 'react';
import axios from 'axios';

import '../../../scss/Crypto.scss';

class Crypto extends Component {
	componentWillMount() {
		// axios.get('https://rest.coinapi.io/v1/assets', {
		// 	'X-CoinAPI-Key': 'F261969E-1652-440D-9E0D-3E32041E404C'
		// })
		// .then((res) => {
		// 	console.log(res);
		// })
		// .catch((err) => { console.log(err) })
	}
	render() {
		return (
			<div id="crypto" className="widget">
				<h1>Crypto Currencies</h1>
			</div>
		)
	}
}

export default Crypto;