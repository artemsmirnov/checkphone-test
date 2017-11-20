<template>
  <div class="dashboard">
    <div class="menu">
      <form @submit.prevent="add(addPhonenumber)" class="add">
        <input name="phonenumber" type="text" v-model="addPhonenumber" placeholder="phonenumber"></input>
        <input type="submit" value="add"></input>
        <div v-if="addError" class="error">
          {{addError}}
        </div>
      </form>

      <button @click="signout()" class="signout">sign out</button>
    </div>

    <div v-if="loading">loading</div>
    <div id="list">
      <PhonenumberEntry
        v-for="phonenumber in list" 
        :key="phonenumber" 
        :phonenumber="phonenumber" 
        @remove="remove(phonenumber)"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import PhonenumberEntry from './PhonenumberEntry'

export default {
  name: 'Dashboard',
  components: {
    PhonenumberEntry
  },
  created () {
    if (!this.loaded) {
      this.getList()
    }
  },
  computed: {
    ...mapState('phonenumbers', ['list', 'loaded', 'loading', 'addError']),
    addPhonenumber: {
      get () {
        return this.$store.state.phonenumbers.addPhonenumber
      },
      set (value) {
        this.$store.commit('phonenumbers/updateAddPhonenumber', value)
      }
    }
  },
  methods: {
    ...mapActions('phonenumbers', ['getList', 'add', 'remove']),
    ...mapActions('auth', ['signout'])
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  border-bottom: 0.05rem solid #888;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.menu .add {
  flex: auto;
  display: flex;
}

.add [name=phonenumber] {
  width: 10rem;
}

.add [type=submit] {
  width: 10rem;
}

.menu .signout {
  width: 10rem;
}

.error {
  color: red;
}
</style>
