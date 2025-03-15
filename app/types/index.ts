// User types
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface UserProfile extends User {
    bio?: string;
    institution?: string;
    academicLevel?: 'high_school' | 'undergraduate' | 'graduate' | 'doctoral' | 'professional';
    joinDate?: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    agreeToTerms?: boolean;
  }
  
  // PDF and Document types
  export interface PDFDocument {
    id?: string;
    name: string;
    file?: File;
    url: string;
    size: number;
    uploadDate?: string;
    userId?: string;
  }
  
  export type AnalysisType = 'summary' | 'keyPoints' | 'criticalAnalysis';
  
  export interface AnalysisResult {
    id?: string;
    documentId: string;
    type: AnalysisType;
    content: string;
    createdAt?: string;
  }
  
  // Essay types
  export interface Essay {
    id: string;
    title: string;
    author: string;
    authorId?: string;
    content?: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: number;
    likes: number;
    tags: string[];
    published?: boolean;
  }
  
  // API Response types
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status?: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    pageCount: number;
    currentPage: number;
  }
  
  // Form and UI types
  export interface SelectOption {
    value: string;
    label: string;
  }
  
  export interface FormError {
    field: string;
    message: string;
  }
  
  // Theme types
  export type ThemeMode = 'light' | 'dark' | 'system';
  
  // Event types for custom components
  export interface CustomChangeEvent<T = string> {
    target: {
      name: string;
      value: T;
    };
  }