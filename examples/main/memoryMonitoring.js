function MemoryMonitoringBlob() {
	for (var i = 0; i < 200000; i += 1) {
		this['key' + i] = '1234567890';
	}
}