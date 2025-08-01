// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - ADMIN PANEL ||============================== //

const adminPanel: NavItemType = {
  id: 'admin-panel',
  title: 'admin-panel',
  type: 'group',
  children: [
    {
      id: 'online-course',
      title: 'online course',
      type: 'collapse',
      icon: 'ph ph-book-open-text',
      children: [
        {
          id: 'online-course-dashboard',
          title: 'dashboard',
          type: 'item',
          url: '/admin-panel/online-course/dashboard'
        },
        {
          id: 'teacher',
          title: 'teacher',
          type: 'collapse',
          children: [
            {
              id: 'teacher-list',
              title: 'list',
              type: 'item',
              url: '/admin-panel/online-course/teacher/list'
            },
            {
              id: 'teacher-apply',
              title: 'apply',
              type: 'item',
              url: '/admin-panel/online-course/teacher/apply'
            },
            {
              id: 'teacher-add',
              title: 'add',
              type: 'item',
              url: '/admin-panel/online-course/teacher/add'
            }
          ]
        },
        {
          id: 'student',
          title: 'student',
          type: 'collapse',
          children: [
            {
              id: 'student-list',
              title: 'list',
              type: 'item',
              url: '/admin-panel/online-course/student/list'
            },
            {
              id: 'student-apply',
              title: 'apply',
              type: 'item',
              url: '/admin-panel/online-course/student/apply'
            },
            {
              id: 'student-add',
              title: 'add',
              type: 'item',
              url: '/admin-panel/online-course/student/add'
            }
          ]
        },
        {
          id: 'course',
          title: 'course',
          type: 'collapse',
          children: [
            {
              id: 'course-view',
              title: 'view',
              type: 'item',
              url: '/admin-panel/online-course/course/view'
            },
            {
              id: 'course-add',
              title: 'add',
              type: 'item',
              url: '/admin-panel/online-course/course/add'
            }
          ]
        },
        {
          id: 'pricing',
          title: 'pricing',
          type: 'item',
          url: '/admin-panel/online-course/pricing'
        },
        {
          id: 'site',
          title: 'site',
          type: 'item',
          url: '/admin-panel/online-course/site'
        },
        {
          id: 'setting',
          title: 'setting',
          type: 'collapse',
          children: [
            {
              id: 'setting-payment',
              title: 'payment',
              type: 'item',
              url: '/admin-panel/online-course/setting/payment'
            },
            {
              id: 'setting-pricing',
              title: 'pricing',
              type: 'item',
              url: '/admin-panel/online-course/setting/pricing'
            },
            {
              id: 'setting-notification',
              title: 'notification',
              type: 'item',
              url: '/admin-panel/online-course/setting/notification'
            }
          ]
        }
      ]
    },

    {
      id: 'membership',
      title: 'membership',
      type: 'collapse',
      icon: 'ph ph-users-four',
      children: [
        {
          id: 'dashboard',
          title: 'dashboard',
          type: 'item',
          url: '/admin-panel/membership/dashboard'
        },
        {
          id: 'list',
          title: 'list',
          type: 'item',
          url: '/admin-panel/membership/list'
        },
        {
          id: 'pricing',
          title: 'pricing',
          type: 'item',
          url: '/admin-panel/membership/pricing'
        },
        {
          id: 'setting',
          title: 'setting',
          type: 'item',
          url: '/admin-panel/membership/setting'
        }
      ]
    },
    {
      id: 'helpdesk',
      title: 'helpdesk',
      type: 'collapse',
      icon: 'ph ph-lifebuoy',
      children: [
        {
          id: 'helpdesk-dashboard',
          title: 'dashboard',
          type: 'item',
          url: '/admin-panel/helpdesk/dashboard'
        },
        {
          id: 'helpdesk-ticket',
          title: 'ticket',
          type: 'collapse',
          children: [
            {
              id: 'helpdesk-create',
              title: 'create',
              type: 'item',
              url: '/admin-panel/helpdesk/ticket/create'
            },
            {
              id: 'helpdesk-list',
              title: 'list',
              type: 'item',
              url: '/admin-panel/helpdesk/ticket/list'
            },
            {
              id: 'helpdesk-details',
              title: 'details',
              type: 'item',
              url: '/admin-panel/helpdesk/ticket/details'
            }
          ]
        },
        {
          id: 'customers',
          title: 'customers',
          type: 'item',
          url: '/admin-panel/helpdesk/customers'
        }
      ]
    },
    {
      id: 'admin-invoice',
      title: 'invoice',
      type: 'collapse',
      icon: 'ph ph-printer',
      children: [
        {
          id: 'invoice-dashboard',
          title: 'dashboard',
          type: 'item',
          url: '/admin-panel/invoice/dashboard'
        },
        {
          id: 'invoice-create',
          title: 'create',
          type: 'item',
          url: '/admin-panel/invoice/create'
        },
        {
          id: 'invoice-details',
          title: 'details',
          type: 'item',
          url: '/admin-panel/invoice/details'
        },
        {
          id: 'invoice-list',
          title: 'list',
          type: 'item',
          url: '/admin-panel/invoice/list'
        },
        {
          id: 'invoice-edit',
          title: 'edit',
          type: 'item',
          url: '/admin-panel/invoice/edit'
        }
      ]
    }
  ]
};

export default adminPanel;
