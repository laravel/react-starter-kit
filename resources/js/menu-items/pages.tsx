// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'pages',
  title: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'authentication',
      type: 'collapse',
      icon: 'ph ph-lock-key',
      children: [
        {
          id: 'login',
          title: 'login',
          type: 'collapse',
          children: [
            {
              id: 'login-v1',
              title: 'login-v1',
              type: 'item',
              url: '/auth/login-v1',
              target: true
            },
            {
              id: 'login-v2',
              title: 'login-v2',
              type: 'item',
              url: '/auth/login-v2',
              target: true
            },
            {
              id: 'login-v3',
              title: 'login-v3',
              type: 'item',
              url: '/auth/login-v3',
              target: true
            },
            {
              id: 'login-v4',
              title: 'login-v4',
              type: 'item',
              url: '/auth/login-v4',
              target: true
            },
            {
              id: 'login-v5',
              title: 'login-v5',
              type: 'item',
              url: '/auth/login-v5',
              target: true
            }
          ]
        },
        {
          id: 'register',
          title: 'register',
          type: 'collapse',
          children: [
            {
              id: 'register-v1',
              title: 'register-v1',
              type: 'item',
              url: '/auth/register-v1',
              target: true
            },
            {
              id: 'register-v2',
              title: 'register-v2',
              type: 'item',
              url: '/auth/register-v2',
              target: true
            },
            {
              id: 'register-v3',
              title: 'register-v3',
              type: 'item',
              url: '/auth/register-v3',
              target: true
            },
            {
              id: 'register-v4',
              title: 'register-v4',
              type: 'item',
              url: '/auth/register-v4',
              target: true
            },
            {
              id: 'register-v5',
              title: 'register-v5',
              type: 'item',
              url: '/auth/register-v5',
              target: true
            }
          ]
        },
        {
          id: 'reset-password',
          title: 'reset-password',
          type: 'collapse',
          children: [
            {
              id: 'reset-password-v1',
              title: 'reset-password-v1',
              type: 'item',
              url: '/auth/reset-password-v1',
              target: true
            },
            {
              id: 'reset-password-v2',
              title: 'reset-password-v2',
              type: 'item',
              url: '/auth/reset-password-v2',
              target: true
            },
            {
              id: 'reset-password-v3',
              title: 'reset-password-v3',
              type: 'item',
              url: '/auth/reset-password-v3',
              target: true
            },
            {
              id: 'reset-password-v4',
              title: 'reset-password-v4',
              type: 'item',
              url: '/auth/reset-password-v4',
              target: true
            },
            {
              id: 'reset-password-v5',
              title: 'reset-password-v5',
              type: 'item',
              url: '/auth/reset-password-v5',
              target: true
            }
          ]
        },
        {
          id: 'change-password',
          title: 'change-password',
          type: 'collapse',
          children: [
            {
              id: 'change-password-v1',
              title: 'change-password-v1',
              type: 'item',
              url: '/auth/change-password-v1',
              target: true
            },
            {
              id: 'change-password-v2',
              title: 'change-password-v2',
              type: 'item',
              url: '/auth/change-password-v2',
              target: true
            },
            {
              id: 'change-password-v3',
              title: 'change-password-v3',
              type: 'item',
              url: '/auth/change-password-v3',
              target: true
            },
            {
              id: 'change-password-v4',
              title: 'change-password-v4',
              type: 'item',
              url: '/auth/change-password-v4',
              target: true
            },
            {
              id: 'change-password-v5',
              title: 'change-password-v5',
              type: 'item',
              url: '/auth/change-password-v5',
              target: true
            }
          ]
        }
      ]
    },
    {
      id: 'maintenance',
      title: 'maintenance',
      type: 'collapse',
      icon: 'ph ph-wrench',
      children: [
        {
          id: 'error',
          title: 'error',
          type: 'item',
          url: '/pages/maintenance/error',
          target: true
        },
        {
          id: 'coming-soon',
          title: 'coming-soon',
          type: 'item',
          url: '/pages/maintenance/coming-soon',
          target: true
        },
        {
          id: 'offline-ui',
          title: 'offline-ui',
          type: 'item',
          url: '/pages/maintenance/offline-ui',
          target: true
        }
      ]
    },

    {
      id: 'landing',
      title: 'landing',
      type: 'item',
      icon: 'ph ph-target',
      url: '/landing',
      target: true
    }
  ]
};

export default pages;
