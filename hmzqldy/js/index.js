var vm = new Vue({
  el: "#app",
  data: {
    object1: {
      animated: true,
      fadeIn: false,
    },
    object2: {
      animated: true,
      fadeIn: false,
    },
    isBg1: true,
    isBg_p: true,
    isBg_f: false,
    play_show: false
  },
  methods: {
    puzzleSolve: function() {
      this.isBg1 = true,
        this.object1.fadeIn = true,
        this.isBg_p = true,
        this.isBg_f = false
    },
    findClue: function() {
      this.isBg1 = false,
        this.object2.fadeIn = true,
        this.isBg_p = false,
        this.isBg_f = true
    },
    playVideo: function() {
      this.play_show = true
    },
    closeVideo: function() {
      this.play_show = false
    }
  }
})
