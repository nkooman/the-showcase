import { Component } from 'vue';
import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Landing from '@/views/Landing.vue';
import GrayscaleIcons from '@/views/projects/GrayscaleIcons.vue';
import LayeredHeadings from '@/views/projects/LayeredHeadings.vue';
import CityPop from '@/views/projects/CityPop.vue';
import LostInParadise from '@/views/projects/LostInParadise.vue';

export type Route = RouteRecordRaw & {
  path: String;
  name: String;
  component: Component;
  meta?: {
    isLanding?: boolean;
    isProject?: boolean;
    createdOn?: Date;
  };
};

export const routes: Route[] = [
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
  history: createWebHistory(),
  routes
});
