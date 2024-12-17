<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Introduction

Welcome to the Laravel React Starter Kit. This starter kit utilizes Intertia v2, Tailwind V3 (soon to be V4), React 19, and ShadCN UI.

## Installation

To install the React Starter Kit, run the following command:

```
git clone https://github.com/laravel/react-starter-kit.git
cd react-starter-kit
git checkout develop
chmod +x install.sh && ./install.sh
```

This shell file will run the following commands, which you may wish to run manually:

1. cp .env.example .env
2. composer install
3. php artisan key:generate
4. php artisan migrate
5. npm install
6. npm run dev


## Front-end App Structure

The majority of the front-end code is located in the `resources/js` folder. Specifically you'll want to note the following folders:

1. **Components** - All your React components are located here
2. **Pages** - All your Pages are here, including Login.tsx, Register.tsx, Dashboard.tsx, etc
3. **Layouts** - All the Layouts for you app will live here.

### Components

In the components folder is where all your React components will live. Inside this folder you'll also notice a sub-folder called `ui`. This is where you'll find all the ShadCN UI components. More documentation about this below.

### Pages

Most of your application pages will live in this folder. Here you will find the Page templates for Login, Register, Dashboard, etc. These pages are rendered via Inertia. Here's an example, located inside of `routes/web.php`, of how the dashboard page is rendered:

```php
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
```

This code will load the `resources/js/Pages/Dashboard.tsx` file.

### Layouts

All your pages will utilize a layout as the structure for each page. These layout files are located in the `resources/js/Layouts` folder. Currently, there are two layouts, `AppLayout` and `AuthLayout`.

1. **AppLayout** - This layout will be used for all authenticated users.
2. **AuthLayout** - This layout will be used for unauthenticated users and this layout is used specifically for all the Authentication views.

---

## ShadCN UI

All the ShadCN components will be installed inside of the `resources/js/Components/ui` folder.

When you install a UI component, such as the button component:

```bash
npx shadcn@latest add button
```

You'll now have a button component in your `resources/js/Components/ui` folder. You can then use the button component inside of any page.

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <Button>Button</Button>
    )
}
```
