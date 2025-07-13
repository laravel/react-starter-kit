module.exports = {
    content: [/* your paths */],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: true,
    },
    // 👇 Make sure this is added
    variants: {
        extend: {
            margin: ['rtl', 'ltr'],
            padding: ['rtl', 'ltr'],
            textAlign: ['rtl', 'ltr'],
        },
    },
}
