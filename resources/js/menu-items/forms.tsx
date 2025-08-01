// types
import { NavItemType } from '@/types/menu';

// ==============================|| MENU ITEMS - FORM ||============================== //

const formComponents: NavItemType = {
  id: 'forms',
  title: 'forms',
  type: 'group',
  children: [
    {
      id: 'form-elements',
      title: 'form elements',
      type: 'collapse',
      icon: 'ph ph-textbox',
      children: [
        {
          id: 'form-basic',
          title: 'form basic',
          type: 'item',
          url: '/forms/form-elements/basic'
        },
        {
          id: 'form-floating',
          title: 'floating',
          type: 'item',
          url: '/forms/form-elements/floating'
        },
        {
          id: 'form-options',
          title: 'options',
          type: 'item',
          url: '/forms/form-elements/options'
        },
        {
          id: 'form-input-group',
          title: 'input group',
          type: 'item',
          url: '/forms/form-elements/input-group'
        },
        {
          id: 'form-checkbox',
          title: 'checkbox',
          type: 'item',
          url: '/forms/form-elements/checkbox'
        },
        {
          id: 'form-radio',
          title: 'radio',
          type: 'item',
          url: '/forms/form-elements/radio'
        },
        {
          id: 'form-switch',
          title: 'switch',
          type: 'item',
          url: '/forms/form-elements/switch'
        },
        {
          id: 'form-mega-options',
          title: 'mega options',
          type: 'item',
          url: '/forms/form-elements/mega-options'
        }
      ]
    },
    {
      id: 'form-plugins',
      title: 'form plugins',
      type: 'collapse',
      icon: 'ph ph-plug-charging',
      children: [
        {
          id: 'date',
          title: 'date',
          type: 'collapse',
          children: [
            {
              id: 'date-picker',
              title: 'date picker',
              type: 'item',
              url: '/forms/form-plugins/date/date-picker'
            },
            {
              id: 'date-range-picker',
              title: 'date range picker',
              type: 'item',
              url: '/forms/form-plugins/date/date-range-picker'
            },
            {
              id: 'time-picker',
              title: 'time picker',
              type: 'item',
              url: '/forms/form-plugins/date/time-picker'
            }
          ]
        },
        {
          id: 'form select',
          title: 'select',
          type: 'collapse',
          children: [
            {
              id: 'choice-js',
              title: 'choice js',
              type: 'item',
              url: '/forms/form-plugins/select/choice-js'
            }
          ]
        },
        {
          id: 'rating',
          title: 'rating',
          type: 'item',
          url: '/forms/form-plugins/rating'
        },
        {
          id: 'recaptcha',
          title: 'recaptcha',
          type: 'item',
          url: '/forms/form-plugins/recaptcha'
        },
        {
          id: 'input-mask',
          title: 'input mask',
          type: 'item',
          url: '/forms/form-plugins/input-mask'
        },
        {
          id: 'clipboard',
          title: 'clipboard',
          type: 'item',
          url: '/forms/form-plugins/clipboard'
        },
        // {
        //   id: 'nouislider',
        //   title: 'nouislider',
        //   type: 'item',
        //   url: '/forms/form-plugins/nouislider'
        // },
        {
          id: 'bootstrap-switch',
          title: 'bootstrap switch',
          type: 'item',
          url: '/forms/form-plugins/bootstrap-switch'
        },
        {
          id: 'typeahead',
          title: 'typeahead',
          type: 'item',
          url: '/forms/form-plugins/typeahead'
        }
      ]
    },
    {
      id: 'text-editor',
      title: 'text editor',
      type: 'collapse',
      icon: 'ph ph-pen-nib',
      children: [
        {
          id: 'tinymce',
          title: 'tinymce',
          type: 'item',
          url: '/forms/text-editor/tinymce'
        },
        {
          id: 'quill',
          title: 'quill',
          type: 'item',
          url: '/forms/text-editor/quill'
        },
        {
          id: 'ck-editor',
          title: 'ck editor',
          type: 'collapse',
          children: [
            {
              id: 'classic',
              title: 'classic',
              type: 'item',
              url: '/forms/text-editor/ck-editor/classic'
            },
            {
              id: 'document',
              title: 'document',
              type: 'item',
              url: '/forms/text-editor/ck-editor/document'
            },
            {
              id: 'inline',
              title: 'inline',
              type: 'item',
              url: '/forms/text-editor/ck-editor/inline'
            },
            {
              id: 'balloon',
              title: 'balloon',
              type: 'item',
              url: '/forms/text-editor/ck-editor/balloon'
            }
          ]
        },
        {
          id: 'markdown',
          title: 'markdown',
          type: 'item',
          url: '/forms/text-editor/markdown'
        }
      ]
    },
    {
      id: 'form-layouts',
      title: 'form layouts',
      type: 'collapse',
      icon: 'ph ph-windows-logo',
      children: [
        {
          id: 'form-layouts',
          title: 'layouts',
          type: 'item',
          url: '/forms/form-layouts/default-layouts'
        },
        {
          id: 'multi-layouts',
          title: 'multi layouts',
          type: 'item',
          url: '/forms/form-layouts/multi-layouts'
        },
        {
          id: 'action-bar',
          title: 'action bar',
          type: 'item',
          url: '/forms/form-layouts/action-bar'
        },
        {
          id: 'sticky-action-bar',
          title: 'sticky action bar',
          type: 'item',
          url: '/forms/form-layouts/sticky-action-bar'
        }
      ]
    },
    {
      id: 'form-upload',
      title: 'form upload',
      type: 'collapse',
      icon: 'ph ph-cloud-arrow-up',
      children: [
        {
          id: 'dropzone',
          title: 'dropzone',
          type: 'item',
          url: '/forms/form-upload/dropzone'
        },

        {
          id: 'uppy',
          title: 'uppy',
          type: 'item',
          url: '/forms/form-upload/uppy'
        }
      ]
    },
    {
      id: 'wizard',
      title: 'wizard',
      type: 'item',
      icon: 'ph ph-tabs',
      url: '/forms/wizard'
    },
    {
      id: 'form-validation',
      title: 'form validation',
      type: 'item',
      icon: 'ph ph-password',
      url: '/forms/form-validation'
    },
    {
      id: 'image-cropper',
      title: 'image cropper',
      type: 'item',
      icon: 'ph ph-crop',
      url: '/forms/image-cropper'
    }
  ]
};

export default formComponents;
