export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      // Only run on the client side
      if (typeof window !== 'undefined') {
        setIsLoading(true);
        
        try {
          const storedUser = localStorage.getItem('essayhuzz_user');
          
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error('Auth check error:', error);
          // Clear any invalid data
          if (typeof window !== 'undefined') {
            localStorage.removeItem('essayhuzz_user');
          }
        } finally {
          setIsLoading(false);
        }
      }
    }, []);
  
    const login = async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      
      try {
        // Simulate successful login with mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (email === 'demo@example.com' && password === 'password') {
          const userData: User = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: '/avatar-placeholder.png'
          };
          
          setUser(userData);
          if (typeof window !== 'undefined') {
            localStorage.setItem('essayhuzz_user', JSON.stringify(userData));
          }
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    // Update the signup and logout functions similarly
    const signup = async (userData: SignupData): Promise<boolean> => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: '2',
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          avatar: '/avatar-placeholder.png'
        };
        
        setUser(newUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('essayhuzz_user', JSON.stringify(newUser));
        }
        return true;
      } catch (error) {
        console.error('Signup error:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    const logout = async (): Promise<void> => {
      try {
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('essayhuzz_user');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        login, 
        signup, 
        logout 
      }}>
        {children}
      </AuthContext.Provider>
    );
  }