new Vue({
  el: "#app",
  data() {
    return {
      logList: "",
      current: "",
      answer: "",
      operatorClicked: true
    };
  },
  methods: {
    append(number) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.animateNumber(`n${number}`);
      this.current += number;
    },
    addtoLog(operator) {
      if (!this.operatorClicked) {
        this.logList += `${this.current} ${operator} `;
        this.current = "";
        this.operatorClicked = true;
      }
    },
    animateNumber(id) {
      anime({
        targets: `#${id}`,
        backgroundColor: [
          { value: "#222", duration: 100 },
          { value: "#f4faff", duration: 150 }
        ],
        easing: "easeInOutCubic"
      });
    },
    animateOperator(id) {
      anime({
        targets: `#${id}`,
        backgroundColor: [
          { value: "#a6daff", duration: 100 },
          { value: "#d9efff", duration: 150 }
        ],
        easing: "easeInOutCubic"
      });
    },
    clear() {
      this.animateOperator("clear");
      this.current = "";
      this.answer = "";
      this.logList = "";
      this.operatorClicked = false;
    },
    sign() {
      this.animateOperator("sign");
      if (this.current) {
        this.current =
          this.current.charAt(0) === "-"
            ? this.current.slice(1)
            : `-${this.current}`;
      }
    },
    percent() {
      this.animateOperator("percent");
      if (this.current) {
        this.current = (parseFloat(this.current) / 100).toString();
      }
    },
    dot() {
      this.animateNumber("dot");
      if (!this.current.includes(".")) {
        this.current += ".";
      }
    },
    divide() {
      this.animateOperator("divide");
      this.addtoLog("/");
    },
    times() {
      this.animateOperator("times");
      this.addtoLog("*");
    },
    minus() {
      this.animateOperator("minus");
      this.addtoLog("-");
    },
    plus() {
      this.animateOperator("plus");
      this.addtoLog("+");
    },
    equal() {
      this.animateOperator("equal");
      if (!this.operatorClicked) {
        try {
          const result = new Function(`return ${this.logList + this.current}`)();
          this.answer = result.toString();
          this.logList = "";
          this.current = "";
        } catch (error) {
          this.triggerErrorEffect();
          this.answer = "❌ Error!";
        }
      } else {
        this.triggerErrorEffect();
        this.answer = "⚠️ Masukkan Angka!";
      }
    },
    triggerErrorEffect() {
      anime({
        targets: ".calculator",
        translateX: [
          { value: -10, duration: 50 },
          { value: 10, duration: 50 },
          { value: -6, duration: 50 },
          { value: 6, duration: 50 },
          { value: 0, duration: 50 }
        ],
        easing: "easeInOutSine"
      });
    }
  }
});