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
      @input="x => $emit(x)"
      :options="options">
    </codemirror>
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
          mode: 'text/javascript',
          hintOptions: {
            completeSingle: false
          },
          keyMap: 'sublime',
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: 'monokai',
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
  }

  .fullscreen .CodeMirror {
    height: 100%;
  }
</style>
