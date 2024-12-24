<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://cdn.devdojo.com/assets/svg/laravel-react-logo.svg" width="300" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/react-starter-kit/actions"><img src="https://github.com/laravel/react-starter-kit/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

<img src="https://cdn.devdojo.com/images/december2024/preview.png" />

## Introduction

Welcome to the <a href="https://laravel.com" target="_blank">Laravel</a> React</a> Starter Kit. This starter kit utilizes <a href="https://inertiajs.com/" target="_blank">Intertia v2</a>, <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>,V3 (soon to be V4), <a href="https://reactjs.dev" target="_blank">React 19</a>, and <a href="https://ui.shadcn.com/" target="_blank">ShadCN UI</a>.

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

## Features

This Starter Kit includes the following features:

 - **User Authentication** (login, register, password reset, email verify, and password confirmation)
 - **Dashboard Page** (Auth Protected User Dashboard Page)
 - **Settings Page** (Profile Update, Password Update, Delete Account)
 


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

All your pages will utilize a layout as the structure for each page. These layout files are located in the `resources/js/Layouts` folder. Currently, there will be two layouts. An `App` layout and an `Auth` layout.

1. **AppLayout** - This layout will be used for all authenticated users.
2. **Auth\AuthBase** - This is the main layout for your authentication pages, more info below.

### Authentication Layouts

The Authentication layouts are used specifically for all the Authentication views. You'll notice that there are a few different layouts in the `resources/js/Layouts/Auth` folder. This is because we provide you with three layouts to choose from.

#### AuthSimpleLayout.tsx

A clean and simple layout for your authentication pages.

![Simple Auth Layout Screenshot](https://cdn.devdojo.com/images/december2024/simple-layout.png)

#### AuthCardLayout.tsx

A layout with a slightly darker background and with the auth form inside a card.

![Simple Auth Layout Screenshot](https://cdn.devdojo.com/images/december2024/card-layout.png)

#### SplitLayout.tsx

A split view authentication layout screen

![Simple Auth Layout Screenshot](https://cdn.devdojo.com/images/december2024/split-layout.png)

---

To change the Layout you would like to use, simply change the Layout file that is imported in the **AppBase.tsx**. As an example, to use the `AuthSplitLayout.tsx`, the first line would be modified to look like the following:

```tsx
import AuthLayoutTemplate from "@/Layouts/Auth/AuthSplitLayout";
```

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
