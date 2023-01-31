import {createVueApp} from '../shared/create_vue_app.js';

import HelloWorld from '../shared/vue_components/HelloWorld.vue'

const app = createVueApp( HelloWorld, {greeting: "Hello"} );
app.mount('#WMDE-Banner-Container');

