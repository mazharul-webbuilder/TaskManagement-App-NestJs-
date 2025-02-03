# TaskManager API

This project is a **backend API** for managing tasks within a Task Management application. It is built with **NestJS**
and provides RESTful endpoints for managing tasks, users, and authentication.

## Main Features

- Task management: create, update, delete, and fetch tasks
- User management and authentication
- Modular and scalable backend architecture

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables by creating a `.env` file.

3. Run database migrations (if applicable):

   ```bash
   npm run typeorm migration:run
   ```

## Running the API

To start the application:

```bash
npm run start:dev
```

## Testing

Run tests using:

```bash
npm run test
```

## License

Licensed under the MIT License.