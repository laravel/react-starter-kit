<?php
// lang/ar/filament.php
return [
    /*
    |--------------------------------------------------------------------------
    | Resource Navigation & Labels
    |--------------------------------------------------------------------------
    */
    'resources' => [
        'tool' => [
            'label' => 'أداة التقييم',
            'plural_label' => 'أدوات التقييم',
            'navigation_label' => 'أدوات التقييم',
            'navigation_group' => 'إدارة التقييم',
        ],
        'domain' => [
            'label' => 'مجال',
            'plural_label' => 'المجالات',
            'navigation_label' => 'المجالات',
        ],
        'category' => [
            'label' => 'فئة',
            'plural_label' => 'الفئات',
            'navigation_label' => 'الفئات',
        ],
        'criterion' => [
            'label' => 'معيار',
            'plural_label' => 'المعايير',
            'navigation_label' => 'المعايير',
        ],
        'assessment' => [
            'label' => 'تقييم',
            'plural_label' => 'التقييمات',
            'navigation_label' => 'التقييمات',
        ],
        'assessment_response' => [
            'label' => 'استجابة التقييم',
            'plural_label' => 'استجابات التقييم',
            'navigation_label' => 'استجابات التقييم',
        ],
        'user' => [
            'label' => 'مستخدم',
            'plural_label' => 'المستخدمون',
            'navigation_label' => 'المستخدمون',
            'navigation_group' => 'إدارة المستخدمين',
        ],
        'guest_session' => [
            'label' => 'جلسة ضيف',
            'plural_label' => 'جلسات الضيوف',
            'navigation_label' => 'جلسات الضيوف',
            'navigation_group' => 'إدارة التقييم',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Common Field Labels
    |--------------------------------------------------------------------------
    */
    'fields' => [
        // Basic fields
        'name' => 'الاسم',
        'name_en' => 'الاسم (بالإنجليزية)',
        'name_ar' => 'الاسم (بالعربية)',
        'description' => 'الوصف',
        'description_en' => 'الوصف (بالإنجليزية)',
        'description_ar' => 'الوصف (بالعربية)',
        'status' => 'الحالة',
        'order' => 'الترتيب',
        'image' => 'الصورة',
        'created_at' => 'تاريخ الإنشاء',
        'updated_at' => 'تاريخ التحديث',

        // Tool specific fields
        'tool_id' => 'أداة التقييم',
        'tool' => 'الأداة',

        // Domain specific fields
        'domain_id' => 'المجال',
        'domain' => 'المجال',
        'weight_percentage' => 'النسبة المئوية للوزن',

        // Category specific fields
        'category_id' => 'الفئة',
        'category' => 'الفئة',

        // Criterion specific fields
        'criterion_id' => 'المعيار',
        'criterion' => 'المعيار',
        'requires_attachment' => 'يتطلب مرفق',

        // Assessment fields
        'user_id' => 'المستخدم',
        'user' => 'المستخدم',
        'email' => 'البريد الإلكتروني',
        'phone' => 'رقم الهاتف',
        'organization' => 'المؤسسة',
        'company' => 'الشركة',
        'company_name' => 'اسم الشركة',
        'company_type' => 'نوع الشركة',
        'position' => 'المنصب',
        'city' => 'المدينة',
        'country' => 'البلد',
        'website' => 'الموقع الإلكتروني',
        'guest_name' => 'اسم الضيف',
        'guest_email' => 'بريد الضيف الإلكتروني',
        'title_en' => 'العنوان (بالإنجليزية)',
        'title_ar' => 'العنوان (بالعربية)',
        'excerpt_ar' => 'الملخص (بالعربية)',
        'content_ar' => 'المحتوى (بالعربية)',
        'published_at' => 'تاريخ ووقت النشر',
        'author' => 'الكاتب',
        'author_name' => 'اسم الكاتب (زائر)',
        'author_email' => 'بريد الكاتب (زائر)',
        'reply_to' => 'الرد على',
        'views' => 'المشاهدات',
        'likes' => 'الإعجابات',
        'comments' => 'التعليقات',
        'started_at' => 'تاريخ البدء',
        'completed_at' => 'تاريخ الإكمال',

        // Assessment Response fields
        'response' => 'الاستجابة',
        'value' => 'القيمة',
        'notes' => 'الملاحظات',
        'attachment' => 'المرفق',

        // User fields
        'password' => 'كلمة المرور',
        'email_verified_at' => 'تاريخ تأكيد البريد الإلكتروني',
        'plan_type' => 'نوع الخطة',
        'subscription_status' => 'حالة الاشتراك',
        'assessments_count' => 'عدد التقييمات',
        'reply' => 'رد',

        // Guest Session fields
        'session_id' => 'معرف الجلسة',
        'ip_address' => 'عنوان IP',
        'user_agent' => 'وكيل المستخدم',
        'device_type' => 'نوع الجهاز',
        'browser' => 'المتصفح',
        'browser_version' => 'إصدار المتصفح',
        'operating_system' => 'نظام التشغيل',
        'location' => 'الموقع',
        'timezone' => 'المنطقة الزمنية',
        'isp' => 'مزود خدمة الإنترنت',
        'session_data' => 'بيانات الجلسة',
        'last_activity' => 'آخر نشاط',
    ],

    /*
    |--------------------------------------------------------------------------
    | Status Values
    |--------------------------------------------------------------------------
    */
    'status' => [
        'active' => 'نشط',
        'inactive' => 'غير نشط',
        'draft' => 'مسودة',
        'in_progress' => 'قيد التنفيذ',
        'completed' => 'مكتمل',
        'archived' => 'مؤرشف',
        'pending' => 'معلق',
        'approved' => 'مقبول',
        'rejected' => 'مرفوض',
        'expired' => 'منتهي الصلاحية',
        'cancelled' => 'ملغي',
    ],

    /*
    |--------------------------------------------------------------------------
    | Plan Types
    |--------------------------------------------------------------------------
    */
    'plans' => [
        'free' => 'مجاني',
        'premium' => 'مميز',
        'professional' => 'احترافي',
        'enterprise' => 'مؤسسي',
    ],

    /*
    |--------------------------------------------------------------------------
    | Company Types
    |--------------------------------------------------------------------------
    */
    'company_types' => [
        'commercial' => 'تجاري',
        'government' => 'حكومي',
        'service' => 'خدمي',
    ],

    /*
    |--------------------------------------------------------------------------
    | Device Types
    |--------------------------------------------------------------------------
    */
    'device_types' => [
        'Desktop' => 'سطح المكتب',
        'Mobile' => 'هاتف محمول',
        'Tablet' => 'جهاز لوحي',
        'Unknown' => 'غير معروف',
    ],

    /*
    |--------------------------------------------------------------------------
    | Response Values
    |--------------------------------------------------------------------------
    */
    'responses' => [
        'yes' => 'نعم',
        'no' => 'لا',
        'na' => 'غير قابل للتطبيق',
    ],

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */
    'actions' => [
        'create' => 'إنشاء',
        'edit' => 'تعديل',
        'view' => 'عرض',
        'delete' => 'حذف',
        'save' => 'حفظ',
        'cancel' => 'إلغاء',
        'search' => 'بحث',
        'filter' => 'تصفية',
        'export' => 'تصدير',
        'import' => 'استيراد',
        'duplicate' => 'نسخ',
        'restore' => 'استعادة',
        'archive' => 'أرشفة',
        'activate' => 'تفعيل',
        'deactivate' => 'إلغاء التفعيل',
        'send_email' => 'إرسال بريد إلكتروني',
        'download_report' => 'تحميل التقرير',
        'view_details' => 'عرض التفاصيل',
        'upgrade_to_premium' => 'الترقية إلى المميز',
        'downgrade_to_free' => 'التراجع إلى المجاني',
        'send_password_reset' => 'إرسال إعادة تعيين كلمة المرور',
        'toggle_subscription' => 'تبديل الاشتراك',
        'contact_user' => 'التواصل مع المستخدم',
        'view_assessment' => 'عرض التقييم',
        'view_user_in_admin' => 'عرض المستخدم في لوحة الإدارة',
        'approve_selected' => 'الموافقة على المحدد',
        'reject_selected' => 'رفض المحدد',
    ],

    /*
    |--------------------------------------------------------------------------
    | Page Titles & Headings
    |--------------------------------------------------------------------------
    */
    'pages' => [
        'dashboard' => 'لوحة التحكم',
        'create' => 'إنشاء :resource',
        'edit' => 'تعديل :resource',
        'view' => 'عرض :resource',
        'list' => 'قائمة :resource',
    ],

    /*
    |--------------------------------------------------------------------------
    | Table Headers & Labels
    |--------------------------------------------------------------------------
    */
    'table' => [
        'no_records' => 'لا توجد سجلات',
        'search_placeholder' => 'البحث...',
        'actions' => 'الإجراءات',
        'bulk_actions' => 'إجراءات مجمعة',
        'selected_count' => 'تم تحديد :count عنصر',
        'per_page' => 'لكل صفحة',
        'page' => 'الصفحة',
        'of' => 'من',
        'results' => 'النتائج',
        'showing' => 'عرض',
        'to' => 'إلى',
    ],

    /*
    |--------------------------------------------------------------------------
    | Form Labels & Messages
    |--------------------------------------------------------------------------
    */
    'form' => [
        'translations' => 'الترجمات',
        'english' => 'الإنجليزية',
        'arabic' => 'العربية',
        'basic_information' => 'المعلومات الأساسية',
        'contact_details' => 'تفاصيل الاتصال',
        'subscription_information' => 'معلومات الاشتراك',
        'user_details' => 'تفاصيل المستخدم',
        'content' => 'المحتوى',
        'media_settings' => 'الوسائط والإعدادات',
        'seo_meta_data' => 'سيو والبيانات الوصفية',
        'assessment_information' => 'معلومات التقييم',
        'session_information' => 'معلومات الجلسة',
        'technical_details' => 'التفاصيل التقنية',
        'location_information' => 'معلومات الموقع',
        'timestamps' => 'الطوابع الزمنية',
        'additional_data' => 'بيانات إضافية',
        'required_field' => 'حقل مطلوب',
        'optional_field' => 'حقل اختياري',
        'select_option' => 'اختر خيار...',
        'upload_file' => 'رفع ملف',
        'drag_drop_file' => 'اسحب وأفلت الملف هنا أو انقر للتصفح',
        'comment_details' => 'تفاصيل التعليق',
    ],

    /*
    |--------------------------------------------------------------------------
    | Notifications & Messages
    |--------------------------------------------------------------------------
    */
    'notifications' => [
        'saved' => 'تم الحفظ بنجاح',
        'deleted' => 'تم الحذف بنجاح',
        'created' => 'تم الإنشاء بنجاح',
        'updated' => 'تم التحديث بنجاح',
        'restored' => 'تم الاستعادة بنجاح',
        'error' => 'حدث خطأ',
        'success' => 'تمت العملية بنجاح',
        'warning' => 'تحذير',
        'info' => 'معلومات',
        'email_sent' => 'تم إرسال البريد الإلكتروني بنجاح',
        'password_reset_sent' => 'تم إرسال رابط إعادة تعيين كلمة المرور بنجاح',
        'user_upgraded' => 'تمت ترقية المستخدم إلى الخطة المميزة',
        'user_downgraded' => 'تم تراجع المستخدم إلى الخطة المجانية',
    ],

    /*
    |--------------------------------------------------------------------------
    | Filters & Tabs
    |--------------------------------------------------------------------------
    */
    'filters' => [
        'all' => 'الكل',
        'active' => 'النشط',
        'inactive' => 'غير النشط',
        'recent' => 'الحديث',
        'completed' => 'المكتمل',
        'in_progress' => 'قيد التنفيذ',
        'draft' => 'المسودات',
        'free_users' => 'المستخدمون المجانيون',
        'premium_users' => 'المستخدمون المميزون',
        'expired' => 'منتهي الصلاحية',
        'last_24_hours' => 'آخر 24 ساعة',
        'last_week' => 'الأسبوع الماضي',
        'last_month' => 'الشهر الماضي',
        'replies_only' => 'الردود فقط',
    ],

    /*
    |--------------------------------------------------------------------------
    | Widgets & Analytics
    |--------------------------------------------------------------------------
    */
    'widgets' => [
        'total_sessions' => 'إجمالي الجلسات',
        'unique_users' => 'المستخدمون الفريدون',
        'completed_assessments' => 'التقييمات المكتملة',
        'conversion_rate' => 'معدل التحويل',
        'device_breakdown' => 'توزيع الأجهزة',
        'geographic_distribution' => 'التوزيع الجغرافي',
        'sessions_trend' => 'اتجاه الجلسات',
        'guest_analytics' => 'تحليلات الضيوف',
        'recent_guest_sessions' => 'جلسات الضيوف الحديثة',
        'increased_by' => 'زاد بنسبة',
        'decreased_by' => 'انخفض بنسبة',
        'sessions_to_completion' => 'الجلسات إلى الإكمال',
        'device_usage' => 'استخدام الأجهزة',
        'sessions_by_country' => 'الجلسات حسب البلد',
        'total_sessions_chart' => 'إجمالي الجلسات',
        'completed_sessions_chart' => 'الجلسات المكتملة',
        'last_7_days' => 'آخر 7 أيام',
        'last_30_days' => 'آخر 30 يوم',
        'last_3_months' => 'آخر 3 أشهر',
        'this_year' => 'هذا العام',
    ],

    /*
    |--------------------------------------------------------------------------
    | Empty States
    |--------------------------------------------------------------------------
    */
    'empty_states' => [
        'no_tools' => 'لا توجد أدوات تقييم',
        'no_assessments' => 'لا توجد تقييمات',
        'no_users' => 'لا توجد مستخدمين',
        'no_sessions' => 'لا توجد جلسات',
        'no_responses' => 'لا توجد استجابات',
        'no_records_found' => 'لم يتم العثور على سجلات',
        'start_by_creating' => 'ابدأ بإنشاء :resource جديد',
        'create_first' => 'إنشاء أول :resource',
    ],
];
