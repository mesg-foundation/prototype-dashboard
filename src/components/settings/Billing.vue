<template>
  <v-card flat>
    <v-toolbar card class="transparent">
      <v-toolbar-title class="headline">
        {{ plan.title }}
        <Price :value="plan.price" :currency="plan.currency"></Price>
        - (
          <Date :value="quotaLimitFrom"></Date>
          -
          <Date :value="quotaLimitTo"></Date>
        )
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <PopupPageButton
        success dark
        :modalWidth="1024"
        :title="$t('upgrade')"
        :to="{ name: 'Plans' }">
        <PlansList></PlansList>
      </PopupPageButton>
    </v-toolbar>
    <v-card-text>
      <Quotas
        :plan="plan"
        :project="currentProject">
      </Quotas>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Usage"
    upgrade: "Upgrade my plan"
</i18n>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  import item from '@/mixins/item'
  import quotasInterval from '@/mixins/quotasInterval'
  import Date from '@/components/Date'
  import Price from '@/components/Price'
  import PlansList from '@/components/plans/List'
  import Quotas from '@/components/Quotas'
  import PopupPageButton from '@/components/PopupPageButton'
  export default {
    components: {
      Date,
      Price,
      PlansList,
      Quotas,
      PopupPageButton
    },
    mixins: [
      quotasInterval,
      withCurrentProject,
      item('plan', component => component.currentProject.plan.id)
    ],
    data () {
      return {
        plansModal: false
      }
    }
  }
</script>
