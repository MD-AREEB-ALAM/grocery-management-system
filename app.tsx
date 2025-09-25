import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Plus, Package, ShoppingCart, Users, BarChart3, 
  Edit, Trash2, AlertTriangle, Check, X, Home, Minus, 
  Download, Upload, Eye, EyeOff, LogOut, Receipt 
} from 'lucide-react';

// UI Components
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm touch-manipulation ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

const Button = ({ children, onClick, variant = "default", size = "default", disabled = false, className = "" }: {
  children: React.ReactNode,
  onClick?: () => void,
  variant?: string,
  size?: string,
  disabled?: boolean,
  className?: string
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background touch-manipulation select-none";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
    destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    ghost: "hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
    outline: "border border-gray-300 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
  };
  const sizeClasses = {
    default: "h-12 py-3 px-6 text-base min-w-12",
    sm: "h-10 px-4 rounded-md text-sm min-w-10",
    lg: "h-14 px-8 rounded-md text-lg min-w-14",
    icon: "h-12 w-12 p-0"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Input = ({ id, type = "text", placeholder, value, onChange, onKeyDown, className = "" }: {
  id?: string,
  type?: string,
  placeholder?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  className?: string
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    className={`flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation ${className}`}
  />
);

const Label = ({ htmlFor, children, className = "" }: { htmlFor?: string, children: React.ReactNode, className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

const Alert = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative w-full rounded-lg border p-4 ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm [&_p]:leading-relaxed">{children}</div>
);

// Interfaces
interface Product {
  id: string;
  name: string;
  barcode: string;
  category: string;
  supplierId: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  minStockLevel: number;
  description: string;
}

interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Sale {
  id: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: string;
  date: string;
  receiptNumber: string;
}

// Login Form Component
const LoginForm = ({ onLogin, isLoading, notification }: {
  onLogin: (email: string, password: string) => void,
  isLoading: boolean,
  notification: { type: 'success' | 'error' | 'warning', message: string } | null
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    onLogin(email, password);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-blue-600">GroceryShop</CardTitle>
          <CardDescription className="text-base">Mobile Management System</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-base">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full h-14 text-lg" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login to Continue'}
          </Button>
          <div className="text-sm text-gray-600 text-center bg-gray-100 p-4 rounded-lg">
            <p className="font-medium mb-2">Demo credentials:</p>
            <p>Email: admin@grocery.com</p>
            <p>Password: admin123</p>
          </div>
        </CardContent>
      </Card>
      
      {notification && (
        <div className="fixed top-4 right-4 left-4 z-50">
          <Alert className={`${notification.type === 'error' ? 'border-red-500 bg-red-50' : notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}>
            <AlertDescription className="text-center font-medium">{notification.message}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning', message: string } | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'pos'>('dashboard');
  
  // Sample data
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Apples',
      barcode: '1234567890123',
      category: 'Fruits',
      supplierId: '1',
      purchasePrice: 2.00,
      sellingPrice: 3.50,
      stock: 50,
      minStockLevel: 10,
      description: 'Fresh organic red apples'
    },
    {
      id: '2',
      name: 'Whole Milk',
      barcode: '0987654321098',
      category:
