import { Head } from '@inertiajs/react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

type OrderViewKey =
    | 'new_orders'
    | 'open_orders'
    | 'open_orders_minus_quotes'
    | 'quotes_only'
    | 'due_today_overdue'
    | 'place_today'
    | 'completed'
    | 'cancelled'
    | 'snail_mail_list';

type OrderItem = {
    id: number;
    orderNo: string;
    client: string;
    jobStatus: 'New' | 'Open' | 'Completed' | 'Cancelled';
    address: string;
    county: string;
    surveyType: string;
    receivedAt: string;
    dueDate: string;
    internalDueDate: string;
    fieldDueDate: string;
    spoke: string;
    info: string;
    hasQuote: boolean;
    deliveryMethod: 'Email' | 'Snail Mail';
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order List',
        href: '/orders',
    },
];

const orderViews: { key: OrderViewKey; label: string }[] = [
    { key: 'new_orders', label: 'New Orders' },
    { key: 'open_orders', label: 'Open Orders' },
    { key: 'open_orders_minus_quotes', label: 'Open Orders Minus Quotes' },
    { key: 'quotes_only', label: 'Quotes Only' },
    { key: 'due_today_overdue', label: 'Due Today / Overdue' },
    { key: 'place_today', label: 'Place Today' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'snail_mail_list', label: 'Snail Mail List' },
];

