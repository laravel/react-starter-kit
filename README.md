# Legal Case Management System

## Introduction

The Legal Case Management System is a comprehensive software solution designed to assist legal professionals in efficiently managing their cases, clients, and all related information. This system aims to streamline workflows, improve organization, and enhance overall productivity within legal practices.

## Core Features

The system boasts a robust set of features to cater to the diverse needs of legal professionals:

*   **User Authentication:** Secure user management including login, registration, password reset, and email verification to protect sensitive case data.
*   **Dashboard:** A centralized and intuitive dashboard providing users with an overview of their caseload and important updates immediately after login.
*   **Legal Case Management:** Comprehensive Create, Read, Update, and Delete (CRUD) operations for legal cases. Each case is assigned a unique case code, records entry dates, and can be associated with specific case types.
*   **Individual Management:** CRUD operations for managing information about natural persons (e.g., clients, witnesses, opposing parties) involved in legal cases.
*   **Legal Entity Management:** CRUD operations for managing information about juridical persons or organizations (e.g., corporate clients, courts, government agencies) involved in cases.
*   **Case Type Management:** CRUD operations that allow users to define and manage different categories of legal cases (e.g., Criminal Law, Family Law, Corporate Law), enabling better organization and reporting.

## Case-Specific Functionalities

*   **Participant Management:**
    *   Users can associate individuals (natural persons) and legal entities (juridical persons) with specific legal cases.
    *   The system allows defining roles for these participants within the context of a case (e.g., plaintiff, defendant, lawyer, witness, judge).
*   **Status Tracking:**
    *   The system enables comprehensive tracking of a legal case's status (e.g., "Open," "In Progress," "Pending Client Response," "On Hold," "Closed - Won," "Closed - Lost").
    *   A historical log of all status changes for a case is maintained, providing a clear audit trail.
    *   Case statuses are selected from a predefined, customizable list that can be managed by system administrators.
*   **Procedural Event Logging:**
    *   Users can record significant procedural events, actions, or milestones related to a specific case. This includes, but is not limited to, court hearings, document submissions, client meetings, and internal reviews.
    *   These logged events are subject to CRUD operations, allowing for updates or deletions as the case evolves.
*   **Important Date Management:**
    *   The system provides a dedicated feature for managing and tracking critical dates and deadlines associated with each legal case. This includes court appearance dates, filing deadlines, statute of limitations, and follow-up reminders.
    *   Each important date entry can include a title, a detailed description, and an expiry status to indicate if the deadline has passed or is upcoming.

## Additional Features

*   **Todo Lists and Tasks:**
    *   Users can create and manage personal todo lists for general tasks or case-specific todo lists to track action items for particular legal matters.
    *   Tasks within these lists can be added, updated with details and due dates, and marked as complete, helping users stay organized and on top of their responsibilities.
*   **Search Functionality:**
    *   The system provides robust search capabilities to quickly locate information.
    *   Users can search for legal cases by their unique case code.
    *   It is also possible to search for individuals (clients, witnesses, etc.) and legal entities (organizations, courts, etc.) stored within the system.
    *   A global search bar is available for system-wide searches, and specific sections may feature dedicated search bars for more targeted queries.
*   **User Profile Management & Settings:**
    *   Users have the ability to manage their own profiles, including updating personal contact information and changing their account passwords.
    *   Other relevant settings may include preferences for notifications or interface customization, enhancing the user experience.

## Technical Stack

*   **Backend:** Laravel (PHP Framework) - Provides a robust and scalable foundation for the server-side logic and API development.
*   **Frontend:** React (JavaScript Library) with TypeScript - Enables the creation of dynamic and type-safe user interfaces.
*   **Server-Client Interaction:** Inertia.js - Bridges the gap between the Laravel backend and React frontend, allowing for seamless single-page application experiences without building a separate API.
*   **Styling:** Tailwind CSS - A utility-first CSS framework for rapid UI development and customization.
*   **UI Components:** shadcn/ui & radix-ui - Leverages these libraries for high-quality, accessible, and customizable pre-built UI components.
*   **Build Tool:** Vite - A fast and modern build tool for frontend development, offering quick hot module replacement and optimized builds.
*   **Database:** The system is designed to work with common relational databases supported by Laravel, such as MySQL, PostgreSQL, and SQLite. The specific database connection is configurable via the `.env` file.

## Getting Started / Setup

To set up the Legal Case Management System locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/username/repository-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory> # Or your chosen directory name
    ```
3.  **Install PHP dependencies:**
    ```bash
    composer install
    ```
4.  **Install Node.js dependencies:**
    ```bash
    npm install
    # Alternatively, if you use Yarn:
    # yarn install
    ```
5.  **Create environment file:** Copy the `.env.example` file to a new file named `.env`.
    ```bash
    cp .env.example .env
    ```
6.  **Generate application key:**
    ```bash
    php artisan key:generate
    ```
7.  **Configure database:** Open the `.env` file and update the database connection details (DB_DATABASE, DB_USERNAME, DB_PASSWORD, etc.).
8.  **Run database migrations:** This will create the necessary tables in your database.
    ```bash
    php artisan migrate
    ```
9.  **(Optional) Run database seeders:** To populate the database with initial or sample data.
    ```bash
    php artisan db:seed
    ```
10. **Build frontend assets:**
    For development (with hot module replacement):
    ```bash
    npm run dev
    ```
    For production build:
    ```bash
    npm run build
    ```
11. **Serve the application:**
    You can use Laravel's built-in development server:
    ```bash
    php artisan serve
    ```
    Alternatively, configure a local web server like Nginx or Apache to point to the `public` directory of the project.

## Contributing

Contributions to the Legal Case Management System are highly welcome! Whether it's reporting a bug, suggesting an improvement, or submitting a pull request, your input is valuable.

Please feel free to open an issue on the repository to discuss any changes or report problems. If you would like to contribute code, please fork the repository and submit a pull request with your changes.

While there isn't a formal contribution guide specific to this project yet, following the general contribution best practices of the Laravel and React communities is appreciated. If a test suite is available, please ensure all tests pass before submitting a pull request.
