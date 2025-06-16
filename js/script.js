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
          this.animatePress(`n${number}`);
          this.current += number;
        },
        addtoLog(operator) {
          if (!this.operatorClicked) {
            this.logList += `${this.current} ${operator} `;
            this.current = "";
            this.operatorClicked = true;
          }
        },
        animatePress(id) {
          anime({
            targets: `#${id}`,
            scale: [1, 0.95, 1],
            duration: 150,
            easing: 'easeInOutQuad'
          });
        },
        clear() {
          this.animatePress("clear");
          this.current = "";
          this.answer = "";
          this.logList = "";
          this.operatorClicked = false;
        },
        sign() {
          this.animatePress("sign");
          if (this.current) {
            this.current = this.current.charAt(0) === "-"
              ? this.current.slice(1)
              : `-${this.current}`;
          }
        },
        percent() {
          this.animatePress("percent");
          if (this.current) {
            this.current = (parseFloat(this.current) / 100).toString();
          }
        },
        dot() {
          this.animatePress("dot");
          if (!this.current.includes(".")) {
            this.current += ".";
          }
        },
        divide() {
          this.animatePress("divide");
          this.addtoLog("/");
        },
        times() {
          this.animatePress("times");
          this.addtoLog("*");
        },
        minus() {
          this.animatePress("minus");
          this.addtoLog("-");
        },
        plus() {
          this.animatePress("plus");
          this.addtoLog("+");
        },
        equal() {
          this.animatePress("equal");
          if (!this.operatorClicked) {
            try {
              const result = new Function(`return ${this.logList + this.current}`)();
              this.answer = result.toString();
              this.logList = "";
              this.current = "";
            } catch {
              this.answer = "⚠️ ERROR!";
            }
          } else {
            this.answer = "Masukkan Angka";
          }
        }
      }
    });