<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { smAndUp } = useDisplay()
const tab = ref('debit')
</script>

<template>
  <v-layout class="h-screen">
    <v-navigation-drawer
      class="bg-primary-darken-1 h-auto"
      :location="smAndUp ? 'left' : 'bottom'"
      permanent
    >
      <h4 class="text-h4 text-secondary-darken-1 pa-4 d-none d-sm-block">aspire</h4>
      <v-list density="compact" class="d-flex d-sm-block">
        <v-list-item active title="Cards" active-class="text-secondary-darken-1 cursor-pointer">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-4">
      <v-container class="mb-6">
        <v-row justify="space-between">
          <v-col cols="auto">
            <p class="text-subtitle-1">Available balance</p>
            <span class="text-subtitle-2">$2000</span>
          </v-col>
          <v-col cols="auto">
            <v-btn
              density="compact"
              variant="flat"
              prepend-icon="mdi-plus"
              size="medium"
              class="bg-primary pa-1"
              >New card</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-tabs v-model="tab" color="primary" align-tabs="start" class="mb-6">
        <v-tab :value="'debit'">My debit cards</v-tab>
      </v-tabs>
      <v-container class="mb-6 d-flex">
        <v-card class="pa-4">
          <v-card class="bg-secondary debit-card mb-2">
            <v-card-title class="text-white ml-auto">aspire</v-card-title>
            <v-card-text class="text-white">
              <h6 class="text-h6 mb-4">Sahil Kaushal</h6>
              <p class="mb-2">
                <span class="pr-8 font-weight-medium">1636</span>
                <span class="pr-8 font-weight-medium">6131</span>
                <span class="pr-8 font-weight-medium">2333</span>
                <span class="font-weight-medium">2133</span>
              </p>
              <v-row class="text-caption">
                <v-col cols="4">Thru: 12/20</v-col>
                <v-col cols="4">CVV: ***</v-col>
              </v-row>
              <v-icon
                class="ml-auto d-block"
                icon="mdi-credit-card-check-outline"
              ></v-icon> </v-card-text
          ></v-card>
          <v-row>
            <v-col>
              <v-btn
                density="compact"
                variant="flat"
                prepend-icon="mdi-delete"
                size="medium"
                class="text-secondary pa-1 text-caption font-weight-medium"
                ><span class="pl-1">Delete Card</span></v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                density="compact"
                variant="flat"
                prepend-icon="mdi-eye"
                size="medium"
                class="text-secondary pa-1 text-caption font-weight-medium"
              >
                <span class="pl-1">Show card number</span></v-btn
              ></v-col
            >
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-layout>
</template>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.debit-card {
  width: 300px;
  display: flex;
  flex-direction: column;
}
</style>
