import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Landing from '@/views/Landing.vue';
import Ideas from '@/ideas.md';
import GrayscaleIcons from '@/projects/grayscale-icons/GrayscaleIcons.vue';
import GrayscaleIconsMarkdown from '@/projects/grayscale-icons/grayscale-icons.md';
import LayeredHeadings from '@/projects/layered-headings/LayeredHeadings.vue';
import LayeredHeadingsMarkdown from '@/projects/layered-headings/layered-headings.md';
import CityPop from '@/projects/city-pop/CityPop.vue';
import CityPopMarkdown from '@/projects/city-pop/city-pop.md';
import LostInParadise from '@/projects/lost-in-paradise/LostInParadise.vue';
import LostInParadiseMarkdown from '@/projects/lost-in-paradise/lost-in-paradise.md';
import Neumorphism from '@/projects/neumorphism/Neumorphism.vue';
import NeumorphismMarkdown from '@/projects/neumorphism/neumorphism.md';
import ModernEcommerce from '@/projects/modern-ecommerce/ModernEcommerce.vue';
import ModernEcommerceMarkdown from '@/projects/modern-ecommerce/modern-ecommerce.md';

declare module 'vue-router' {
  interface RouteMeta {
    isLanding?: boolean;
    isProject: boolean;
    createdOn: Date;
    markdown: string;
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'The Showcase',
    component: Landing,
    meta: {
      isLanding: true,
      isProject: false,
      createdOn: new Date('5/26/2020'),
      markdown: Ideas
    }
  },
  {
    path: '/grayscale-icons',
    name: 'Grayscale Icons',
    component: GrayscaleIcons,
    meta: {
      isProject: true,
      createdOn: new Date('10/22/2020'),
      markdown: GrayscaleIconsMarkdown
    }
  },
  {
    path: '/layered-headings',
    name: 'Layered Headings',
    component: LayeredHeadings,
    meta: {
      isProject: true,
      createdOn: new Date('10/27/2020'),
      markdown: LayeredHeadingsMarkdown
    }
  },
  {
    path: '/city-pop',
    name: 'City Pop',
    component: CityPop,
    meta: {
      isProject: true,
      createdOn: new Date('11/6/2020'),
      markdown: CityPopMarkdown
    }
  },
  {
    path: '/lost-in-paradise',
    name: 'Lost in Paradise',
    component: LostInParadise,
    meta: {
      isProject: true,
      createdOn: new Date('1/15/2021'),
      markdown: LostInParadiseMarkdown
    }
  },
  {
    path: '/neumorphism',
    name: 'Neumorphism',
    component: Neumorphism,
    meta: {
      isProject: true,
      createdOn: new Date('2/21/2021'),
      markdown: NeumorphismMarkdown
    }
  },
  {
    path: '/modern-ecommerce',
    name: 'Modern Ecommerce',
    component: ModernEcommerce,
    meta: {
      isProject: true,
      createdOn: new Date('6/3/2021'),
      markdown: ModernEcommerceMarkdown
    }
  }
];

const scrollBehavior = () => {
  return { top: 0 };
};

export const router = createRouter({
  history: createWebHashHistory('/the-showcase/'),
  scrollBehavior,
  routes
});
