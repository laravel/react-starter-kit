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


### ShadCN UI

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
