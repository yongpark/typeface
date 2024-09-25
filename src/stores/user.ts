import { ref } from 'vue'
import { defineStore } from 'pinia'
import UserFactory from "@/factory/user";

export const useUserStore = defineStore('user', () => {
    const currentUser = ref()
    const users = ref()

    const initUsers = () => {
        currentUser.value = UserFactory.build()
        users.value = [
            currentUser.value,
            UserFactory.build(),
            UserFactory.build(),
            UserFactory.build(),
            UserFactory.build(),
        ]
    }

    return {currentUser, users, initUsers}
})
