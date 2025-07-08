<?php
// lang/en/filament.php
return [
    /*
    |--------------------------------------------------------------------------
    | Resource Navigation & Labels
    |--------------------------------------------------------------------------
    */
    'resources' => [
        'tool' => [
            'label' => 'Tool',
            'plural_label' => 'Tools',
            'navigation_label' => 'Tools',
            'navigation_group' => 'Assessment Management',
        ],
        'domain' => [
            'label' => 'Domain',
            'plural_label' => 'Domains',
            'navigation_label' => 'Domains',
        ],
        'category' => [
            'label' => 'Category',
            'plural_label' => 'Categories',
            'navigation_label' => 'Categories',
        ],
        'criterion' => [
            'label' => 'Criterion',
            'plural_label' => 'Criteria',
            'navigation_label' => 'Criteria',
        ],
        'assessment' => [
            'label' => 'Assessment',
            'plural_label' => 'Assessments',
            'navigation_label' => 'Assessments',
        ],
        'assessment_response' => [
            'label' => 'Assessment Response',
            'plural_label' => 'Assessment Responses',
            'navigation_label' => 'Assessment Responses',
        ],
        'user' => [
            'label' => 'User',
            'plural_label' => 'Users',
            'navigation_label' => 'Users',
            'navigation_group' => 'User Management',
        ],
        'guest_session' => [
            'label' => 'Guest Session',
            'plural_label' => 'Guest Sessions',
            'navigation_label' => 'Guest Sessions',
            'navigation_group' => 'Assessment Management',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Common Field Labels
    |--------------------------------------------------------------------------
    */
    'fields' => [
        // Basic fields
        'name' => 'Name',
        'name_en' => 'Name (English)',
        'name_ar' => 'Name (Arabic)',
        'description' => 'Description',
        'description_en' => 'Description (English)',
        'description_ar' => 'Description (Arabic)',
        'status' => 'Status',
        'order' => 'Order',
        'image' => 'Image',
        'created_at' => 'Created At',
        'updated_at' => 'Updated At',

        // Tool specific fields
        'tool_id' => 'Tool',
        'tool' => 'Tool',

        // Domain specific fields
        'domain_id' => 'Domain',
        'domain' => 'Domain',
        'weight_percentage' => 'Weight Percentage',

        // Category specific fields
        'category_id' => 'Category',
        'category' => 'Category',

        // Criterion specific fields
        'criterion_id' => 'Criterion',
        'criterion' => 'Criterion',
        'requires_attachment' => 'Requires Attachment',

        // Assessment fields
        'user_id' => 'User',
        'user' => 'User',
        'email' => 'Email',
        'phone' => 'Phone',
        'organization' => 'Organization',
        'company' => 'Company',
        'company_name' => 'Company Name',
        'company_type' => 'Company Type',
        'position' => 'Position',
        'city' => 'City',
        'country' => 'Country',
        'website' => 'Website',
        'guest_name' => 'Guest Name',
        'guest_email' => 'Guest Email',
        'title_en' => 'Title (English)',
        'title_ar' => 'Title (Arabic)',
        'excerpt_ar' => 'Excerpt (Arabic)',
        'content_ar' => 'Content (Arabic)',
        'published_at' => 'Publish Date & Time',
        'author' => 'Author',
        'author_name' => 'Author Name (Guest)',
        'author_email' => 'Author Email (Guest)',
        'reply_to' => 'Reply To',
        'views' => 'Views',
        'likes' => 'Likes',
        'comments' => 'Comments',
        'started_at' => 'Started At',
        'completed_at' => 'Completed At',

        // Assessment Response fields
        'response' => 'Response',
        'value' => 'Value',
        'notes' => 'Notes',
        'attachment' => 'Attachment',

        // User fields
        'password' => 'Password',
        'email_verified_at' => 'Email Verified At',
        'plan_type' => 'Plan Type',
        'subscription_status' => 'Subscription Status',
        'assessments_count' => 'Assessments Count',
        'reply' => 'Reply',

        // Guest Session fields
        'session_id' => 'Session ID',
        'ip_address' => 'IP Address',
        'user_agent' => 'User Agent',
        'device_type' => 'Device Type',
        'browser' => 'Browser',
        'browser_version' => 'Browser Version',
        'operating_system' => 'Operating System',
        'location' => 'Location',
        'timezone' => 'Timezone',
        'isp' => 'ISP',
        'session_data' => 'Session Data',
        'last_activity' => 'Last Activity',
    ],

    /*
    |--------------------------------------------------------------------------
    | Status Values
    |--------------------------------------------------------------------------
    */
    'status' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
        'draft' => 'Draft',
        'in_progress' => 'In Progress',
        'completed' => 'Completed',
        'archived' => 'Archived',
        'pending' => 'Pending',
        'approved' => 'Approved',
        'rejected' => 'Rejected',
        'expired' => 'Expired',
        'cancelled' => 'Cancelled',
    ],

    /*
    |--------------------------------------------------------------------------
    | Plan Types
    |--------------------------------------------------------------------------
    */
    'plans' => [
        'free' => 'Free',
        'premium' => 'Premium',
        'professional' => 'Professional',
        'enterprise' => 'Enterprise',
    ],

    /*
    |--------------------------------------------------------------------------
    | Company Types
    |--------------------------------------------------------------------------
    */
    'company_types' => [
        'commercial' => 'Commercial',
        'government' => 'Government',
        'service' => 'Service',
    ],

    /*
    |--------------------------------------------------------------------------
    | Device Types
    |--------------------------------------------------------------------------
    */
    'device_types' => [
        'Desktop' => 'Desktop',
        'Mobile' => 'Mobile',
        'Tablet' => 'Tablet',
        'Unknown' => 'Unknown',
    ],

    /*
    |--------------------------------------------------------------------------
    | Response Values
    |--------------------------------------------------------------------------
    */
    'responses' => [
        'yes' => 'Yes',
        'no' => 'No',
        'na' => 'N/A',
    ],

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */
    'actions' => [
        'create' => 'Create',
        'edit' => 'Edit',
        'view' => 'View',
        'delete' => 'Delete',
        'save' => 'Save',
        'cancel' => 'Cancel',
        'search' => 'Search',
        'filter' => 'Filter',
        'export' => 'Export',
        'import' => 'Import',
        'duplicate' => 'Duplicate',
        'restore' => 'Restore',
        'archive' => 'Archive',
        'activate' => 'Activate',
        'deactivate' => 'Deactivate',
        'send_email' => 'Send Email',
        'download_report' => 'Download Report',
        'view_details' => 'View Details',
        'upgrade_to_premium' => 'Upgrade to Premium',
        'downgrade_to_free' => 'Downgrade to Free',
        'send_password_reset' => 'Send Password Reset',
        'toggle_subscription' => 'Toggle Subscription',
        'contact_user' => 'Contact User',
        'view_assessment' => 'View Assessment',
        'view_user_in_admin' => 'View User in Admin',
        'approve_selected' => 'Approve Selected',
        'reject_selected' => 'Reject Selected',
    ],

    /*
    |--------------------------------------------------------------------------
    | Page Titles & Headings
    |--------------------------------------------------------------------------
    */
    'pages' => [
        'dashboard' => 'Dashboard',
        'create' => 'Create :resource',
        'edit' => 'Edit :resource',
        'view' => 'View :resource',
        'list' => 'List :resource',
    ],

    /*
    |--------------------------------------------------------------------------
    | Table Headers & Labels
    |--------------------------------------------------------------------------
    */
    'table' => [
        'no_records' => 'No records found',
        'search_placeholder' => 'Search...',
        'actions' => 'Actions',
        'bulk_actions' => 'Bulk Actions',
        'selected_count' => ':count item(s) selected',
        'per_page' => 'Per Page',
        'page' => 'Page',
        'of' => 'of',
        'results' => 'Results',
        'showing' => 'Showing',
        'to' => 'to',
    ],

    /*
    |--------------------------------------------------------------------------
    | Form Labels & Messages
    |--------------------------------------------------------------------------
    */
    'form' => [
        'translations' => 'Translations',
        'english' => 'English',
        'arabic' => 'Arabic',
        'basic_information' => 'Basic Information',
        'contact_details' => 'Contact Details',
        'subscription_information' => 'Subscription Information',
        'user_details' => 'User Details',
        'content' => 'Content',
        'media_settings' => 'Media & Settings',
        'seo_meta_data' => 'SEO & Meta Data',
        'assessment_information' => 'Assessment Information',
        'session_information' => 'Session Information',
        'technical_details' => 'Technical Details',
        'location_information' => 'Location Information',
        'timestamps' => 'Timestamps',
        'additional_data' => 'Additional Data',
        'required_field' => 'Required Field',
        'optional_field' => 'Optional Field',
        'select_option' => 'Select Option...',
        'upload_file' => 'Upload File',
        'drag_drop_file' => 'Drag & Drop file here or click to browse',
        'comment_details' => 'Comment Details',
    ],

    /*
    |--------------------------------------------------------------------------
    | Notifications & Messages
    |--------------------------------------------------------------------------
    */
    'notifications' => [
        'saved' => 'Saved successfully',
        'deleted' => 'Deleted successfully',
        'created' => 'Created successfully',
        'updated' => 'Updated successfully',
        'restored' => 'Restored successfully',
        'error' => 'An error occurred',
        'success' => 'Operation successful',
        'warning' => 'Warning',
        'info' => 'Info',
        'email_sent' => 'Email sent successfully',
        'password_reset_sent' => 'Password reset link sent',
        'user_upgraded' => 'User upgraded to premium',
        'user_downgraded' => 'User downgraded to free plan',
    ],

    /*
    |--------------------------------------------------------------------------
    | Filters & Tabs
    |--------------------------------------------------------------------------
    */
    'filters' => [
        'all' => 'All',
        'active' => 'Active',
        'inactive' => 'Inactive',
        'recent' => 'Recent',
        'completed' => 'Completed',
        'in_progress' => 'In Progress',
        'draft' => 'Draft',
        'free_users' => 'Free Users',
        'premium_users' => 'Premium Users',
        'expired' => 'Expired',
        'last_24_hours' => 'Last 24 Hours',
        'last_week' => 'Last Week',
        'last_month' => 'Last Month',
        'replies_only' => 'Replies Only',
    ],

    /*
    |--------------------------------------------------------------------------
    | Widgets & Analytics
    |--------------------------------------------------------------------------
    */
    'widgets' => [
        'total_sessions' => 'Total Sessions',
        'unique_users' => 'Unique Users',
        'completed_assessments' => 'Completed Assessments',
        'conversion_rate' => 'Conversion Rate',
        'device_breakdown' => 'Device Breakdown',
        'geographic_distribution' => 'Geographic Distribution',
        'sessions_trend' => 'Sessions Trend',
        'guest_analytics' => 'Guest Analytics',
        'recent_guest_sessions' => 'Recent Guest Sessions',
        'increased_by' => 'Increased by',
        'decreased_by' => 'Decreased by',
        'sessions_to_completion' => 'Sessions to Completion',
        'device_usage' => 'Device Usage',
        'sessions_by_country' => 'Sessions by Country',
        'total_sessions_chart' => 'Total Sessions',
        'completed_sessions_chart' => 'Completed Sessions',
        'last_7_days' => 'Last 7 Days',
        'last_30_days' => 'Last 30 Days',
        'last_3_months' => 'Last 3 Months',
        'this_year' => 'This Year',
    ],

    /*
    |--------------------------------------------------------------------------
    | Empty States
    |--------------------------------------------------------------------------
    */
    'empty_states' => [
        'no_tools' => 'No tools found',
        'no_assessments' => 'No assessments found',
        'no_users' => 'No users found',
        'no_sessions' => 'No sessions found',
        'no_responses' => 'No responses found',
        'no_records_found' => 'No records found',
        'start_by_creating' => 'Start by creating a new :resource',
        'create_first' => 'Create your first :resource',
    ],
];
