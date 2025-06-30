let currentHost = window.location.hostname;
// 服务端
let baseIpPort = "192.168.10.3:8083";
// 文件存储
// let fileIp = "localhost";
let fileIp = "192.168.10.3"
let baseOssIpPort = "http://" + fileIp +":9000/wargame/";

export {
	baseIpPort,
	baseOssIpPort
}
