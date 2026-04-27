import DefaultTheme from 'vitepress/theme'
import Mermaid from './components/Mermaid.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid)
  }
}
