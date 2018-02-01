<template>
  <v-layout row fill-height>
    <v-navigation-drawer permanent light>
      <v-stepper
        v-model="step"
        vertical non-linear
        class="elevation-0">
        <v-stepper-step 
          v-for="task in tasks" :key="task.id"
          editable
          :step="task.id"
          :complete="task.complete">
          {{ task.title }}
          <small v-if="task.description">{{ task.description }}</small>
        </v-stepper-step>
      </v-stepper>
      <v-btn block flat color="primary" @click="add">Add a task</v-btn>
    </v-navigation-drawer>
    <v-flex>
      <v-container>
        <v-stepper v-model="task.step" non-linear>
          <v-stepper-header>
            <v-stepper-step editable :step="1" :complete="task.step > 1">Describe</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :step="2" :complete="task.step > 2">Select</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :step="3" :complete="task.step > 3">Add conditions</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :step="4">Verify</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :step="1">
              <v-text-field v-model="task.title" label="Title"/>
              <v-text-field v-model="task.description" label="Description" multi-line/>
              <v-layout>
                <v-spacer></v-spacer>
                <v-btn @click.native="task.step++">Continue</v-btn>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content :step="2">
              <v-select v-model="task.item" :items="actions" label="Action to trigger">
                <template slot="item" slot-scope="data">
                  <v-divider v-if="data.item.divider"></v-divider>
                  <v-subheader v-else-if="data.item.header">{{ data.item.header }}</v-subheader>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ data.item.text }}</v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-select>
              <template v-if="task.item">
                <v-card class="ma-2" v-for="arg in task.item.arguments" :key="arg.id">
                  <v-card-title>
                    {{ arg.title }} <span class="ml-1 error--text" v-if="arg.required">(required)</span>
                    <v-spacer></v-spacer>
                    <span class="caption">{{arg.type}}</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <p>{{ arg.description }}</p>
                    <v-layout row>
                      <v-flex xs12 md3>
                        <v-select solo :items="argumentValues" v-model="arg.source"></v-select>
                      </v-flex>
                      <v-flex xs12 md9>
                        <v-text-field v-if="arg.source === 'constant'" solo v-model="arg.value" />
                        <v-select v-else-if="arg.source === 'source'" solo :items="[
                          'eventX data #1',
                          'eventX data #2'
                        ]" v-model="arg.value"></v-select>
                        <template v-else>
                          <v-layout row>
                            <v-flex xs4>
                              <v-select solo :items="previousTasks" item-text="title" item-value="id" v-model="arg.task"></v-select>
                            </v-flex>
                            <v-flex xs4>
                              <v-select solo :items="previousEventTask(arg.task)" item-text="title" item-value="id" v-model="arg.eventTask"></v-select>
                            </v-flex>
                            <v-flex xs4>
                              <v-select solo :items="variables(arg.task, arg.eventTask)" item-value="id" v-model="arg.value"></v-select>
                            </v-flex>
                          </v-layout>
                        </template> 
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </template>
              <v-layout>
                <v-spacer></v-spacer>
                <v-btn @click.native="task.step++">Continue</v-btn>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content :step="3">
              <v-layout>
                <v-spacer></v-spacer>
                <v-btn @click.native="task.step++">Continue</v-btn>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content :step="4">
              <v-layout>
                <v-spacer></v-spacer>
                <v-btn @click.native="task.step++">Continue</v-btn>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  // TODO:
  // add extra dependencies to tasks: UI -> depend to the previous one to force a linear flow
  // separate workflow (list of tasks) and the trigger (that trigger a workflow)

  export default {
    data () {
      return {
        step: 1,
        tasks: [
          { title: 'New task', description: 'This is the first task of your workflow' }
        ].map((x, i) => ({ ...x, id: i + 1 }))
      }
    },
    computed: {
      task () {
        const index = Math.min(Math.max(this.step, 1), this.tasks.length) - 1
        return this.tasks[index]
      },
      services () {
        return require('~/assets/services.json').data.allservices
      },
      previousTasks () {
        return this.tasks.slice(0, this.step - 1)
      },
      workflowVariables () {
        return this.previousTasks
          .reduce((acc, task) => [
            ...acc,
            ...((task.item || {}).events || []).reduce((acc2, event) => [
              ...acc2,
              ...event.data.map(data => [task.title, event.title, data.title].join('#'))
            ], [])
          ], [])
      },
      // externalEvents () {
      //   return this.services.reduce((acc, service) => [
      //     ...acc,
      //     ...service.events.map(event => ({
      //       text: [service.title, event.title].join('#'),
      //       value: event
      //     }))
      //   ], [])
      // },
      // workflowEvents () {
      //   return this.tasks.slice(0, this.step - 1)
      //     .map(task => ({
      //       text: `${task.title}#result`,
      //       value: task
      //     }))
      // },
      // events () {
      //   return [
      //     ...this.workflowEvents.length > 0 ? [
      //       { header: 'Workflow events' },
      //       ...this.workflowEvents,
      //       { divider: true }
      //     ] : [],
      //     { header: 'External events' },
      //     ...this.externalEvents
      //   ].filter(x => x)
      // },
      actions () {
        return this.services.reduce((acc, service) => [
          ...acc,
          ...service.tasks.map(task => ({
            text: [service.title, task.title].join('#'),
            value: task
          }))
        ], [])
      },
      argumentValues () {
        return [
          { value: 'source', text: 'Source' },
          { value: 'workflow', text: 'Workflow' },
          { value: 'constant', text: 'Constant' }
        ]
      }
    },
    methods: {
      add () {
        const id = this.tasks.length + 1
        this.tasks = [
          ...this.tasks,
          {
            id,
            title: `New task #${id}`,
            description: '',
            step: 1
          }
        ]
      },
      previousEventTask (id) {
        const task = this.previousTasks
          .find(x => x.id === id)
        if (!task) { return [] }
        return task.item.events
      },
      variables (id, eventId) {
        const event = this.previousEventTask(id)
          .find(x => x.id === eventId)
        if (!event) { return [] }
        return event.data
          .map(x => ({ ...x, text: `${x.title} (${x.type})` }))
      }
    }
  }
</script>