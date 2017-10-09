<template>
  <v-card dark :flat="!fullscreen" :class="{ fullscreen }">
    <v-toolbar dense dark card>
      <v-toolbar-title class="headline">{{ title || $t('title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="fullscreen" icon @click.stop="fullscreen = false"><v-icon>fullscreen_exit</v-icon></v-btn>
      <v-btn v-else icon @click.stop="fullscreen = true"><v-icon>fullscreen</v-icon></v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <codemirror
      :value="value"
      @input="x => $emit('input', x)"
      :options="options">
    </codemirror>
    <p class="caption pa-1">{{ hint }}</p>
    <p v-for="(error, i) in rules" :key="i" class="caption error white--text pa-1">{{ error }}</p>
  </v-card>
</template>

<i18n>
  en:
    title: "Edit my code"
</i18n>

<script>
  import { codemirror } from 'vue-codemirror'
  require('codemirror/addon/selection/active-line.js')
  // styleSelectedText
  require('codemirror/addon/selection/mark-selection.js')
  require('codemirror/addon/search/searchcursor.js')
  // hint
  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/hint/show-hint.css')
  require('codemirror/addon/hint/javascript-hint.js')
  require('codemirror/addon/selection/active-line.js')
  // highlightSelectionMatches
  require('codemirror/addon/scroll/annotatescrollbar.js')
  require('codemirror/addon/search/matchesonscrollbar.js')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/match-highlighter.js')
  // keyMap
  require('codemirror/mode/clike/clike.js')
  require('codemirror/addon/edit/matchbrackets.js')
  require('codemirror/addon/comment/comment.js')
  require('codemirror/addon/dialog/dialog.js')
  require('codemirror/addon/dialog/dialog.css')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/search.js')
  require('codemirror/keymap/sublime.js')
  // foldGutter
  require('codemirror/addon/fold/foldgutter.css')
  require('codemirror/addon/fold/brace-fold.js')
  require('codemirror/addon/fold/comment-fold.js')
  require('codemirror/addon/fold/foldcode.js')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/fold/indent-fold.js')
  require('codemirror/addon/fold/markdown-fold.js')
  require('codemirror/addon/fold/xml-fold.js')

  export default {
    components: {
      codemirror
    },
    props: {
      value: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: null
      },
      mode: {
        type: String,
        default: 'text/javascript'
      },
      theme: {
        type: String,
        default: 'monokai'
      },
      hint: {
        type: String,
        default: ''
      },
      rules: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        fullscreen: false,
        options: {
          tabSize: 2,
          styleActiveLine: false,
          lineNumbers: false,
          line: true,
          foldGutter: true,
          styleSelectedText: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          mode: this.mode,
          hintOptions: {
            completeSingle: false
          },
          keyMap: 'sublime',
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: this.theme,
          extraKeys: { 'Ctrl': 'autocomplete' }
        }
      }
    }
  }
</script>

<style>
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
  }

  .CodeMirror {
    padding: .5em;
  }

  .CodeMirror pre {
    padding-left: 1em;
  }

  .fullscreen .divider {
    flex: none;
  }
  .fullscreen .CodeMirror {
    flex: 1;
  }
</style>
