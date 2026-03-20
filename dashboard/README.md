# Dashboard - Account Settings Component

This is a React-based dashboard built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components. It includes a beautiful glass-morphism account settings card component.

## Project Structure

```
dashboard/
├── app/                           # Next.js app directory
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page with component demo
│   └── globals.css               # Global styles with CSS variables
├── components/
│   └── ui/                       # shadcn UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── label.tsx
│       ├── switch.tsx
│       └── glass-account-settings-card.tsx  # Main component
├── lib/
│   └── utils.ts                  # Utility functions (cn)
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
└── next.config.js                # Next.js configuration
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the dashboard directory:
```bash
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

**Development mode:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Build for production:**
```bash
npm run build
npm start
```

## Features

- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **shadcn/ui** - Beautiful, customizable React components
- ✅ **Framer Motion** - Smooth animations
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode Ready** - CSS variables support dark theme

## Components Included

### Glass Account Settings Card
A beautiful account settings component featuring:
- Account information management
- Security settings (email, 2FA)
- Notification preferences
- Subscription management
- Billing section
- Smooth animations with Framer Motion
- Glass-morphism design with backdrop blur

## Customization

### CSS Variables

Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: 262 80% 50%;        /* Primary brand color */
  --background: 0 0% 100%;       /* Background color */
  --foreground: 0 0% 3.6%;       /* Text color */
  /* ... more variables ... */
}
```

### Component Props

The `GlassAccountSettingsCard` component is a client component that manages its own state:

```tsx
import { GlassAccountSettingsCard } from "@/components/ui/glass-account-settings-card"

export default function Dashboard() {
  return <GlassAccountSettingsCard />
}
```

## Dependencies

- **next** - React framework
- **react** & **react-dom** - UI library
- **typescript** - Type safety
- **tailwindcss** - CSS framework
- **framer-motion** - Animation library
- **lucide-react** - Icon library
- **@radix-ui/* ** - Accessible component primitives
- **class-variance-authority** - Type-safe class variants
- **clsx** & **tailwind-merge** - Utility helpers

## Best Practices

1. **Component Structure** - Components are organized in `/components/ui` following shadcn conventions
2. **Type Safety** - All components are written in TypeScript
3. **CSS Variables** - Theme colors use CSS variables for easy customization
4. **Responsive** - Mobile-first design with Tailwind breakpoints
5. **Accessibility** - Built with ARIA labels and semantic HTML

## Next Steps

- Customize colors and theme in `app/globals.css`
- Add more UI components from shadcn documentation
- Connect to backend APIs
- Implement state management if needed
- Add authentication

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## License

ISC
