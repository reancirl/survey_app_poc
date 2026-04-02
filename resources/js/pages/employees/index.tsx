import { Head } from '@inertiajs/react';
import { Mail, MessageSquare, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type EmployeeItem = {
    id: number;
    name: string;
    role: string;
    currentTask: string;
    online: boolean;
    email: string;
    phone: string;
    lastActive: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

const employeeData: EmployeeItem[] = [
    {
        id: 1,
        name: 'Mark Ponce',
        role: 'Internal Coordinator',
        currentTask: 'Reviewing Due Today / Overdue orders',
        online: true,
        email: 'mark.ponce@firstchoicesurveying.com',
        phone: '+1 (813) 555-2101',
        lastActive: 'Just now',
    },
    {
        id: 2,
        name: 'Alyssa Wood',
        role: 'Research Lead',
        currentTask: 'Quote research package for Sarasota intake',
        online: true,
        email: 'alyssa.wood@firstchoicesurveying.com',
        phone: '+1 (813) 555-2102',
        lastActive: '2 minutes ago',
    },
    {
        id: 3,
        name: 'Carlos Guarte',
        role: 'CSR',
        currentTask: 'Client follow-up for open quotes',
        online: false,
        email: 'carlos.guarte@firstchoicesurveying.com',
        phone: '+1 (813) 555-2103',
        lastActive: '28 minutes ago',
    },
    {
        id: 4,
        name: 'Natalie Coldiron',
        role: 'Field Scheduler',
        currentTask: 'Crew assignment for tomorrow field due list',
        online: true,
        email: 'natalie.coldiron@firstchoicesurveying.com',
        phone: '+1 (813) 555-2104',
        lastActive: '5 minutes ago',
    },
    {
        id: 5,
        name: 'Sue Lee',
        role: 'Client Support',
        currentTask: 'Updating client records and parent-client mapping',
        online: false,
        email: 'sue.lee@firstchoicesurveying.com',
        phone: '+1 (813) 555-2105',
        lastActive: '1 hour ago',
    },
    {
        id: 6,
        name: 'Bill Hertz',
        role: 'Operations Analyst',
        currentTask: 'Preparing weekly operational reports bundle',
        online: true,
        email: 'bill.hertz@firstchoicesurveying.com',
        phone: '+1 (813) 555-2106',
        lastActive: 'Just now',
    },
];

export default function EmployeesIndex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [onlineFilter, setOnlineFilter] = useState<'all' | 'online' | 'offline'>('all');

    const visibleEmployees = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return employeeData.filter((employee) => {
            const matchesSearch =
                query.length === 0 ||
                [employee.name, employee.role, employee.currentTask, employee.email]
                    .join(' ')
                    .toLowerCase()
                    .includes(query);

            const matchesOnlineFilter =
                onlineFilter === 'all' ||
                (onlineFilter === 'online' && employee.online) ||
                (onlineFilter === 'offline' && !employee.online);

            return matchesSearch && matchesOnlineFilter;
        });
    }, [onlineFilter, searchTerm]);

    const onlineCount = useMemo(
        () => employeeData.filter((employee) => employee.online).length,
        [],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                    Team Operations
                                </p>
                                <h1 className="text-xl font-semibold text-[#1f2e22]">
                                    Employees
                                </h1>
                                <p className="mt-1 text-sm text-[#607669]">
                                    Current employee tasks, online status, and quick contact actions.
                                </p>
                            </div>
                            <div className="ml-auto rounded-lg border border-[#dce8df] bg-[#f8fcf9] px-3 py-2 text-sm">
                                <p className="font-semibold text-[#1f2e22]">
                                    {onlineCount} / {employeeData.length} online
                                </p>
                                <p className="text-xs text-[#5f7768]">
                                    Live workforce availability
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                            <label className="relative block min-w-[220px] sm:min-w-[300px]">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5f7768]" />
                                <Input
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search employee, role, or current task"
                                    className="h-10 w-full rounded-md border border-[#cad7ce] bg-white pl-9 pr-3 text-sm text-[#1f2e22] placeholder:text-[#708477] focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                />
                            </label>

                            <select
                                value={onlineFilter}
                                onChange={(event) =>
                                    setOnlineFilter(
                                        event.target.value as
                                            | 'all'
                                            | 'online'
                                            | 'offline',
                                    )
                                }
                                className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                            >
                                <option value="all">All Statuses</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="overflow-hidden rounded-xl border border-[#dce8df]">
                            <div className="border-b border-[#e2ebe4] bg-[#f7fbf8] px-4 py-2 text-sm font-semibold text-[#2b4b3a]">
                                Employee Task Board ({visibleEmployees.length})
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-[1150px] text-sm">
                                    <thead className="bg-[#edf3ef] text-left text-xs font-semibold tracking-wide text-[#2f4c3d] uppercase">
                                        <tr>
                                            <th className="px-3 py-2">Employee</th>
                                            <th className="px-3 py-2">Role</th>
                                            <th className="px-3 py-2">Current Task</th>
                                            <th className="px-3 py-2">Status</th>
                                            <th className="px-3 py-2">Last Active</th>
                                            <th className="px-3 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#25382d]">
                                        {visibleEmployees.map((employee, index) => (
                                            <tr
                                                key={employee.id}
                                                className={cn(
                                                    'border-t border-[#e2ebe4]',
                                                    index % 2 === 0
                                                        ? 'bg-[#f8fbf9]'
                                                        : 'bg-white',
                                                )}
                                            >
                                                <td className="px-3 py-2">
                                                    <p className="font-semibold text-[#1f2e22]">
                                                        {employee.name}
                                                    </p>
                                                    <p className="text-xs text-[#5f7768]">
                                                        {employee.email}
                                                    </p>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {employee.role}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {employee.currentTask}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={cn(
                                                            'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
                                                            employee.online
                                                                ? 'bg-[#e8f4ea] text-[#186627]'
                                                                : 'bg-[#fdeeee] text-[#a4372a]',
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                'size-2 rounded-full',
                                                                employee.online
                                                                    ? 'bg-[#186627]'
                                                                    : 'bg-[#c44c3c]',
                                                            )}
                                                        />
                                                        {employee.online
                                                            ? 'Online'
                                                            : 'Offline'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {employee.lastActive}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 border-[#cad7ce] text-[#355744] hover:bg-[#f5fbf7]"
                                                        >
                                                            <Mail className="size-3.5" />
                                                            Email
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="h-8 bg-[#186627] text-white hover:bg-[#145521]"
                                                        >
                                                            <MessageSquare className="size-3.5" />
                                                            SMS
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {visibleEmployees.length === 0 && (
                                    <div className="px-4 py-10 text-center text-sm text-[#56705e]">
                                        No employees found for this filter.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
