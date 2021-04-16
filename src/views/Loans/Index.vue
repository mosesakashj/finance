<template>
  <v-card>
    <router-view :key="$route.fullPath"></router-view>
  </v-card>
</template>
