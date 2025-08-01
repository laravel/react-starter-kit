// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - APPLICATION ||============================== //

const application: NavItemType = {
  id: 'group-application',
  title: 'application',
  type: 'group',
  children: [
    {
      id: 'calendar',
      title: 'calendar',
      type: 'item',
      icon: 'ph ph-calendar-blank',
      url: '/application/calendar'
    },
    {
      id: 'message',
      title: 'message',
      type: 'item',
      icon: 'ph ph-chats-circle',
      url: '/application/message'
    },
    {
      id: 'task',
      title: 'task',
      type: 'collapse',
      icon: 'ph ph-list-bullets',
      children: [
        {
          id: 'task-list',
          title: 'list',
          type: 'item',
          url: '/application/task/list'
        },
        {
          id: 'task-board',
          title: 'board',
          type: 'item',
          url: '/application/task/board'
        },
        {
          id: 'task-details',
          title: 'details',
          type: 'item',
          url: '/application/task/detail'
        }
      ]
    },
    {
      id: 'todo',
      title: 'todo',
      type: 'item',
      icon: 'ph ph-list-checks',
      url: '/application/todo'
    },
    {
      id: 'gallery',
      title: 'gallery',
      type: 'collapse',
      icon: 'ph ph-image',
      children: [
        {
          id: 'grid',
          title: 'grid',
          type: 'item',
          url: '/application/gallery/grid'
        },
        {
          id: 'masonry',
          title: 'masonry',
          type: 'item',
          url: '/application/gallery/masonry'
        },
        {
          id: 'advance',
          title: 'advance',
          type: 'item',
          url: '/application/gallery/advance'
        }
      ]
    },
    {
      id: 'application-invoice',
      title: 'invoice',
      type: 'collapse',
      icon: 'ph ph-printer',
      children: [
        {
          id: 'invoice',
          title: 'invoice',
          type: 'item',
          url: '/application/invoice/invoice'
        },
        {
          id: 'invoice-summary',
          title: 'invoice summary',
          type: 'item',
          url: '/application/invoice/summary'
        },
        {
          id: 'invoice-list',
          title: 'invoice list',
          type: 'item',
          url: '/application/invoice/list'
        }
      ]
    },
    {
      title: 'users',
      type: 'collapse',
      icon: 'ph ph-user-circle',
      children: [
        {
          id: 'users-profile',
          title: 'profile',
          type: 'item',
          url: '/application/users/profile'
        },
        {
          id: 'social-profile',
          title: 'social profile',
          breadcrumbs: false,
          type: 'item',
          url: '/application/users/social-profile'
        },
        {
          id: 'user-card',
          title: 'user card',
          type: 'item',
          url: '/application/users/user-card'
        },
        {
          id: 'user-list',
          title: 'user list',
          type: 'item',
          url: '/application/users/user-list'
        }
      ]
    }
  ]
};

export default application;
