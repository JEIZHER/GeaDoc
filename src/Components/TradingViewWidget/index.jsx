// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react'

let tvScriptLoadingPromise

export default function TradingViewWidget(props) {
	const onLoadScriptRef = useRef()
	useEffect(() => {
		onLoadScriptRef.current = createWidget

		if (!tvScriptLoadingPromise) {
			tvScriptLoadingPromise = new Promise((resolve,reject) => {      
				const script = document.createElement('script')
				script.id = 'tradingview-widget-loading-script'
				script.src = 'https://s3.tradingview.com/tv.js'
				script.type = 'text/javascript'
				script.onload = resolve
				document.head.appendChild(script)
       // reject(new Error('hay un error')) 
			})
		}
    
		tvScriptLoadingPromise.then(
			() => onLoadScriptRef.current && onLoadScriptRef.current()
		)
		return () => (onLoadScriptRef.current = null)

		function createWidget() {
			if (
				document.getElementById('tradingview_351da') &&
				'TradingView' in window
			) {
				new window.TradingView.widget({
					autosize: true,
					symbol: 'BINANCE:' + props.cripto,
					timezone: 'Etc/UTC',
					theme: 'dark',
					style: '1',
					locale: 'es',
					enable_publishing: true,
					withdateranges: true,
					// range: "D",
					interval: 'D',
					hide_side_toolbar: false,
					allow_symbol_change: true,
					details: true,
					calendar: true,
					show_popup_button: true,
					popup_width: '1000',
					popup_height: '650',
					container_id: 'tradingview_351da',
				})
			}
		}
	}, [])

	return (
		<div
			className='tradingview-widget-container'
			style={{ height: '100%', width: '100%' }}
		>
			<div
				id='tradingview_351da'
				style={{ height: 'calc(100% - 32px)', width: '100%' }}
			/>
			<div className='tradingview-widget-copyright'>
				<a
					href='https://es.tradingview.com/'
					rel='noopener nofollow'
					target='_blank'
				>
					<span className='blue-text'>Siga los mercados en TradingView</span>
				</a>
			</div>
		</div>
	)
}

