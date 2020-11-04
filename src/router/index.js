import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/views/Landing';
import GrayscaleIcons from '@/views/projects/GrayscaleIcons';
import LayeredHeadings from '@/views/projects/LayeredHeadings';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'The Showcase',
    component: Landing,
    meta: {
      isLanding: true
    }
  },
  {
    path: '/grayscale-icons',
    name: 'Grayscale Icons',
    component: GrayscaleIcons,
    meta: {
      isProject: true,
      createdOn: new Date('10/22/2020')
    }
  },
  {
    path: '/layered-headings',
    name: 'Layered Headings',
    component: LayeredHeadings,
    meta: {
      isProject: true,
      createdOn: new Date('10/27/2020')
    }
  }
];

export const router = new VueRouter({
  routes
});
