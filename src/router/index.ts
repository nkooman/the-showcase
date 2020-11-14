import { createWebHistory, createRouter } from 'vue-router';
import Landing from '@/views/Landing.vue';
import GrayscaleIcons from '@/views/projects/GrayscaleIcons.vue';
import LayeredHeadings from '@/views/projects/LayeredHeadings.vue';
import CityPop from '@/views/projects/CityPop.vue';

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
  },
  {
    path: '/city-pop',
    name: 'City Pop',
    component: CityPop,
    meta: {
      isProject: true,
      createdOn: new Date('11/6/2020')
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
