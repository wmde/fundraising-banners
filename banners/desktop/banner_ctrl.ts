import './styles/styles.scss';
import { createVueApp } from '../../src/create_vue_app';

import Banner from './components/Banner.vue';

const app = createVueApp( Banner, { greeting: 'Hello' } );
app.mount( '#WMDE-Banner-Container' );
