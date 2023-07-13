<template>
  <div id="app">
    <h1>Slot Machine Game</h1>
    <div class="credits">Credits: {{ credits }}</div>
    <div class="slot-machine">
      <div class="slot" v-for="slot in slots" :key="slot.id" :class="{ spin: slot.isSpinning }">
        {{ slot.reveal ? slot.value : "" }}
      </div>
    </div>
    <button @click="spin" :disabled="!spinActive">Spin</button>
    <button @mouseover="checkCashOut" @click="cashOut">Cash Out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credits: 10,// Initial number of credits
      slots: [
        // Initial slot machine values
        { id: 1, value: "C", isSpinning: false, reveal: false },
        { id: 2, value: "C", isSpinning: false, reveal: false },
        { id: 3, value: "C", isSpinning: false, reveal: false }
      ],
      symbols: ["C", "L", "O", "W"],// The possible symbols and their corresponding rewards
      prizes: {
        C: 10,
        L: 20,
        O: 30,
        W: 40
      },
      cashOutActive: true,// Controls if the cash out button is active or not
      buttonPosition: { top: '0px', left: '0px' },
      spinActive: true,
    };
  },
  methods: {
    spin() {
      // This function is called when the spin button is pressed

      // Check if the user has enough credits
      if (this.credits <= 0) {
        alert('You are out of credits!');
        return;
      }

      // Reduce credit by 1 for the spin
      this.credits--;

      // Start spinning
      this.slots.forEach(slot => {
        slot.isSpinning = true;
        slot.reveal = false;
      });

      // Stop spinning after a delay
      setTimeout(() => {
        this.slots.forEach(slot => slot.isSpinning = false);
      }, 1000);

      // Generate a random result for each slot
      let newSlots = this.slots.map((slot, index) => {
        let symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];

        // Set reveal delay
        setTimeout(() => {
          slot.value = symbol;
          slot.isSpinning = false;
          slot.reveal = true;
        }, (index + 1) * 1000); // 1 second delay for each slot

        return slot;
      });

      // Check if we have a winner by comparing the values of the slots
      if (newSlots[0].value === newSlots[1].value && newSlots[1].value === newSlots[2].value) {
        // We have a winner
        let prize = this.prizes[newSlots[0].value];
        // Check if we need to reroll based on the new credit value and a random roll
        if ((this.credits + prize >= 40 && this.credits + prize <= 60 && Math.random() < 0.3) ||
          (this.credits + prize > 60 && Math.random() < 0.6)) {
          // Reroll
          this.spin();
        } else {
          // Add the prize to the credits and update the slot values
          this.credits += prize;
          this.slots = newSlots;
        }
      } else {
        this.slots = newSlots;
      }
    },
    resetGame() {
      this.credits = 10; // Reset credits to initial value
      this.spinActive = true; // Enable spin button
    },
    cashOut() {
      // This function is called when the cash out button is pressed

      if (this.cashOutActive) {
        // If the cash out button is active, display a message and reset the credits
        alert(`Cashed out ${this.credits} credits`);
        this.credits = 0;

        // Disable spin button after cash out
        this.spinActive = false;
      }
    },
    checkCashOut() {
      // This function is called when the cash out button is hovered

      const rand = Math.random();
      this.cashOutActive = true;

      if (rand < 0.4) {
        // Make the cash out button unclickable for 2 seconds
        this.cashOutActive = false;
        setTimeout(() => { this.cashOutActive = true; }, 2000);
      } else if (rand < 0.9) {
        // 50% chance of the button moving
        this.moveButton();
      }
      // If rand >= 0.9 (10% chance), do nothing
    },
    moveButton() {
      // Generate a random direction (-1 or 1)
      let direction = Math.random() < 0.5 ? -1 : 1;

      // Calculate the new position
      let top = parseInt(this.buttonPosition.top) + (direction * 300) + 'px';
      let left = parseInt(this.buttonPosition.left) + (direction * 300) + 'px';

      // Update the button position
      this.buttonPosition = { top, left };
    },
  }
};
</script>


<style>
#app {
  text-align: center;
  margin-top: 60px;
}

.credits {
  font-size: 24px;
  margin-bottom: 40px;
}

.slot-machine {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.slot {
  border: 1px solid black;
  padding: 20px;
  margin: 0 10px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}
</style>

