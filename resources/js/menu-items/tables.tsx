// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - TABLES ||============================== //

const tableComponents: NavItemType = {
  id: 'tables',
  title: 'tables',
  type: 'group',
  children: [
    {
      id: 'bootstrap-table',
      title: 'bootstrap table',
      type: 'collapse',
      icon: 'ph ph-table',
      children: [
        {
          id: 'basic-table',
          title: 'basic table',
          type: 'item',
          url: '/tables/bootstrap-table/basic-table'
        },
        {
          id: 'sizing-table',
          title: 'sizing-table',
          type: 'item',
          url: '/tables/bootstrap-table/sizing-table'
        },
        {
          id: 'border-table',
          title: 'border table',
          type: 'item',
          url: '/tables/bootstrap-table/border-table'
        },
        {
          id: 'styling-table',
          title: 'styling table',
          type: 'item',
          url: '/tables/bootstrap-table/styling-table'
        }
      ]
    },
    {
      id: 'react-table',
      title: 'react table',
      type: 'collapse',
      icon: 'ph ph-grid-nine',
      children: [
        {
          id: 'basic',
          title: 'basic',
          type: 'item',
          url: '/tables/react-table/basic'
        },
        {
          id: 'dense',
          title: 'dense',
          type: 'item',
          url: '/tables/react-table/dense'
        },
        {
          id: 'sorting',
          title: 'sorting',
          type: 'item',
          url: '/tables/react-table/sorting'
        },
        {
          id: 'filtering',
          title: 'filtering',
          type: 'item',
          url: '/tables/react-table/filtering'
        },
        {
          id: 'grouping',
          title: 'grouping',
          type: 'item',
          url: '/tables/react-table/grouping'
        },
        {
          id: 'pagination',
          title: 'pagination',
          type: 'item',
          url: '/tables/react-table/pagination'
        },
        {
          id: 'row-selection',
          title: 'row selection',
          type: 'item',
          url: '/tables/react-table/row-selection'
        },
        {
          id: 'expanding',
          title: 'expanding',
          type: 'item',
          url: '/tables/react-table/expanding'
        },
        {
          id: 'drag-drop',
          title: 'drag drop',
          type: 'item',
          url: '/tables/react-table/drag-drop'
        },
        {
          id: 'column-visibility',
          title: 'column visibility',
          type: 'item',
          url: '/tables/react-table/column-visibility'
        },
        {
          id: 'column-resizing',
          title: 'column resizing',
          type: 'item',
          url: '/tables/react-table/column-resizing'
        },
        {
          id: 'sticky',
          title: 'sticky',
          type: 'item',
          url: '/tables/react-table/sticky'
        },
        {
          id: 'umbrella',
          title: 'umbrella',
          type: 'item',
          url: '/tables/react-table/umbrella'
        },
        {
          id: 'empty',
          title: 'empty',
          type: 'item',
          url: '/tables/react-table/empty'
        },
        {
          id: 'virtualized',
          title: 'virtualized',
          type: 'item',
          url: '/tables/react-table/virtualized'
        },
        {
          id: 'edit-table',
          title: 'edit table',
          type: 'item',
          url: '/tables/react-table/edit-table'
        }
      ]
    }
  ]
};

export default tableComponents;
