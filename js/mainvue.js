//vue
var app = new Vue({
	el: ".app1",
	data: {
		mengceng: false,
		play_show: false
	},
	methods: {
		phoneClick: function() {
			alert("敬请期待!")
		},
		choubei: function() {
			alert("正在筹备中!")
		},
		goOnReceive: function() {
			alert("5月25日即可领取")
		},
		playVideo: function() {
			this.play_show = true
		},
		closeVideo: function() {
			this.play_show = false
		}
	}
})