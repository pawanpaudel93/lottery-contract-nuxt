<template>
  <div>
    <h2>Lottery Contract </h2>
    <p>This contract is managed by {{manager}}</p>
    <p>Previous winner is: {{winner}}</p>
    <p> There are currently {{players.length}} players registered competing to earn ether worth {{balance}}</p>
    <hr />
    <form @submit.prevent="onSubmit">
      <h4> Want to try your luck? </h4>
      <div>
        <label>Amount of ether to enter</label>
        <input v-model="value" />
      </div>
      <button type="submit">Enter</button>
    </form>
    <hr />
    <h4>Ready to pick a winner?</h4>
    <button @click="pickWinner">Pick a winner</button>
    <hr />
    <h1>{{message}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      manager: "",
      message: "",
      winner: "",
      players: [],
      balance: 0,
      value: 0
    }
  },
  methods: {
    async onSubmit() {
      this.message = "Waiting on transaction success...";
      const accounts = await this.$web3.eth.getAccounts();
      await this.$lottery.methods.enter().send({
        from: accounts[0],
        value: this.$web3.utils.toWei(this.value, 'ether')
      });
      this.message = "You have been entered!";
    },
    async pickWinner() {
      const accounts = await this.$web3.eth.getAccounts();
      this.message = "Waiting on transaction success...";
      await this.$lottery.methods.pickWinner().send({
        from: accounts[0]
      });
      const winner = await this.$lottery.methods.winner().call();
      this.winner = winner;
      this.message = "A winner has been picked!";
    }
  },
  async mounted() {
      const manager = await this.$lottery.methods.manager().call();
      const players = await this.$lottery.methods.getPlayers().call();
      const balance = await this.$web3.eth.getBalance(this.$lottery.options.address);
      const winner = await this.$lottery.methods.winner().call();
      this.winner = winner;
      this.manager = manager;
      this.players = players;
      this.balance = this.$web3.utils.fromWei(balance, 'ether');
  }, 
}
</script>
