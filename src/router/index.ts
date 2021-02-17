import { Component } from 'vue';
import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Landing from '@/views/Landing.vue';
import GrayscaleIcons from '@/projects/grayscale-icons/GrayscaleIcons.vue';
import LayeredHeadings from '@/projects/layered-headings/LayeredHeadings.vue';
import CityPop from '@/projects/city-pop/CityPop.vue';
import LostInParadise from '@/projects/lost-in-paradise/LostInParadise.vue';

export type ProjectRoute = RouteRecordRaw & {
  path: String;
  name: String;
  component: Component;
  meta: {
    isLanding?: boolean;
    isProject: boolean;
    createdOn: Date;
  };
};

export const routes: ProjectRoute[] = [
  {
    path: '/',
    alias: '/the-showcase',
    name: 'The Showcase',
    component: Landing,
    meta: {
      isLanding: true,
      isProject: false,
      createdOn: new Date('5/26/2020')
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
  },
  {
    path: '/lost-in-paradise',
    name: 'Lost in Paradise',
    component: LostInParadise,
    meta: {
      isProject: true,
      createdOn: new Date('1/15/2021')
    }
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
