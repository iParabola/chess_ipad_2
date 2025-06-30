const getJson = (url) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: url,
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject("获取配置文件失败，请刷新重试")
			}
		});
	})
}

export {
	getJson
}