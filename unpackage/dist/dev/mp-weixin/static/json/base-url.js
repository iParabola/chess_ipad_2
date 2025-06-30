let currentUrl = window.location.hostname;
// 服务端
let baseIpPort = currentUrl +":8083";
// 文件存储
let fileIp = "localhost";
let baseOssIpPort = "http://" + fileIp +":9000/wargame/";

export {
	baseIpPort,
	baseOssIpPort
}
