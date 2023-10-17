<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { defineEmits } from 'vue'
import { useDisplay } from 'vuetify'
import utilMethods from '../utils/methods'

const state = reactive({
  dialogOpen: false,
  valid: false,
  firstname: '',
  lastname: '',
  cardNumber: '',
  expDate: '',
  cvv: '',
  firstNameRules: [(value: string) => !!value || 'First name is required.'],
  lastNameRules: [(value: string) => !!value || 'Last name is required.']
})
const { mdAndUp } = useDisplay()
const emit = defineEmits(['add-card'])

const onAddCard = () => {
  const { valid, firstname, lastname, cardNumber, expDate, cvv } = state
  if (valid) {
    emit('add-card', {
      firstname,
      lastname,
      cardNumber,
      expDate,
      cvv
    })
    closeDialog()
  }
}

const generateCardDetails = () => {
  const { cardNumber, expDate, cvv } = utilMethods.generateCardDetails()
  state.cardNumber = cardNumber
  state.expDate = expDate
  state.cvv = cvv
}

watchEffect(() => {
  if (state.dialogOpen) generateCardDetails()
})

const closeDialog = () => {
  state.firstname = ''
  state.lastname = ''
  state.dialogOpen = false
}
</script>

<template>
  <v-btn
    prepend-icon="mdi-plus"
    size="medium"
    :class="mdAndUp ? 'bg-primary ' : 'bg-secondary'"
    class="pa-1"
    @click="state.dialogOpen = true"
    >New card</v-btn
  >
  <v-dialog v-model="state.dialogOpen" min-width="50%" width="auto">
    <v-card title="Enter card details">
      <v-form @submit.prevent v-model="state.valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="state.firstname"
                :rules="state.firstNameRules"
                label="First name"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="state.lastname"
                :rules="state.lastNameRules"
                label="Last name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="state.cardNumber" label="Card number" disabled></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="state.expDate" label="Expiry date" disabled></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="state.cvv" label="CVV" disabled></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="auto">
              <v-card-actions>
                <v-btn color="secondary" @click="closeDialog()">Close</v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="auto">
              <v-card-actions>
                <v-btn color="primary" variant="flat" type="submit" @click="onAddCard"
                  >Add Card</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped>
.debit-card__wrapper {
  width: 360px;
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
