# Currency Converter

A simple and responsive currency converter built with **React** and **Vite**. The application fetches exchange rates from the Navasan API and allows users to convert amounts between supported currencies.

## Features

- Convert amounts between supported currencies
- Select source and target currencies
- Swap currencies with a single click
- Fetch exchange rates from an external API
- Display the converted amount
- Manage input and conversion results using React state

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/yegane/currency-converter.git
```

### 2. Navigate to the project directory

```bash
cd currency-converter
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your API key:

```env
VITE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your Navasan API key.

### 5. Start the development server

```bash
npm run dev
```

## API

Exchange rate data is provided by the [Navasan API](https://www.navasan.tech/).

## Author

**Yegane Almasi**

GitHub: [@yegane](https://github.com/yegane)
