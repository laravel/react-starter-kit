// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - UI-COMPONENTS ||============================== //

const uiComponents: NavItemType = {
  id: 'group-ui-components',
  title: 'ui components',
  type: 'group',
  children: [
    {
      id: 'basic',
      title: 'basic',
      icon: 'ph ph-pencil-ruler',
      type: 'collapse',
      children: [
        {
          id: 'alert',
          title: 'alert',
          type: 'item',
          url: '/basic/alert'
        },
        {
          id: 'button',
          title: 'button',
          type: 'item',
          url: '/basic/buttons'
        },
        {
          id: 'badges',
          title: 'badges',
          type: 'item',
          url: '/basic/badges'
        },
        {
          id: 'breadcrumb',
          title: 'breadcrumb',
          type: 'item',
          url: '/basic/breadcrumb'
        },
        {
          id: 'cards',
          title: 'cards',
          type: 'item',
          url: '/basic/cards'
        },
        {
          id: 'color',
          title: 'color',
          type: 'item',
          url: '/basic/color'
        },
        {
          id: 'collapse',
          title: 'collapse',
          type: 'item',
          url: '/basic/collapse'
        },
        {
          id: 'carousel',
          title: 'carousel',
          type: 'item',
          url: '/basic/carousel'
        },
        {
          id: 'dropdowns',
          title: 'dropdowns',
          type: 'item',
          url: '/basic/dropdowns'
        },
        {
          id: 'offcanvas',
          title: 'offcanvas',
          type: 'item',
          url: '/basic/offcanvas'
        },
        {
          id: 'pagination',
          title: 'pagination',
          type: 'item',
          url: '/basic/pagination'
        },
        {
          id: 'progress',
          title: 'progress',
          type: 'item',
          url: '/basic/progress'
        },
        {
          id: 'list group',
          title: 'list group',
          type: 'item',
          url: '/basic/list-group'
        },
        {
          id: 'modal',
          title: 'modal',
          type: 'item',
          url: '/basic/modal'
        },
        {
          id: 'spinner',
          title: 'spinner',
          type: 'item',
          url: '/basic/spinner'
        },
        {
          id: 'tabs-pills',
          title: 'tabs-pills',
          type: 'item',
          url: '/basic/tabs-pills'
        },
        {
          id: 'typography',
          title: 'typography',
          type: 'item',
          url: '/basic/typography'
        },
        {
          id: 'tooltip',
          title: 'tooltip',
          type: 'item',
          url: '/basic/tooltip'
        },
        {
          id: 'toasts',
          title: 'toasts',
          type: 'item',
          url: '/basic/toasts'
        },
        {
          id: 'other',
          title: 'other',
          type: 'item',
          url: '/basic/other'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'advanced',
      icon: 'ph ph-briefcase',
      type: 'collapse',
      children: [
        {
          id: 'sweet-alert',
          title: 'sweet alert',
          type: 'item',
          url: '/advance/sweet-alert'
        },
        {
          id: 'date-picker',
          title: 'date picker',
          type: 'item',
          url: '/advance/date-picker'
        },
        {
          id: 'lightbox',
          title: 'lightbox',
          type: 'item',
          url: '/advance/light-box'
        },
        {
          id: 'modal',
          title: 'modal',
          type: 'item',
          url: '/advance/modal'
        },
        {
          id: 'notification',
          title: 'notification',
          type: 'item',
          url: '/advance/notification'
        },
        {
          id: 'range-slider',
          title: 'range slider',
          type: 'item',
          url: '/advance/range-slider'
        },
        {
          id: 'slider',
          title: 'slider',
          type: 'item',
          url: '/advance/slider'
        },
        {
          id: 'syntax-highlighter',
          title: 'syntax highlighter',
          type: 'item',
          url: '/advance/syntax-highlighter'
        },
        {
          id: 'tour',
          title: 'tour',
          type: 'item',
          url: '/advance/tour'
        },
        {
          id: 'tree-view',
          title: 'tree view',
          type: 'item',
          url: '/advance/tree-view'
        }
      ]
    },
    {
      id: 'animation',
      title: 'animation',
      icon: 'ph ph-vinyl-record',
      type: 'item',
      url: '/animation'
    },
    {
      id: 'icons',
      title: 'icons',
      icon: 'ph ph-feather',
      type: 'item',
      url: '/icons'
    }
  ]
};

export default uiComponents;
