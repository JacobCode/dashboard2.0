import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setWidgets } from '../../../redux/actions/actions';

import Close from '@material-ui/icons/Close';

import '../../../scss/Crypto.scss';

const API_URL = 'https://api.coincap.io/v2';

const coins = ['bitcoin', 'ethereum', 'litecoin', 'bitcoin-cash']

class Crypto extends Component {
	constructor() {
		super();
		this.state = {
			chosenCoin: coins[0],
			activeCoin: null,
			coins: []
		}
		this.hideWidget = this.hideWidget.bind(this);
		this.getCoins = this.getCoins.bind(this);
		this.changeCoin = this.changeCoin.bind(this);
	}
	// Get Coin Data
	getCoinData(c) {
		axios.get(`${API_URL}/assets/${c}`)
			.then((res) => {
				const coin = res.data.data;
				this.setState({ activeCoin: coin });
			})
			.catch((err) => { console.log(err) });
	}
	getCoinRate() {
		axios.get(`${API_URL}/rates/${this.state.chosenCoin}`)
			.then((res) => {
				const coin = res.data.data;
				this.setState({ activeCoin: coin });
			})
			.catch((err) => { console.log(err) });
	}
	getCoins(type) {
		const dt = [];
		coins.filter((c) => c !== type).forEach((coin) => {
			axios.get(`${API_URL}/assets/${coin}`)
				.then((res) => {
					dt.push(res.data.data);
				})
				.then(() => this.setState({ coins: dt }));
		});
	}
	componentWillMount() {
		this.getCoinData(this.state.chosenCoin);
		this.getCoins();
	}
	hideWidget() {
		// Hide clock widget
		var obj = {
			bookmarks: this.props.activeWidgets.bookmarks,
			calendar: this.props.activeWidgets.calendar,
			chart: this.props.activeWidgets.chart,
			clock: false,
			tasks: this.props.activeWidgets.tasks,
			weather: this.props.activeWidgets.weather
		}
		this.props.setWidgets(obj);
	}
	changeCoin(e, type) {
		this.setState({ chosenCoin: type });
		this.getCoinData(type);
		this.getCoins(type);
	}
	render() {
		let coin = this.state.activeCoin;
		if (coin !== null) {
			return (
				<div id="crypto" className="widget">
					<div className="delete-widget" onClick={this.hideWidget}><Close /></div>
					<div className="inner">
						<header>
							<h1>{coin.name}</h1>
							<span>{coin.symbol}</span>
						</header>
						<div className="coin-info">
							<p>
								<span>${Number(coin.priceUsd).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
								<span className={Number(coin.changePercent24Hr).toFixed(2) > 0 ? 'p' : 'n'}>{Number(coin.changePercent24Hr).toFixed(2)}%</span>
							</p>
							<div className="info">
								<div className="col-1">
									<h4>Market Cap</h4>
									<span>${Number(coin.marketCapUsd).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
								</div>
								<div className="col-2">
									<h4>Volume</h4>
									<span>${Number(coin.volumeUsd24Hr).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="other">
							{this.state.coins.filter((c) => c.id !== coin.id).map((cn) => {
								return (
									<div onClick={e => this.changeCoin(e, cn.id)} key={cn.id} className={`other-coin ${cn.id}`}>
										{cn.symbol}
									</div>
								)
							})}
						</div>
				</div>
			)
		} else {
			return (
				<div>null</div>
			)
		}
	}
}

Crypto.propTypes = {
    setWidgets: PropTypes.func.isRequired,
    activeWidgets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    activeWidgets: state.siteData.activeWidgets
});

export default connect(mapStateToProps, { setWidgets })(Crypto);