# To-Do List App (v2 - Next.js)

## WORKING PROGRES....

A simple, fast, and secure to-do list application built with **Next.js**, **Prisma**, and **PostgreSQL**. Create tasks, manage your to-do list, and authenticate users—all while leveraging **Cloudflare** for security and performance.

**LIVE PREVIEW**: [To-Do List App](https://todo-nextjs.vercel.app)

## Features

- **Create Tasks**: Easily add tasks with descriptions and due dates.
- **Manage Tasks**: Mark tasks as complete, edit, or delete them.
- **User Authentication**: Secure user accounts with sign-up and login functionality.
- **Cloudflare Security**: Handles the real IP addresses even when behind Cloudflare.
- **Prevent Duplicate Tasks**: Users can only create unique tasks.

## Tech Stack

- **Next.js** (Frontend + API)
- **Prisma ORM** (Database interaction)
- **PostgreSQL** (Database)
- **Cloudflare** (Proxy & security)

## Quick Start

1. **Clone the repo**:
    ```bash
    git clone https://github.com/yourusername/todo-nextjs.git
    cd todo-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up your environment**:
    - Create a `.env` file with the following:
    ```env
    DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your_secret"
    ```

4. **Run migrations**:
    ```bash
    npx prisma migrate dev
    ```

5. **Start the app**:
    ```bash
    npm run dev
    ```

---

## Cloudflare Integration

Cloudflare proxies your requests, and we use the `CF-Connecting-IP` header to capture the real IP address of users, ensuring privacy and security.

---

## Deployment

1. Deploy the app to **Vercel** or any cloud platform that supports Next.js.
2. Set the `DATABASE_URL`, `NEXTAUTH_URL`, and any other necessary environment variables.

---

## Contributing

Feel free to fork and submit PRs to improve the app! Contributions are welcome.

## License

MIT License.

---

This adaptation maintains the structure of your original polling app while focusing on the features and functionalities of a to-do list application with user authentication. Let me know if you need any further modifications or additional features!