const orderData: OrderItem[] = [
    {
        id: 1,
        orderNo: '107849',
        client: 'MCM Associates, PL',
        jobStatus: 'New',
        address: '213 18TH ST. NW, Bradenton, Florida 34205',
        county: 'MANATEE',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T08:41:00',
        dueDate: '2026-03-19',
        internalDueDate: '2026-03-18',
        fieldDueDate: '2026-03-18',
        spoke: 'FCS, Inc.',
        info: 'Private: contact / need WOF and payment link',
        hasQuote: true,
        deliveryMethod: 'Email',
    },
    {
        id: 2,
        orderNo: '107850',
        client: 'National Title of Florida, Inc.',
        jobStatus: 'New',
        address: "3843 Briley Loop, Land O' Lakes, Florida 34638",
        county: 'PASCO',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T13:08:00',
        dueDate: '2026-03-19',
        internalDueDate: '2026-03-18',
        fieldDueDate: '2026-03-18',
        spoke: 'FCS, Inc.',
        info: 'Private: contact required',
        hasQuote: false,
        deliveryMethod: 'Email',
    },
    {
        id: 3,
        orderNo: '107851',
        client: 'Infinity Title Insurance Agency, LLC',
        jobStatus: 'New',
        address: '13329 Northeast 38TH Avenue, Anthony, Florida 32617',
        county: 'MARION',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T23:11:00',
        dueDate: '2026-03-19',
        internalDueDate: '2026-03-18',
        fieldDueDate: '2026-03-18',
        spoke: 'FCS, Inc.',
        info: 'QUALIA order / no contact',
        hasQuote: false,
        deliveryMethod: 'Snail Mail',
    },
    {
        id: 4,
        orderNo: '106141-01',
        client: 'Bill Hertz',
        jobStatus: 'New',
        address: '4873 Ancient Marble Drive, Sarasota, Florida 34240',
        county: 'SARASOTA',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T13:24:00',
        dueDate: '2026-03-17',
        internalDueDate: '2026-03-16',
        fieldDueDate: '2026-03-16',
        spoke: 'FCS, Inc.',
        info: 'Need WOF and payment link',
        hasQuote: true,
        deliveryMethod: 'Email',
    },
    {
        id: 5,
        orderNo: '107856',
        client: 'Sue Lee',
        jobStatus: 'Open',
        address: '20022 Nob Oak Avenue, Tampa, Florida 33647',
        county: 'HILLSBOROUGH',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T14:31:00',
        dueDate: '2026-03-19',
        internalDueDate: '2026-03-18',
        fieldDueDate: '2026-03-18',
        spoke: 'FCS, Inc.',
        info: 'Private: no contact',
        hasQuote: false,
        deliveryMethod: 'Email',
    },
    {
        id: 6,
        orderNo: '107857',
        client: 'The Sur-Mite Company',
        jobStatus: 'Open',
        address: '6781 West Grant Street, Homosassa, Florida 34448',
        county: 'CITRUS',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T14:56:00',
        dueDate: '2026-03-18',
        internalDueDate: '2026-03-17',
        fieldDueDate: '2026-03-17',
        spoke: 'FCS, Inc.',
        info: 'Private: no contact',
        hasQuote: false,
        deliveryMethod: 'Snail Mail',
    },
    {
        id: 7,
        orderNo: '107858',
        client: 'Natalie G. Coldiron, PLLC',
        jobStatus: 'Open',
        address: '1374 20TH Street, Sarasota, Florida 34234',
        county: 'SARASOTA',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-12T15:01:00',
        dueDate: '2026-03-20',
        internalDueDate: '2026-03-19',
        fieldDueDate: '2026-03-19',
        spoke: 'FCS, Inc.',
        info: 'QUALIA order / contact',
        hasQuote: true,
        deliveryMethod: 'Email',
    },
    {
        id: 8,
        orderNo: '107861',
        client: 'Harbor Point Holdings',
        jobStatus: 'Open',
        address: '930 Bay Plaza, Clearwater, Florida 33756',
        county: 'PINELLAS',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-15T09:45:00',
        dueDate: '2026-03-16',
        internalDueDate: '2026-03-16',
        fieldDueDate: '2026-03-16',
        spoke: 'FCS, Inc.',
        info: 'Field team standby',
        hasQuote: true,
        deliveryMethod: 'Email',
    },
    {
        id: 9,
        orderNo: '107862',
        client: 'Parkside Lending',
        jobStatus: 'Completed',
        address: '12 Oak Valley Circle, Lakeland, Florida 33813',
        county: 'POLK',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-10T11:12:00',
        dueDate: '2026-03-14',
        internalDueDate: '2026-03-13',
        fieldDueDate: '2026-03-13',
        spoke: 'FCS, Inc.',
        info: 'Completed and sent to client',
        hasQuote: true,
        deliveryMethod: 'Email',
    },
    {
        id: 10,
        orderNo: '107863',
        client: 'Maple Ridge Properties',
        jobStatus: 'Cancelled',
        address: '74 Palmetto Way, St. Petersburg, Florida 33702',
        county: 'PINELLAS',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-11T10:05:00',
        dueDate: '2026-03-18',
        internalDueDate: '2026-03-17',
        fieldDueDate: '2026-03-17',
        spoke: 'FCS, Inc.',
        info: 'Cancelled by client',
        hasQuote: false,
        deliveryMethod: 'Email',
    },
    {
        id: 11,
        orderNo: '107864',
        client: 'Suncoast Home Loans',
        jobStatus: 'Open',
        address: '101 Harbor Drive, Venice, Florida 34285',
        county: 'SARASOTA',
        surveyType: 'Boundary Survey',
        receivedAt: '2026-03-16T08:30:00',
        dueDate: '2026-03-18',
        internalDueDate: '2026-03-17',
        fieldDueDate: '2026-03-17',
        spoke: 'FCS, Inc.',
        info: 'Placed today / rush handling',
        hasQuote: true,
        deliveryMethod: 'Email',
    },
];

