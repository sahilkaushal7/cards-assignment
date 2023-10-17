<script setup lang="ts">
import { defineEmits, reactive } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const state = reactive({
  dialog: false,
  showCardNumber: false,
  enableCard: true
})

const cardNumber = props?.card?.cardNumber.match(/.{1,4}/g) || []

const emit = defineEmits(['delete-card'])

const toggleCardNumberVisibility = () => {
  state.showCardNumber = !state.showCardNumber
}
const toggleCardVisibility = () => {
  state.enableCard = !state.enableCard
}

const deleteCard = () => {
  emit('delete-card')
  state.dialog = false
}
</script>

<template>
  <v-card class="pa-4 debit-card__wrapper">
    <v-card :disabled="!state.enableCard" class="bg-secondary d-flex flex-column mb-2" rounded>
      <v-card-title class="text-white ml-auto">aspire</v-card-title>
      <v-card-text class="text-white">
        <h6 class="text-h6 mb-4">{{ card.firstname }} {{ card.lastname }}</h6>
        <p class="mb-2">
          <span
            v-for="(split, index) in cardNumber"
            :key="index"
            :class="index < 3 ? 'pr-8' : ''"
            class="font-weight-medium"
          >
            <span
              v-for="(ch, j) in split"
              :key="j"
              :class="
                !state.showCardNumber && index < 3 ? 'debit-card__card-number--hidden' : 'mr-1'
              "
              >{{ !state.showCardNumber && index < 3 ? '' : ch }}</span
            ></span
          >
        </p>
        <v-row class="text-caption">
          <v-col cols="4">Thru: {{ card.expDate }}</v-col>
          <v-col cols="4">CVV: {{ card.cvv }}</v-col>
        </v-row>
        <v-icon class="ml-auto d-block" icon="mdi-credit-card-check-outline"></v-icon> </v-card-text
    ></v-card>
    <v-row justify="space-between">
      <v-col class="flex-grow-0">
        <v-btn
          variant="flat"
          :prepend-icon="state.enableCard ? 'mdi-lock' : 'mdi-lock-open'"
          size="medium"
          class="text-primary pa-1 text-caption font-weight-medium"
          @click="toggleCardVisibility()"
        >
          <span class="pl-1">{{ state.enableCard ? 'Freeze' : 'Unfreeze' }}</span></v-btn
        ></v-col
      >
      <v-col class="flex-grow-0">
        <v-btn
          variant="flat"
          :prepend-icon="state.showCardNumber ? 'mdi-eye-off' : 'mdi-eye'"
          size="medium"
          class="text-primary pa-1 text-caption font-weight-medium"
          @click="toggleCardNumberVisibility()"
        >
          <span class="pl-1">{{ state.showCardNumber ? 'Hide' : 'Show' }} card digits</span></v-btn
        ></v-col
      >
      <v-col class="flex-grow-0">
        <v-btn
          variant="flat"
          prepend-icon="mdi-delete"
          size="medium"
          class="text-error pa-1 text-caption font-weight-medium"
          @click="state.dialog = true"
          ><span class="pl-1">Delete</span></v-btn
        >
        <v-dialog v-model="state.dialog" width="auto">
          <v-card text="Are you sure?">
            <v-container>
              <v-row justify="end">
                <v-col cols="auto">
                  <v-card-actions>
                    <v-btn color="secondary" @click="state.dialog = false">Close</v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="auto">
                  <v-card-actions>
                    <v-btn color="error" variant="flat" @click="deleteCard">Delete</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>
<style lang="scss" scoped>
.debit-card__wrapper {
  max-width: 360px;
  width: 100%;
  position: relative;
}

.debit-card__card-number--hidden {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: white;
  margin-right: 7px;
  vertical-align: middle;
}
</style>
