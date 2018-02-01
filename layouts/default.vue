<template>
  <v-app>
    <v-navigation-drawer fixed clipped app>
      <v-list dense>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" clipped-left dark fixed app>
      <v-toolbar-title>MESG</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <v-chip slot="activator">
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{ selectedAccount.alias }}
          <strong class="ml-3">{{ selectedAccount.amount }} MESG</strong>
        </v-chip>
        <v-list>
          <v-list-tile v-for="(account, i) in accounts" :key="i">
            <v-list-tile-title>{{ account.alias }}</v-list-tile-title>
            <v-list-tile-action>
              {{ account.amount }}
              <v-list-tile-action-text>MESG</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-title>Disconnect</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content style="z-index: 1;">
      <nuxt />
    </v-content>
    <v-footer app fixed dark>
      <v-spacer></v-spacer>
      <v-icon class="ml-2">storage</v-icon>
      <span class="ml-2 white--text">3412/5394 blocks</span>
      <v-icon class="ml-2">wifi</v-icon>
      <span class="ml-2 white--text">14/15 peers</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { icon: 'dashboard', title: 'Dashboard', to: '/' },
          { icon: 'layers', title: 'My Workflows', to: '/workflows' },
          { icon: 'account_balance_wallet', title: 'My Wallet', to: '/wallet' },
          { icon: 'apps', title: 'Services', to: '/services' }
        ]
      }
    },
    computed: {
      accounts () {
        return [
          { amount: 123, alias: 'Anthony' },
          { amount: 45, alias: 'Account X' },
          { amount: 12, alias: 'Account Y' }
        ]
      },
      selectedAccount () {
        return this.accounts[0]
      }
    }
  }
</script>
