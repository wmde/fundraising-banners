import './styles/styles.scss';
import { createVueApp } from '../../shared/create_vue_app.ts';

import Banner from './components/Banner.vue';

const app = createVueApp( Banner, { greeting: 'Hello' } );
app.mount( '#WMDE-Banner-Container' );
