// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - OTHER ||============================== //

const other: NavItemType = {
  id: 'other',
  title: 'other',
  type: 'group',
  children: [
    {
      id: 'menu-levels',
      title: 'menu-levels',
      type: 'collapse',
      icon: 'ph ph-tree-structure',
      children: [
        {
          id: 'level-2.1',
          title: 'level-2.1',
          type: 'item'
        },
        {
          id: 'level-2.2',
          title: 'level-2.2',
          type: 'collapse',
          children: [
            {
              id: 'level-3.1',
              title: 'level-3.1',
              type: 'item'
            },
            {
              id: 'level-3.2',
              title: 'level-3.2',
              type: 'item'
            },
            {
              id: 'level-3.3',
              title: 'level-3.3',
              type: 'collapse',
              children: [
                {
                  id: 'level-4.1',
                  title: 'level-4.1',
                  type: 'item'
                },
                {
                  id: 'level-4.2',
                  title: 'level-4.2',
                  type: 'item'
                }
              ]
            }
          ]
        },
        {
          id: 'level-2.3',
          title: 'level-2.3',
          type: 'collapse',
          children: [
            {
              id: 'level-3.1',
              title: 'level-3.1',
              type: 'item'
            },
            {
              id: 'level-3.2',
              title: 'level-3.2',
              type: 'item'
            },
            {
              id: 'level-3.3',
              title: 'level-3.3',
              type: 'collapse',
              children: [
                {
                  id: 'level-4.1',
                  title: 'level-4.1',
                  type: 'item'
                },
                {
                  id: 'level-4.2',
                  title: 'level-4.2',
                  type: 'item'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'sample-page',
      title: 'sample page',
      type: 'item',
      icon: 'ph ph-desktop',
      url: '/other/sample-page'
    }
  ]
};

export default other;
