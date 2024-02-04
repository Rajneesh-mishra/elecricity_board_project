## Electricity Connection Management

### Prerequisites

- **Python:** Install Python by following the [official Python installation guide](https://www.python.org/downloads/).
- **Node.js:** Set up Node.js using the [official installation guide](https://nodejs.org/).

### Database Setup

1. **PostgreSQL:**
   - Ensure PostgreSQL is installed. Follow the official guide for installation.

2. **Backend .env Configuration:**
   - Specify the required database details in the `.env` file.

### Frontend

1. **Getting Started:**
   - Navigate to the frontend directory.
   - Run `npm install` to install dependencies.
   - Start the development server with `npm start`.
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

   **Note:** Ensure the port is set to 3000; adjust it in the backend's `main.js` if needed.

### Backend

1. **Getting Started:**
   - Navigate to the backend directory.

2. **Python Setup:**
   - Create a virtual environment:
     ```bash
     python -m venv venv
     ```

   - Activate the virtual environment:
     - On Windows: `venv\Scripts\activate`
     - On Unix or MacOS: `source venv/bin/activate`

   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Run the Backend:**
   - Navigate to /app and run the backend using uvicorn:
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 8000 --reload
     ```

   **Note:** Adjust the port as needed, ensuring it matches the frontend configuration.