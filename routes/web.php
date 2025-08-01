<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {return Inertia::render('welcome');})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {return Inertia::render('navigation/dashboard/Default');})->name('dashboard');

    // Dashboard
    Route::get('dashboard/default', function () {return Inertia::render('navigation/dashboard/Default');})->name('default');
    Route::get('dashboard/ecommerce', function () {return Inertia::render('navigation/dashboard/Ecommerce');})->name('ecommerce');
    Route::get('dashboard/crm', function () {return Inertia::render('navigation/dashboard/CRM');})->name('CRM');
    Route::get('dashboard/analytics', function () {return Inertia::render('navigation/dashboard/Analytics');})->name('analytics');
    Route::get('dashboard/crypto', function () {return Inertia::render('navigation/dashboard/Crypto');})->name('crypto');
    Route::get('dashboard/finance', function () {return Inertia::render('navigation/dashboard/Finance');})->name('finance');
    Route::get('dashboard/project', function () {return Inertia::render('navigation/dashboard/Project');})->name('project');

    // Layout
    Route::get('layouts/vertical', function () {return Inertia::render('navigation/layouts/Vertical');})->name('Vertical');
    Route::get('layouts/tab', function () {return Inertia::render('navigation/layouts/Tab');})->name('Tab');
    Route::get('layouts/layout-2', function () {return Inertia::render('navigation/layouts/LayoutTwoPage');})->name('LayoutTwoPage');
    Route::get('layouts/layout-3', function () {return Inertia::render('navigation/layouts/LayoutThreePage');})->name('LayoutThreePage');

    // Widgets
    Route::get('widget/statistics', function () {return Inertia::render('navigation/widgets/statistics/index');})->name('statistics');
    Route::get('widget/data', function () {return Inertia::render('navigation/widgets/DataPages');})->name('DataPages');
    Route::get('widget/table', function () {return Inertia::render('navigation/widgets/TablePages');})->name('TablePages');
    Route::get('widget/user', function () {return Inertia::render('navigation/widgets/UserPage');})->name('UserPage');
    Route::get('widget/chart', function () {return Inertia::render('navigation/widgets/Charts');})->name('Charts');
    
    // Online course
    Route::get('admin-panel/online-course/dashboard/', function () {return Inertia::render('admin-panel/online-courses/Dashboard');})->name('Dashboard');
    Route::get('admin-panel/online-course/teacher/list', function () {return Inertia::render('admin-panel/online-courses/teacher/List');})->name('teacherList');
    Route::get('admin-panel/online-course/teacher/apply', function () {return Inertia::render('admin-panel/online-courses/teacher/Apply');})->name('teacherApply');
    Route::get('admin-panel/online-course/teacher/add', function () {return Inertia::render('admin-panel/online-courses/teacher/Add');})->name('teacherAdd');
    Route::get('admin-panel/online-course/student/list', function () {return Inertia::render('admin-panel/online-courses/student/List');})->name('List');
    Route::get('admin-panel/online-course/student/apply', function () {return Inertia::render('admin-panel/online-courses/student/Apply');})->name('Apply');
    Route::get('admin-panel/online-course/student/add', function () {return Inertia::render('admin-panel/online-courses/student/Add');})->name('Add');
    Route::get('admin-panel/online-course/course/view', function () {return Inertia::render('admin-panel/online-courses/courses/View');})->name('View');
    Route::get('admin-panel/online-course/course/add', function () {return Inertia::render('admin-panel/online-courses/courses/Add');})->name('Add');
    Route::get('admin-panel/online-course/pricing', function () {return Inertia::render('admin-panel/online-courses/Pricing');})->name('Pricing');
    Route::get('admin-panel/online-course/site', function () {return Inertia::render('admin-panel/online-courses/Site');})->name('Site');
    Route::get('admin-panel/online-course/setting/payment', function () {return Inertia::render('admin-panel/online-courses/settings/Payment');})->name('Payment');
    Route::get('admin-panel/online-course/setting/pricing', function () {return Inertia::render('admin-panel/online-courses/settings/Pricing');})->name('Pricing');
    Route::get('admin-panel/online-course/setting/notification', function () {return Inertia::render('admin-panel/online-courses/settings/Notification');})->name('Notification');

    // Helpdesk 
    Route::get('admin-panel/helpdesk/dashboard', function () {return Inertia::render('admin-panel/helpdesk/Dashboard');})->name('Dashboard');
    Route::get('admin-panel/helpdesk/ticket/create', function () {return Inertia::render('admin-panel/helpdesk/tickets/CreateMain');})->name('CreateMain');
    Route::get('admin-panel/helpdesk/ticket/list', function () {return Inertia::render('admin-panel/helpdesk/tickets/ListMain');})->name('ListMain');
    Route::get('admin-panel/helpdesk/ticket/details', function () {return Inertia::render('admin-panel/helpdesk/tickets/DetailsMain');})->name('DetailsMain');
    Route::get('admin-panel/helpdesk/customers', function () {return Inertia::render('admin-panel/helpdesk/Customers');})->name('Customers');
    
    // Membership
    Route::get('admin-panel/membership/dashboard', function () {return Inertia::render('admin-panel/membership/DashboardMain');})->name('DashboardMain'); 
    Route::get('admin-panel/membership/list', function () {return Inertia::render('admin-panel/membership/ListMain');})->name('ListMain'); 
    Route::get('admin-panel/membership/pricing', function () {return Inertia::render('admin-panel/membership/PricingMain');})->name('PricingMain'); 
    Route::get('admin-panel/membership/setting', function () {return Inertia::render('admin-panel/membership/SettingMain');})->name('SettingMain'); 
    
    // Invoice
    Route::get('admin-panel/invoice/dashboard', function () {return Inertia::render('admin-panel/invoice/Dashboard');})->name('Dashboard');
    Route::get('admin-panel/invoice/details', function () {return Inertia::render('admin-panel/invoice/Details');})->name('Details');
    Route::get('admin-panel/invoice/create', function () {return Inertia::render('admin-panel/invoice/Create');})->name('Create');
    Route::get('admin-panel/invoice/list', function () {return Inertia::render('admin-panel/invoice/List');})->name('List');
    Route::get('admin-panel/invoice/edit', function () {return Inertia::render('admin-panel/invoice/Edit');})->name('Edit');
    
    // Basic component
    Route::get('basic/alert', function () {return Inertia::render('components/basic/Alert');})->name('Alert');
    Route::get('basic/buttons', function () {return Inertia::render('components/basic/Button');})->name('Button');
    Route::get('basic/badges', function () {return Inertia::render('components/basic/Badges');})->name('Badges');
    Route::get('basic/breadcrumb', function () {return Inertia::render('components/basic/Breadcrumb');})->name('Breadcrumb');
    Route::get('basic/cards', function () {return Inertia::render('components/basic/Cards');})->name('Cards');
    Route::get('basic/color', function () {return Inertia::render('components/basic/Color');})->name('Color');
    Route::get('basic/collapse', function () {return Inertia::render('components/basic/Collapse');})->name('Collapse');
    Route::get('basic/carousel', function () {return Inertia::render('components/basic/Carousel');})->name('Carousel');
    Route::get('basic/dropdowns', function () {return Inertia::render('components/basic/DropDown');})->name('DropDown');
    Route::get('basic/offcanvas', function () {return Inertia::render('components/basic/OffCanvas');})->name('OffCanvas');
    Route::get('basic/pagination', function () {return Inertia::render('components/basic/Pagination');})->name('Pagination');
    Route::get('basic/progress', function () {return Inertia::render('components/basic/Progress');})->name('Progress');
    Route::get('basic/list-group', function () {return Inertia::render('components/basic/ListGroup');})->name('ListGroup');
    Route::get('basic/modal', function () {return Inertia::render('components/basic/Modal');})->name('Modal');
    Route::get('basic/spinner', function () {return Inertia::render('components/basic/Spinner');})->name('Spinner');
    Route::get('basic/tabs-pills', function () {return Inertia::render('components/basic/TabsPills');})->name('TabsPills');
    Route::get('basic/typography', function () {return Inertia::render('components/basic/Typography');})->name('Typography');
    Route::get('basic/tooltip', function () {return Inertia::render('components/basic/Tooltip');})->name('Tooltip');
    Route::get('basic/toasts', function () {return Inertia::render('components/basic/Toasts');})->name('Toasts');
    Route::get('basic/other', function () {return Inertia::render('components/basic/Other');})->name('Other');

    // Advance component
    Route::get('advance/sweet-alert', function () {return Inertia::render('components/advance/SweetAlert');})->name('SweetAlert');
    Route::get('advance/date-picker', function () {return Inertia::render('components/advance/DatePicker');})->name('DatePicker'); 
    Route::get('advance/light-box', function () {return Inertia::render('components/advance/LightBox');})->name('LightBox'); 
    Route::get('advance/modal', function () {return Inertia::render('components/advance/Modal');})->name('Modal'); 
    Route::get('advance/notification', function () {return Inertia::render('components/advance/Notification');})->name('Notification'); 
    Route::get('advance/range-slider', function () {return Inertia::render('components/advance/RangeSlider');})->name('RangeSlider'); 
    Route::get('advance/slider', function () {return Inertia::render('components/advance/Slider');})->name('Slider'); 
    Route::get('advance/syntax-highlighter', function () {return Inertia::render('components/advance/SyntaxHighLighter');})->name('SyntaxHighLighter'); 
    Route::get('advance/tour', function () {return Inertia::render('components/advance/Tour');})->name('Tour'); 
    Route::get('advance/tree-view', function () {return Inertia::render('components/advance/TreeView');})->name('TreeView'); 
    
    // Other component
    Route::get('animation', function () {return Inertia::render('components/Animation');})->name('Animation'); 
    Route::get('icons', function () {return Inertia::render('components/Icons');})->name('Icons'); 

    // Forms element
    Route::get('forms/form-elements/basic', function () {return Inertia::render('forms/form-element/FormBasic');})->name('FormBasic');
    Route::get('forms/form-elements/floating', function () {return Inertia::render('forms/form-element/FormFloating');})->name('FormFloating');
    Route::get('forms/form-elements/options', function () {return Inertia::render('forms/form-element/FormOption');})->name('FormOption');
    Route::get('forms/form-elements/input-group', function () {return Inertia::render('forms/form-element/InputGroup');})->name('InputGroup');
    Route::get('forms/form-elements/checkbox', function () {return Inertia::render('forms/form-element/Checkbox');})->name('Checkbox');
    Route::get('forms/form-elements/radio', function () {return Inertia::render('forms/form-element/Radio');})->name('Radio');
    Route::get('forms/form-elements/switch', function () {return Inertia::render('forms/form-element/Switch');})->name('Switch');
    Route::get('forms/form-elements/mega-options', function () {return Inertia::render('forms/form-element/MegaOptions');})->name('MegaOptions');
    
    // Forms plugin
    Route::get('forms/form-plugins/date/date-picker', function () {return Inertia::render('forms/form-plugins/date/DatePicker');})->name('DatePicker');
    Route::get('forms/form-plugins/date/date-range-picker', function () {return Inertia::render('forms/form-plugins/date/DateRangePicker');})->name('date/DateRangePicker');
    Route::get('forms/form-plugins/date/time-picker', function () {return Inertia::render('forms/form-plugins/date/TimePickerMain');})->name('date/TimePickerMain');
    Route::get('forms/form-plugins/select/choice-js', function () {return Inertia::render('forms/form-plugins/Choices');})->name('Choices'); 
    Route::get('forms/form-plugins/rating', function () {return Inertia::render('forms/form-plugins/Rating');})->name('Rating'); 
    Route::get('forms/form-plugins/recaptcha', function () {return Inertia::render('forms/form-plugins/GoogleReCaptcha');})->name('GoogleReCaptcha'); 
    Route::get('forms/form-plugins/input-mask', function () {return Inertia::render('forms/form-plugins/InputMask');})->name('InputMask'); 
    Route::get('forms/form-plugins/clipboard', function () {return Inertia::render('forms/form-plugins/ClipboardMain');})->name('ClipboardMain'); 
    Route::get('forms/form-plugins/nouislider', function () {return Inertia::render('forms/form-plugins/NouiSliderMain');})->name('NouiSliderMain'); 
    Route::get('forms/form-plugins/bootstrap-switch', function () {return Inertia::render('forms/form-plugins/BootstrapSwitch');})->name('BootstrapSwitch'); 
    Route::get('forms/form-plugins/typeahead', function () {return Inertia::render('forms/form-plugins/TypeaHeadMain');})->name('TypeaHeadMain'); 
    
    // Forms editor
    Route::get('forms/text-editor/tinymce', function () {return Inertia::render('forms/text-editor/TinyMCE');})->name('TinyMCE'); 
    Route::get('forms/text-editor/quill', function () {return Inertia::render('forms/text-editor/Quill');})->name('quill'); 
    Route::get('forms/text-editor/ck-editor/classic', function () {return Inertia::render('forms/text-editor/ck-editor/ClassicMain');})->name('TinyMCE'); 
    Route::get('forms/text-editor/ck-editor/document', function () {return Inertia::render('forms/text-editor/ck-editor/DocumentMain');})->name('TinyMCE'); 
    Route::get('forms/text-editor/ck-editor/inline', function () {return Inertia::render('forms/text-editor/ck-editor/InlineMain');})->name('TinyMCE'); 
    Route::get('forms/text-editor/ck-editor/balloon', function () {return Inertia::render('forms/text-editor/ck-editor/BalloonEditorMain');})->name('TinyMCE'); 
    Route::get('forms/text-editor/markdown', function () {return Inertia::render('forms/text-editor/MarkDown');})->name('TinyMCE'); 

    // Forms layout
    Route::get('forms/form-layouts/default-layouts', function () {return Inertia::render('forms/forms-layouts/SimpleLayout');})->name('SimpleLayout'); 
    Route::get('forms/form-layouts/multi-layouts', function () {return Inertia::render('forms/forms-layouts/MultiLayouts');})->name('MultiLayouts'); 
    Route::get('forms/form-layouts/action-bar', function () {return Inertia::render('forms/forms-layouts/ActionBars');})->name('ActionBars'); 
    Route::get('forms/form-layouts/sticky-action-bar', function () {return Inertia::render('forms/forms-layouts/StickyActionBarMain');})->name('StickyActionBarMain'); 
    
    // Forms upload
    Route::get('forms/form-upload/dropzone', function () {return Inertia::render('forms/form-upload/DropZone');})->name('DropZone'); 
    Route::get('forms/form-upload/uppy', function () {return Inertia::render('forms/form-upload/Uppy');})->name('Uppy'); 
    
    // Forms validation, wizard, image-cropper
    Route::get('forms/wizard', function () {return Inertia::render('forms/WizardMain');})->name('WizardMain'); 
    Route::get('forms/form-validation', function () {return Inertia::render('forms/FormValidationMain');})->name('FormValidationMain'); 
    Route::get('forms/image-cropper', function () {return Inertia::render('forms/ImageCrop');})->name('ImageCrop'); 

    // Bootstrap table
    Route::get('tables/bootstrap-table/basic-table', function () {return Inertia::render('table/bootstrap-table/BasicTable');})->name('BasicTable'); 
    Route::get('tables/bootstrap-table/sizing-table', function () {return Inertia::render('table/bootstrap-table/SizingTable');})->name('SizingTable'); 
    Route::get('tables/bootstrap-table/border-table', function () {return Inertia::render('table/bootstrap-table/BorderTable');})->name('BorderTable'); 
    Route::get('tables/bootstrap-table/styling-table', function () {return Inertia::render('table/bootstrap-table/StylingTable');})->name('StylingTable'); 

    // React table
    Route::get('tables/react-table/basic', function () {return Inertia::render('table/react-table/Basic');})->name('Basic');
    Route::get('tables/react-table/dense', function () {return Inertia::render('table/react-table/Dense');})->name('Dense');
    Route::get('tables/react-table/sorting', function () {return Inertia::render('table/react-table/Sorting');})->name('Sorting');
    Route::get('tables/react-table/filtering', function () {return Inertia::render('table/react-table/Filtering');})->name('Filtering');
    Route::get('tables/react-table/grouping', function () {return Inertia::render('table/react-table/Grouping');})->name('Grouping');
    Route::get('tables/react-table/pagination', function () {return Inertia::render('table/react-table/Pagination');})->name('Pagination');
    Route::get('tables/react-table/row-selection', function () {return Inertia::render('table/react-table/RowSelection');})->name('RowSelection');
    Route::get('tables/react-table/expanding', function () {return Inertia::render('table/react-table/Expanding');})->name('Expanding');
    Route::get('tables/react-table/drag-drop', function () {return Inertia::render('table/react-table/DragDrop');})->name('DragDrop');
    Route::get('tables/react-table/column-visibility', function () {return Inertia::render('table/react-table/ColumnVisibility');})->name('ColumnVisibility');
    Route::get('tables/react-table/column-resizing', function () {return Inertia::render('table/react-table/ColumnResizing');})->name('ColumnResizing');
    Route::get('tables/react-table/sticky', function () {return Inertia::render('table/react-table/StickyHeader');})->name('StickyHeader');
    Route::get('tables/react-table/umbrella', function () {return Inertia::render('table/react-table/Umbrella');})->name('Umbrella');
    Route::get('tables/react-table/empty', function () {return Inertia::render('table/react-table/Empty');})->name('Empty');
    Route::get('tables/react-table/virtualized', function () {return Inertia::render('table/react-table/Virtualized');})->name('Virtualized');
    Route::get('tables/react-table/edit-table', function () {return Inertia::render('table/react-table/EditTable');})->name('EditTable');

    // Chart
    Route::get('charts/apex-chart', function () {return Inertia::render('charts/ApexChart');})->name('ApexChart');
    Route::get('charts/chart-js', function () {return Inertia::render('charts/ChartJS');})->name('ChartJS');
    
    // Map
    Route::get('map/vector-map', function () {return Inertia::render('maps/VectorMap');})->name('VectorMap');
    Route::get('map/google-map', function () {return Inertia::render('maps/GoogleMap');})->name('GoogleMap');

    // Application calendar, todo, message
    Route::get('application/calendar', function () {return Inertia::render('application/Calendar');})->name('Calendar');
    Route::get('application/message', function () {return Inertia::render('application/Message');})->name('Message');
    Route::get('application/todo', function () {return Inertia::render('application/Todo');})->name('Todo');
    
    // Task
    Route::get('application/task/list', function () {return Inertia::render('application/task/List');})->name('List');
    Route::get('application/task/board', function () {return Inertia::render('application/task/Board');})->name('Board');
    Route::get('application/task/detail', function () {return Inertia::render('application/task/Detail');})->name('Detail');

    // Gallery
    Route::get('application/gallery/advance', function () {return Inertia::render('application/gallery/AdvanceGallery');})->name('AdvanceGallery');
    Route::get('application/gallery/grid', function () {return Inertia::render('application/gallery/GridGallery');})->name('GridGallery');
    Route::get('application/gallery/masonry', function () {return Inertia::render('application/gallery/MasonryGallery');})->name('MasonryGallery');


    // Invoice
    Route::get('application/invoice/invoice', function () {return Inertia::render('application/invoice/index');})->name('invoice');
    Route::get('application/invoice/summary', function () {return Inertia::render('application/invoice/InvoiceSummary');})->name('InvoiceSummary');
    Route::get('application/invoice/list', function () {return Inertia::render('application/invoice/InvoiceList');})->name('InvoiceList');
    
    // User
    Route::get('application/users/user-list', function () {return Inertia::render('application/users/UserList');})->name('UserList'); 
    Route::get('application/users/social-profile', function () {return Inertia::render('application/users/SocialProfile');})->name('SocialProfile'); 
    Route::get('application/users/profile', function () {return Inertia::render('application/users/Profile');})->name('Profile'); 
    Route::get('application/users/user-card', function () {return Inertia::render('application/users/UserCard');})->name('UserCard'); 
    
    // Login
    Route::get('auth/login-v1', function () {return Inertia::render('auth/login/LoginV1');})->name('LoginV1'); 
    Route::get('auth/login-v2', function () {return Inertia::render('auth/login/LoginV2');})->name('LoginV2'); 
    Route::get('auth/login-v3', function () {return Inertia::render('auth/login/LoginV3');})->name('LoginV3'); 
    Route::get('auth/login-v4', function () {return Inertia::render('auth/login/LoginV4');})->name('LoginV4'); 
    Route::get('auth/login-v5', function () {return Inertia::render('auth/login/LoginV5');})->name('LoginV5'); 
    
    // Register
    Route::get('auth/register-v1', function () {return Inertia::render('auth/register/RegisterV1');})->name('RegisterV1');
    Route::get('auth/register-v2', function () {return Inertia::render('auth/register/RegisterV2');})->name('RegisterV2');
    Route::get('auth/register-v3', function () {return Inertia::render('auth/register/RegisterV3');})->name('RegisterV3');
    Route::get('auth/register-v4', function () {return Inertia::render('auth/register/RegisterV4');})->name('RegisterV4');
    Route::get('auth/register-v5', function () {return Inertia::render('auth/register/RegisterV5');})->name('RegisterV5');

    // Reset password
    Route::get('auth/reset-password-v1', function () {return Inertia::render('auth/reset-password/ResetPasswordV1');})->name('ResetPasswordV1');
    Route::get('auth/reset-password-v2', function () {return Inertia::render('auth/reset-password/ResetPasswordV2');})->name('ResetPasswordV2');
    Route::get('auth/reset-password-v3', function () {return Inertia::render('auth/reset-password/ResetPasswordV3');})->name('ResetPasswordV3');
    Route::get('auth/reset-password-v4', function () {return Inertia::render('auth/reset-password/ResetPasswordV4');})->name('ResetPasswordV4');
    Route::get('auth/reset-password-v5', function () {return Inertia::render('auth/reset-password/ResetPasswordV5');})->name('ResetPasswordV5');
    
    // Change password 
    Route::get('auth/change-password-v1', function () {return Inertia::render('auth/change-password/ChangePasswordV1');})->name('ChangePasswordV1');
    Route::get('auth/change-password-v2', function () {return Inertia::render('auth/change-password/ChangePasswordV2');})->name('ChangePasswordV2');
    Route::get('auth/change-password-v3', function () {return Inertia::render('auth/change-password/ChangePasswordV3');})->name('ChangePasswordV3');
    Route::get('auth/change-password-v4', function () {return Inertia::render('auth/change-password/ChangePasswordV4');})->name('ChangePasswordV4');
    Route::get('auth/change-password-v5', function () {return Inertia::render('auth/change-password/ChangePasswordV5');})->name('ChangePasswordV5');

    // Maintenance
    Route::get('pages/maintenance/error', function () {return Inertia::render('maintenance/Error');})->name('Error');
    Route::get('pages/maintenance/coming-soon', function () {return Inertia::render('maintenance/ComingSoon');})->name('ComingSoon');
    Route::get('pages/maintenance/offline-ui', function () {return Inertia::render('maintenance/OfflineUi');})->name('OfflineUi');

    Route::get('landing', function () {return Inertia::render('welcome');})->name('Landing');
    Route::get('other/sample-page', function () {return Inertia::render('SamplePage');})->name('SamplePage');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
