# Ian Managuelod Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd fide-ian-code-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `public/` - Static assets
- `lib/` - Utility functions and shared logic

## Features

- Modern, responsive design
- Dark mode support
- Smooth animations and transitions
- Interactive UI components
- Portfolio showcase
- Contact form
- Skills visualization
- Work experience timeline

## Dependencies

All dependencies are listed in `package.json`. Key dependencies include:

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-slot": "1.0.2",
    "class-variance-authority": "0.7.0",
    "clsx": "2.0.0",
    "framer-motion": "^12.4.3",
    "lucide-react": "^0.475.0",
    "next": "14.0.4",
    "next-themes": "0.2.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwind-merge": "2.1.0"
  },
  "devDependencies": {
    "@types/node": "20.10.4",
    "@types/react": "18.2.42",
    "@types/react-dom": "18.2.17",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.32",
    "tailwindcss": "3.3.6",
    "typescript": "5.3.3"
  }
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
