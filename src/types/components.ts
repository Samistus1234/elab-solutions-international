/**
 * Component Type Definitions for ELAB Solutions International
 * 
 * This file contains all component-specific type definitions including
 * props interfaces, component states, and UI-related types.
 */

import type { ReactNode, ComponentType, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import type { User, Application, Service, JobOpportunity, Course } from './business';
import type { ID, Locale, Theme } from './index';

// ============================================================================
// COMMON COMPONENT TYPES
// ============================================================================

export interface BaseComponentProps {
  readonly className?: string;
  readonly id?: string;
  readonly children?: ReactNode;
  readonly testId?: string;
}

export interface PropsWithChildren<T = {}> extends BaseComponentProps {
  readonly children: ReactNode;
}

export type ComponentWithChildren<T = {}> = ComponentType<PropsWithChildren<T>>;

// ============================================================================
// LAYOUT COMPONENT TYPES
// ============================================================================

export interface HeaderProps extends BaseComponentProps {
  readonly locale: Locale;
  readonly user?: User;
  readonly onLanguageChange: (locale: Locale) => void;
  readonly onThemeChange: (theme: Theme) => void;
  readonly showUserMenu?: boolean;
}

export interface FooterProps extends BaseComponentProps {
  readonly locale: Locale;
  readonly showNewsletter?: boolean;
  readonly showSocialLinks?: boolean;
}

export interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly icon?: ComponentType<{ className?: string }>;
  readonly children?: readonly NavigationItem[];
  readonly isExternal?: boolean;
  readonly requiresAuth?: boolean;
  readonly roles?: readonly string[];
}

export interface SidebarProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly navigation: readonly NavigationItem[];
  readonly user?: User;
}

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
  readonly isActive?: boolean;
}

export interface BreadcrumbProps extends BaseComponentProps {
  readonly items: readonly BreadcrumbItem[];
  readonly separator?: ReactNode;
}

// ============================================================================
// FORM COMPONENT TYPES
// ============================================================================

export interface FormFieldProps extends BaseComponentProps {
  readonly name: string;
  readonly label: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly helpText?: string;
}

export interface InputProps extends FormFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'className' | 'id' | 'children' | 'disabled' | 'placeholder' | 'required' | 'onChange'> {
  readonly type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onBlur?: () => void;
  readonly onFocus?: () => void;
  readonly leftIcon?: ComponentType<{ className?: string }>;
  readonly rightIcon?: ComponentType<{ className?: string }>;
}

export interface TextareaProps extends FormFieldProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly rows?: number;
  readonly maxLength?: number;
  readonly resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly icon?: ComponentType<{ className?: string }>;
}

export interface SelectProps extends FormFieldProps {
  readonly options: readonly SelectOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly searchable?: boolean;
  readonly multiple?: boolean;
  readonly clearable?: boolean;
}

export interface CheckboxProps extends FormFieldProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly indeterminate?: boolean;
}

export interface RadioProps extends FormFieldProps {
  readonly value: string;
  readonly checked: boolean;
  readonly onChange: (value: string) => void;
}

export interface RadioGroupProps extends FormFieldProps {
  readonly options: readonly SelectOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly orientation?: 'horizontal' | 'vertical';
}

export interface FileUploadProps extends FormFieldProps {
  readonly accept?: string;
  readonly multiple?: boolean;
  readonly maxSize?: number; // in bytes
  readonly maxFiles?: number;
  readonly onUpload: (files: readonly File[]) => void;
  readonly onRemove?: (fileId: string) => void;
  readonly uploadedFiles?: readonly {
    readonly id: string;
    readonly name: string;
    readonly url: string;
    readonly size: number;
  }[];
}

// ============================================================================
// BUTTON COMPONENT TYPES
// ============================================================================

export interface ButtonProps extends BaseComponentProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'id' | 'children' | 'disabled' | 'placeholder' | 'required' | 'onChange'> {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly leftIcon?: ComponentType<{ className?: string }>;
  readonly rightIcon?: ComponentType<{ className?: string }>;
  readonly fullWidth?: boolean;
}

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  readonly icon: ComponentType<{ className?: string }>;
  readonly 'aria-label': string;
}

