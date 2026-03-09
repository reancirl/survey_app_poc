import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const href = toUrl(item.href);
                        const isExternal = /^https?:\/\//.test(href);

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className="text-[#5a6e60] hover:bg-[#fff3e8] hover:text-[#8d4d1c] dark:text-neutral-300 dark:hover:text-neutral-100"
                                >
                                    <a
                                        href={href}
                                        target={isExternal ? '_blank' : undefined}
                                        rel={
                                            isExternal
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                    >
                                        {item.icon && (
                                            <item.icon className="h-5 w-5" />
                                        )}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
