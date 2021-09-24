<template>
  <div class="user">
    <form @submit.prevent="createUser">
        <label>
            Enter user name: 
        </label>
        <input
            type="text"
            value="new"
            v-model="user"
        />  
    </form>
  </div>
</template>

<script>
import logMixin from "../mixins/logMixin"

export default {
    mixins: [logMixin],
    data() {
        return {
            user: ''
        }
    },
    methods: {
        createUser () {
            if (this.user.includes(',') || this.user.includes(';')) {
                alert('Exclude from name special characters')
            } else {
                this.$emit('submit', this.user)

                this.logMessage('User created:', this.user)
            }
        },
    }
}
</script>

<style lang="scss">
 .user {
     font-size: 16px;
     padding: 20px;
 }
</style>