export interface LinkButtonProps extends Omit<ButtonProps, 'type'> {
  readonly href: string;
  readonly external?: boolean;
  readonly download?: boolean;
}

// ============================================================================
// MODAL AND DIALOG TYPES
// ============================================================================

export interface ModalProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly closeOnOverlayClick?: boolean;
  readonly closeOnEscape?: boolean;
  readonly showCloseButton?: boolean;
}

export interface DialogProps extends ModalProps {
  readonly type?: 'info' | 'warning' | 'error' | 'success' | 'confirm';
  readonly message: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly onConfirm?: () => void;
  readonly onCancel?: () => void;
}

export interface DrawerProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly position?: 'left' | 'right' | 'top' | 'bottom';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly overlay?: boolean;
}

// ============================================================================
// DATA DISPLAY COMPONENT TYPES
// ============================================================================

export interface TableColumn<T> {
  readonly key: keyof T | string;
  readonly label: string;
  readonly sortable?: boolean;
  readonly width?: string;
  readonly align?: 'left' | 'center' | 'right';
  readonly render?: (value: unknown, row: T, index: number) => ReactNode;
}

export interface TableProps<T> extends BaseComponentProps {
  readonly data: readonly T[];
  readonly columns: readonly TableColumn<T>[];
  readonly loading?: boolean;
  readonly emptyMessage?: string;
  readonly onRowClick?: (row: T, index: number) => void;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
  readonly onSort?: (column: string, order: 'asc' | 'desc') => void;
  readonly pagination?: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly onPageChange: (page: number) => void;
    readonly onLimitChange: (limit: number) => void;
  };
}

export interface CardProps extends BaseComponentProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly actions?: ReactNode;
  readonly padding?: 'none' | 'sm' | 'md' | 'lg';
  readonly shadow?: 'none' | 'sm' | 'md' | 'lg';
  readonly border?: boolean;
  readonly hover?: boolean;
}

export interface StatsCardProps extends BaseComponentProps {
  readonly title: string;
  readonly value: string | number;
  readonly change?: {
    readonly value: number;
    readonly type: 'increase' | 'decrease';
    readonly period: string;
  };
  readonly icon?: ComponentType<{ className?: string }>;
  readonly color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
}

// ============================================================================
// FEEDBACK COMPONENT TYPES
// ============================================================================

export interface AlertProps extends BaseComponentProps {
  readonly type: 'info' | 'success' | 'warning' | 'error';
  readonly title?: string;
  readonly message: string;
  readonly dismissible?: boolean;
  readonly onDismiss?: () => void;
  readonly actions?: ReactNode;
}

export interface ToastProps extends BaseComponentProps {
  readonly type: 'info' | 'success' | 'warning' | 'error';
  readonly title?: string;
  readonly message: string;
  readonly duration?: number;
  readonly position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  readonly onClose?: () => void;
}

export interface LoadingSpinnerProps extends BaseComponentProps {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly color?: string;
  readonly text?: string;
}

export interface ProgressBarProps extends BaseComponentProps {
  readonly value: number;
  readonly max?: number;
  readonly label?: string;
  readonly showPercentage?: boolean;
  readonly color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  readonly size?: 'sm' | 'md' | 'lg';
}

export interface SkeletonProps extends BaseComponentProps {
  readonly width?: string | number;
  readonly height?: string | number;
  readonly variant?: 'text' | 'rectangular' | 'circular';
  readonly animation?: 'pulse' | 'wave' | 'none';
}

// ============================================================================
// NAVIGATION COMPONENT TYPES
// ============================================================================

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly content: ReactNode;
  readonly disabled?: boolean;
  readonly icon?: ComponentType<{ className?: string }>;
}

export interface TabsProps extends BaseComponentProps {
  readonly items: readonly TabItem[];
  readonly activeTab: string;
  readonly onTabChange: (tabId: string) => void;
  readonly variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded';
  readonly orientation?: 'horizontal' | 'vertical';
}

