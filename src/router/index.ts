import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/messages/:channelId',
      name: 'messages',
      component: () => import('../components/messages/index.vue')
    }
  ]
})

export default router
