import './styles/styles.scss';
import { createVueApp } from '@src/create_vue_app';

import MainBanner from './components/MainBanner.vue';

const app = createVueApp( MainBanner, { greeting: 'Hello' } );
app.mount( '#WMDE-Banner-Container' );