export interface PaginationProps extends BaseComponentProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly showFirstLast?: boolean;
  readonly showPrevNext?: boolean;
  readonly maxVisiblePages?: number;
  readonly size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// BUSINESS-SPECIFIC COMPONENT TYPES
// ============================================================================

export interface ApplicationCardProps extends BaseComponentProps {
  readonly application: Application;
  readonly onView?: (application: Application) => void;
  readonly onEdit?: (application: Application) => void;
  readonly onDelete?: (application: Application) => void;
  readonly showActions?: boolean;
}

export interface ServiceCardProps extends BaseComponentProps {
  readonly service: Service;
  readonly onSelect?: (service: Service) => void;
  readonly onLearnMore?: (service: Service) => void;
  readonly showPricing?: boolean;
  readonly featured?: boolean;
}

export interface JobCardProps extends BaseComponentProps {
  readonly job: JobOpportunity;
  readonly onApply?: (job: JobOpportunity) => void;
  readonly onSave?: (job: JobOpportunity) => void;
  readonly onShare?: (job: JobOpportunity) => void;
  readonly showSalary?: boolean;
  readonly compact?: boolean;
}

export interface CourseCardProps extends BaseComponentProps {
  readonly course: Course;
  readonly onEnroll?: (course: Course) => void;
  readonly onPreview?: (course: Course) => void;
  readonly showProgress?: boolean;
  readonly progress?: number;
}

export interface UserProfileProps extends BaseComponentProps {
  readonly user: User;
  readonly editable?: boolean;
  readonly onEdit?: (user: User) => void;
  readonly showContactInfo?: boolean;
  readonly showPreferences?: boolean;
}

export interface DocumentViewerProps extends BaseComponentProps {
  readonly documentUrl: string;
  readonly documentType: string;
  readonly title?: string;
  readonly downloadable?: boolean;
  readonly onDownload?: () => void;
  readonly onClose?: () => void;
}

// ============================================================================
// SEARCH AND FILTER COMPONENT TYPES
// ============================================================================

export interface SearchBarProps extends BaseComponentProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSearch?: (value: string) => void;
  readonly placeholder?: string;
  readonly suggestions?: readonly string[];
  readonly loading?: boolean;
  readonly debounceMs?: number;
}

export interface FilterOption {
  readonly key: string;
  readonly label: string;
  readonly type: 'select' | 'multiselect' | 'range' | 'date' | 'boolean';
  readonly options?: readonly SelectOption[];
  readonly min?: number;
  readonly max?: number;
}

export interface FilterPanelProps extends BaseComponentProps {
  readonly filters: readonly FilterOption[];
  readonly values: Record<string, unknown>;
  readonly onChange: (key: string, value: unknown) => void;
  readonly onReset?: () => void;
  readonly collapsible?: boolean;
  readonly defaultExpanded?: boolean;
}

// ============================================================================
// CHART AND VISUALIZATION COMPONENT TYPES
// ============================================================================

export interface ChartDataPoint {
  readonly label: string;
  readonly value: number;
  readonly color?: string;
}

export interface LineChartProps extends BaseComponentProps {
  readonly data: readonly {
    readonly label: string;
    readonly data: readonly ChartDataPoint[];
  }[];
  readonly xAxisLabel?: string;
  readonly yAxisLabel?: string;
  readonly showGrid?: boolean;
  readonly showLegend?: boolean;
  readonly height?: number;
}

export interface BarChartProps extends BaseComponentProps {
  readonly data: readonly ChartDataPoint[];
  readonly orientation?: 'horizontal' | 'vertical';
  readonly showValues?: boolean;
  readonly showGrid?: boolean;
  readonly height?: number;
}

export interface PieChartProps extends BaseComponentProps {
  readonly data: readonly ChartDataPoint[];
  readonly showLabels?: boolean;
  readonly showPercentages?: boolean;
  readonly donut?: boolean;
  readonly size?: number;
}
