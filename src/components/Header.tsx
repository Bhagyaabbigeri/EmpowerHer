import { Search as SearchIcon, User } from 'lucide-react';
import { Search } from './header/Search';
import { Notifications } from './header/Notifications';
import { Menu } from './header/Menu';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = "SafeHer" }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-20 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-red-500 flex items-center justify-center shadow-md">
              <span className="text-white font-display font-bold text-2xl">👩‍💻</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground text-xl leading-tight">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground -mt-0.5">
                Empowering Women
              </p>
            </div>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Search />
          <Notifications />
          {user ? (
            <div className="relative group">
              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <User className="h-5 w-5 text-gray-700" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{user.name || user.email}</p>
                  <p className="text-xs text-gray-500">View profile</p>
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : null}
          <Menu />
        </div>
      </div>
    </header>
  );
};
