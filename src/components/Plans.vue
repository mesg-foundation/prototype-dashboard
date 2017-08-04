<template>
  <v-card flat>
    <v-toolbar card>
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        {{ $t('title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row align-center justify-center wrap>
        <v-flex
          v-for="plan in payedPlans" :key="plan.id"
          xs12 sm4>
          <PlanCard :plan="plan" class="mb-2"></PlanCard>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-card>
        <v-toolbar card>
          <v-toolbar-title class="headline">
            {{ $t('free.title') }}
          </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <p>{{ $t('free.desc', freePlan) }}</p>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Change your plan"
    free:
      title: "We also have a free plan"
      desc: "With the free plan you will be limited to {requests} webhooks / month, with {privateContracts} private contract and have {seats} seat"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import PlanCard from '@/components/PlanCard'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      PlanCard,
      MenuToggle
    },
    mixins: [
      collection('plans')
    ],
    computed: {
      payedPlans () {
        return this.plans.filter(x => x.price > 0)
      },
      freePlan () {
        return this.plans.filter(x => x.price === 0)[0]
      }
    }
  }
</script>
