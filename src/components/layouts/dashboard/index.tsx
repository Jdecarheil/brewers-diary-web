import { Home, PanelLeft, Folder, Users, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== 'loading') {
    return null;
  }

  return <p></p>;
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const logout = useLogout();
  // const { checkAccess } = useAuthorization();
  // const navigate = useNavigate();
  // const navigation = [
  //   { name: 'Dashboard', to: paths.app.dashboard.getHref(), icon: Home },
  //   { name: 'Discussions', to: paths.app.discussions.getHref(), icon: Folder },
  //   checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
  //     name: 'Users',
  //     to: paths.app.users.getHref(),
  //     icon: Users,
  //   },
  // ].filter(Boolean) as SideNavigationItem[];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <div className="flex h-16 shrink-0 items-center px-4"></div>
            {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.name !== 'Discussions'}
              className={({ isActive }) =>
                cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                  isActive && 'bg-gray-900 text-white'
                )
              }
            >
              <item.icon
                className={cn('text-gray-400 group-hover:text-gray-300', 'mr-4 size-6 shrink-0')}
                aria-hidden="true"
              />
              {item.name}
            </NavLink> 
           ))} 
        </nav>
      </aside> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <Progress />
          {/* <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent side="left" className="bg-black pt-10 text-white sm:max-w-60">
              <nav className="grid gap-6 text-lg font-medium">
                <div className="flex h-16 shrink-0 items-center px-4"></div>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      cn(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                        isActive && 'bg-gray-900 text-white'
                      )
                    }
                  >
                    <item.icon
                      className={cn(
                        'text-gray-400 group-hover:text-gray-300',
                        'mr-4 size-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </DrawerContent>
          </Drawer> */}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
