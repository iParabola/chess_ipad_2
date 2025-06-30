import {
	refreshToken
} from '@/api/user.js'
import {
	baseIpPort
} from '@/static/json/base-url.js'

let socketUrl = ''; // socket地址
let socketTask = null; // socketTask 实例
let is_open_socket = null; // 避免重复连接
let heartTime = null; // 心跳定时器实例
let socketHeart = 0; // 心跳次数
const heartTimeOut = 5000; // 心跳超时时间 10000 = 10s
let connectNum = 0; // 错误次数

// 初始化socket
export const initWebSocket = (url) => {
	if (!url) {
		let protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
		url = protocol + baseIpPort + '/resource/websocket'
	}
	socketUrl = url;
	let token = uni.getStorageSync('token');
	let user = uni.getStorageSync('user');
	// 初始化 websocket
	socketTask = uni.connectSocket({
		url: url + '?Authorization=Bearer ' + token + '&clientid=' +
			user.id,
		header: {
			'content-type': 'application/json'
			// Authorization: 'Bearer ' + uni.getStorageSync('token')
		},
		method: 'GET',
		success(res) {
			console.log(res);
			return socketTask;
		},
		fail(err) {
			console.log(err);
		}
	});
	websocketonopen();
	websocketonmessage();
	websocketonerror();
	websocketclose();
	sendSocketHeart();
};

// socket 连接成功
export const websocketonopen = () => {
	socketTask.onOpen(function(res) {
		console.log('WebSocket连接已打开！');
		is_open_socket = true;
		resetHeart();
	});
};

// socket 连接失败
export const websocketonerror = () => {
	socketTask.onError(function(res) {
		console.log('WebSocket连接打开失败，请检查！', res);
		socketTask = null;
		is_open_socket = false;
		// 重连
		reconnect();
	});
};

// socket 断开链接
export const websocketclose = () => {
	socketTask.onClose(function(res) {
		console.log('WebSocket 已关闭！', res);
	});
};

// socket 重置心跳
export const resetHeart = () => {
	socketHeart = 0;
	connectNum = 0;
	clearInterval(heartTime);
	sendSocketHeart();
};

// socket心跳发送
export const sendSocketHeart = () => {
	heartTime = setInterval(() => {
		let now = Date.now();
		// 如果连接正常则发送心跳
		sendMsg(JSON.stringify({
			action: "ping",
			data: now
		}));
		socketHeart = socketHeart + 1;
	}, heartTimeOut);
};

// socket重连
export const reconnect = () => {
	// 这里是延迟执行的代码
	if (connectNum <= 3) {
		// closeSocketTask();
		clearInterval(heartTime);
		initWebSocket(socketUrl);
		connectNum = connectNum + 1;
		console.log('socket重连', connectNum);
		// uni.showLoading({
		// 	title: 'WebSocket连接失败,正在进行第' + connectNum + '次连接'
		// });
		uni.showLoading({
			// title: 'WebSocket连接失败,正在进行第' + connectNum + '次连接'
		});
		setTimeout(function() {
			uni.hideLoading();
		}, 2000);
	} else {
		console.log('重试次数已用完');
		uni.hideLoading()
		clearInterval(heartTime);
		uni.showModal({
			title: '提示',
			content: '与服务器失去连接...',
			showCancel: false,
			confirmText: '重新连接',
			success: async res => {
				connectNum = 0;
				let user = uni.getStorageSync('user');
				const {
					data: token
				} = await refreshToken(user.id)
				console.log('token: ', token);
				uni.setStorageSync('token', token);
				initWebSocket(socketUrl);
			},
			fail: () => {},
			complete: () => {}
		});
	}
};

// socket 发送数据
export const sendMsg = (data) => {
	console.log('发送数据: ', data);
	socketTask.send({
		data: data,
		success(res) {
			// console.log("发送成功", res)
		},
		fail(err) {
			console.log("发送失败，重连", err)
			reconnect();
		}
	});

};

// socket 接收数据
export const websocketonmessage = () => {
	socketTask.onMessage(function(res) {
		if (res.data.indexOf('heartbeat') !== 0) {
			resetHeart();
		}
		if (res.data.indexOf('pong') !== -1) {
			let now = Date.now();
			let before = res.data.split(',')[1];
			console.log(now - before + 'ms')
			uni.$emit("onPing", now - before);
			return;
		}
		uni.$emit("onMessage", res);
	});
};

// 关闭 socket
export const closeSocketTask = () => {
	if (null != socketTask) {
		socketTask.close();
	}
	clearInterval(heartTime);
}