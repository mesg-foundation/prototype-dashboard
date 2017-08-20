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
          <PlanItem :plan="plan" class="mb-2"></PlanItem>
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
      desc: "With the free plan you will be limited to {executions} triggers / month, with {contracts} contract and have {members} member"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import MenuToggle from '@/components/MenuToggle'
  import PlanItem from './Item'
  export default {
    components: {
      PlanItem,
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