function startOfDay(value: Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export default function OrdersIndex() {
    const [activeOrderView, setActiveOrderView] =
        useState<OrderViewKey>('open_orders');
    const [searchTerm, setSearchTerm] = useState('');
    const [spokeFilter, setSpokeFilter] = useState('all');

    const dateFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
            }),
        [],
    );
    const dateTimeFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
            }),
        [],
    );

    const spokes = useMemo(
        () => ['all', ...new Set(orderData.map((order) => order.spoke))],
        [],
    );

    const filteredByView = useMemo(() => {
        const today = startOfDay(new Date());

        return orderData.filter((order) => {
            const dueDate = startOfDay(new Date(order.dueDate));
            const receivedDate = startOfDay(new Date(order.receivedAt));
            const isOpen =
                order.jobStatus !== 'Completed' &&
                order.jobStatus !== 'Cancelled';

            switch (activeOrderView) {
                case 'new_orders':
                    return order.jobStatus === 'New';
                case 'open_orders':
                    return isOpen;
                case 'open_orders_minus_quotes':
                    return isOpen && !order.hasQuote;
                case 'quotes_only':
                    return order.hasQuote;
                case 'due_today_overdue':
                    return isOpen && dueDate <= today;
                case 'place_today':
                    return isSameDay(receivedDate, today);
                case 'completed':
                    return order.jobStatus === 'Completed';
                case 'cancelled':
                    return order.jobStatus === 'Cancelled';
                case 'snail_mail_list':
                    return order.deliveryMethod === 'Snail Mail';
                default:
                    return true;
            }
        });
    }, [activeOrderView]);

    const visibleOrders = useMemo(() => {
        const normalizedQuery = searchTerm.trim().toLowerCase();

        return filteredByView.filter((order) => {
            const matchesSpoke =
                spokeFilter === 'all' || order.spoke === spokeFilter;
            const haystack = [
                order.orderNo,
                order.client,
                order.address,
                order.county,
                order.info,
                order.surveyType,
            ]
                .join(' ')
                .toLowerCase();

            const matchesQuery =
                normalizedQuery.length === 0 ||
                haystack.includes(normalizedQuery);

            return matchesSpoke && matchesQuery;
        });
    }, [filteredByView, searchTerm, spokeFilter]);

    const viewCounts = useMemo(() => {
        const today = startOfDay(new Date());

        return orderViews.reduce(
            (accumulator, view) => {
                accumulator[view.key] = orderData.filter((order) => {
                    const dueDate = startOfDay(new Date(order.dueDate));
                    const receivedDate = startOfDay(new Date(order.receivedAt));
                    const isOpen =
                        order.jobStatus !== 'Completed' &&
                        order.jobStatus !== 'Cancelled';

                    switch (view.key) {
                        case 'new_orders':
                            return order.jobStatus === 'New';
                        case 'open_orders':
                            return isOpen;
                        case 'open_orders_minus_quotes':
                            return isOpen && !order.hasQuote;
                        case 'quotes_only':
                            return order.hasQuote;
                        case 'due_today_overdue':
                            return isOpen && dueDate <= today;
                        case 'place_today':
                            return isSameDay(receivedDate, today);
                        case 'completed':
                            return order.jobStatus === 'Completed';
                        case 'cancelled':
                            return order.jobStatus === 'Cancelled';
                        case 'snail_mail_list':
                            return order.deliveryMethod === 'Snail Mail';
                        default:
                            return true;
                    }
                }).length;

                return accumulator;
            },
            {} as Record<OrderViewKey, number>,
        );
    }, []);

    const activeViewLabel =
        orderViews.find((view) => view.key === activeOrderView)?.label ??
        'Order View';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order List" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="flex flex-wrap items-center gap-2 border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                Order Management
                            </p>
                            <h1 className="text-xl font-semibold text-[#1f2e22]">
                                Order List
                            </h1>
                        </div>
                        <div className="ml-auto flex w-full flex-wrap items-center gap-2 sm:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#d3dfd6] bg-white px-3 text-sm font-medium text-[#1f2e22] transition hover:border-[#186627]/50"
                                    >
                                        <span>{activeViewLabel}</span>
                                        <span className="rounded-full bg-[#edf5ef] px-2 py-0.5 text-xs font-semibold text-[#355744]">
                                            {viewCounts[activeOrderView]}
                                        </span>
                                        <ChevronDown className="size-4 text-[#5f7768]" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    className="w-[290px] border-[#dce8df]"
                                >
                                    {orderViews.map((view) => (
                                        <DropdownMenuItem
                                            key={view.key}
                                            onSelect={() =>
                                                setActiveOrderView(view.key)
                                            }
                                            className={cn(
                                                'flex items-center justify-between gap-2 py-2',
                                                activeOrderView === view.key &&
                                                    'bg-[#edf5ef] text-[#1f2e22]',
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span>{view.label}</span>
                                                {activeOrderView ===
                                                    view.key && (
                                                    <Check className="size-4 text-[#186627]" />
                                                )}
                                            </div>
                                            <span className="rounded-full bg-[#edf5ef] px-2 py-0.5 text-xs font-semibold text-[#355744]">
                                                {viewCounts[view.key]}
                                            </span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <label className="relative block min-w-[220px] flex-1 sm:min-w-[300px] sm:flex-none">
                                <Search className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-[#5f7768]" />
                                <Input
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search orders"
                                    className="h-10 w-full rounded-md border border-[#cad7ce] bg-white pl-9 pr-3 text-sm text-[#1f2e22] placeholder:text-[#708477] focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                />
                            </label>
                            <select
                                value={spokeFilter}
                                onChange={(event) =>
                                    setSpokeFilter(event.target.value)
                                }
                                className="h-9 rounded-lg border border-[#d3dfd6] bg-white px-3 text-sm text-[#1f2e22] outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                            >
                                {spokes.map((spoke) => (
                                    <option key={spoke} value={spoke}>
                                        {spoke === 'all' ? 'All Spokes' : spoke}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="overflow-hidden rounded-xl border border-[#dce8df]">
                            <div className="border-b border-[#e2ebe4] bg-[#f7fbf8] px-4 py-2 text-sm font-semibold text-[#2b4b3a]">
                                {activeViewLabel}{' '}
                                ({visibleOrders.length})
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-[1260px] divide-y divide-[#e3ebe5] text-sm">
                                    <thead className="bg-[#eef5ef] text-left text-xs font-semibold tracking-wide text-[#2d4c3b] uppercase">
                                        <tr>
                                            <th className="px-3 py-3">#</th>
                                            <th className="px-3 py-3">
                                                Order No.
                                            </th>
                                            <th className="px-3 py-3">
                                                Client
                                            </th>
                                            <th className="px-3 py-3">
                                                Job Status
                                            </th>
                                            <th className="px-3 py-3">
                                                Address
                                            </th>
                                            <th className="px-3 py-3">
                                                County
                                            </th>
                                            <th className="px-3 py-3">
                                                Type
                                            </th>
                                            <th className="px-3 py-3">
                                                Received
                                            </th>
                                            <th className="px-3 py-3">
                                                Due Date
                                            </th>
                                            <th className="px-3 py-3">
                                                Internal Due
                                            </th>
                                            <th className="px-3 py-3">
                                                Field Due
                                            </th>
                                            <th className="px-3 py-3">
                                                Spoke
                                            </th>
                                            <th className="px-3 py-3">
                                                Info
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#edf3ef] text-[#203325]">
                                        {visibleOrders.map((order, index) => (
                                            <tr
                                                key={order.id}
                                                className="align-top hover:bg-[#f9fcfa]"
                                            >
                                                <td className="px-3 py-3 font-semibold">
                                                    {index + 1}
                                                </td>
                                                <td className="px-3 py-3 font-semibold text-[#186627]">
                                                    {order.orderNo}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {order.client}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                            order.jobStatus ===
                                                            'Completed'
                                                                ? 'bg-[#186627]/12 text-[#186627]'
                                                                : order.jobStatus ===
                                                                    'Cancelled'
                                                                  ? 'bg-[#bb6420]/15 text-[#8d4d1c]'
                                                                  : 'bg-[#edf5ef] text-[#355744]'
                                                        }`}
                                                    >
                                                        {order.jobStatus}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    {order.address}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {order.county}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {order.surveyType}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {dateTimeFormatter.format(
                                                        new Date(
                                                            order.receivedAt,
                                                        ),
                                                    )}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {dateFormatter.format(
                                                        new Date(order.dueDate),
                                                    )}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {dateFormatter.format(
                                                        new Date(
                                                            order.internalDueDate,
                                                        ),
                                                    )}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {dateFormatter.format(
                                                        new Date(
                                                            order.fieldDueDate,
                                                        ),
                                                    )}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {order.spoke}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {order.info}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {visibleOrders.length === 0 && (
                                    <div className="px-4 py-10 text-center text-sm text-[#56705e]">
                                        No orders found for this module and
                                        filter combination.
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
