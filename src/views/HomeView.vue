<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'
import Card from '../components/Card.vue'
import { getCards, deleteCard, addCard, type Card as CardType } from '../utils/requests'
import AddCard from '@/components/AddCard.vue';

const { mdAndUp } = useDisplay()
const state = reactive({
  currentTab: 'debit',
  cards: [] as CardType[]
})

const fetchCard = async () => {
  const res = await getCards()
  state.cards = res.data
}

const onCardDelete = async (index: number) => {
  const res = await deleteCard(index);
  state.cards = res.data
}

const onAddCard = async (card: CardType) => {
  const res = await addCard(card);
  state.cards = res.data
  console.log(state.cards);
}

watchEffect(async () => {
  await fetchCard()
})
</script>

<template>
  <v-layout :class="mdAndUp ? '' : 'bg-primary-darken-1'" class="h-screen">
    <v-navigation-drawer
      class="bg-primary-darken-1 h-auto"
      :location="mdAndUp ? 'left' : 'bottom'"
      permanent
      elevation="5"
    >
      <h4 class="text-h4 text-secondary-darken-1 pa-4 d-none d-md-block">aspire</h4>
      <v-list density="compact" class="d-flex d-md-block" :class="mdAndUp ? '' : 'pa-0'">
        <v-list-item
          active
          title="Cards"
          prepend-icon="mdi-credit-card"
          active-class="text-secondary-darken-1 cursor--pointer"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main__wrapper">
      <v-row justify="space-between" class="mb-6">
        <v-col cols="auto">
          <p class="text-subtitle-1">Available balance</p>
          <span class="text-subtitle-2">$2000</span>
        </v-col>
        <v-col cols="auto">
          <AddCard @add-card="onAddCard"/>
        </v-col>
      </v-row>
      <v-tabs
        v-model="state.currentTab"
        :color="mdAndUp ? 'primary' : 'secondary'"
        align-tabs="start"
        class="mb-6"
      >
        <v-tab :value="'debit'">My debit cards</v-tab>
      </v-tabs>
      <v-row>
        <v-col v-for="(card, index) in state.cards" :key="card.cardNumber" cols="auto">
          <Card :card="card" @delete-card="onCardDelete(index)" />
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>
<style lang="scss" scoped>
.main__wrapper {
  padding: 30px 30px 30px calc(var(--v-layout-left) + 30px);
  overflow: auto;
}

.cursor--pointer {
  cursor: pointer;
}
</style>
