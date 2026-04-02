import { Link } from '@inertiajs/react';
import {
    BarChart3,
    Bot,
    BookOpen,
    ClipboardList,
    FileText,
    FilePlus2,
    LifeBuoy,
    LayoutGrid,
    PlugZap,
    UserSquare2,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Operations Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Order List',
        href: '/orders',
        icon: ClipboardList,
    },
    {
        title: 'Place Order',
        href: '/orders/place',
        icon: FilePlus2,
    },
    {
        title: 'Quotes',
        href: '/quotes',
        icon: FileText,
    },
    {
        title: 'Clients',
        href: '/clients',
        icon: Users,
    },
    {
        title: 'Employees',
        href: '/employees',
        icon: UserSquare2,
    },
    {
        title: 'Chatbot Configuration',
        href: '/chatbot-configuration',
        icon: Bot,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Integrations',
        href: '/integrations',
        icon: PlugZap,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'MVP Plan',
        href: '/dashboard#roadmap',
        icon: BookOpen,
    },
    {
        title: 'Support',
        href: 'mailto:support@firstchoicesurveying.com',
        icon: LifeBuoy,
    },
];

export function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r border-sidebar-border/90"
        >
            <SidebarHeader className="border-b border-sidebar-border/80 bg-[linear-gradient(165deg,#ffffff_0%,#f7fbf8_48%,#fff7f0_100%)]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
