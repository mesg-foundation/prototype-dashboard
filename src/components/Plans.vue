<template>
  <v-card flat>
    <v-toolbar card>
      <v-toolbar-title class="headline">
        {{ $t('title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout align-center justify-center>
        <v-flex
          v-for="plan in plans" :key="plan.id"
          xs12 md3>
          <PlanCard :plan="plan">
          </PlanCard>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "List of plans"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import PlanCard from '@/components/PlanCard'
  export default {
    components: {
      PlanCard
    },
    mixins: [
      collection('plans')
    ]
  }
</script>
