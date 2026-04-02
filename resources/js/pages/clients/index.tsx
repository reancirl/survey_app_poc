import { Head } from '@inertiajs/react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type ClientStatus = 'Active' | 'Disabled' | 'Deleted';

type ClientItem = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    userName: string;
    email: string;
    spoke: string;
    type: string;
    software: string;
    marketer: string;
    referredBy: string;
    parentClientName: string;
    clientRef: string;
    dateAdded: string;
    status: ClientStatus;
};

type AdvancedFilters = {
    clientName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    userName: string;
    email: string;
    type: string;
    software: string;
    marketer: string;
    clientRef: string;
    referredBy: string;
    parentClientName: string;
    dateAdded: string;
    showDeleted: boolean;
    showDisabled: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    },
];

const defaultAdvancedFilters: AdvancedFilters = {
    clientName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    userName: '',
    email: '',
    type: 'all',
    software: 'all',
    marketer: 'all',
    clientRef: '',
    referredBy: '',
    parentClientName: '',
    dateAdded: '',
    showDeleted: false,
    showDisabled: false,
};

const clientData: ClientItem[] = [
    {
        id: 1,
        name: 'Gulf Coast Consulting, Inc.',
        address: '6501 Pasadena Avenue North',
        city: 'St. Petersburg',
        state: 'FL',
        zip: '33710',
        phone: '(813) 555-2100',
        userName: 'gc_admin',
        email: 'orders@gulfcoastconsulting.com',
        spoke: 'FCS, Inc.',
        type: 'Title',
        software: 'Qualia',
        marketer: 'MF',
        referredBy: 'Internal',
        parentClientName: 'Gulf Coast Group',
        clientRef: 'GCC-1001',
        dateAdded: '2026-03-05',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Reliable Lien Search',
        address: '18185 Northwest 252nd Street',
        city: 'Okeechobee',
        state: 'FL',
        zip: '34972',
        phone: '(863) 555-9302',
        userName: 'rls_ops',
        email: 'ops@reliableliensearch.com',
        spoke: 'FCS, Inc.',
        type: 'Lender',
        software: 'SoftPro',
        marketer: 'HT',
        referredBy: 'Wood',
        parentClientName: '',
        clientRef: 'RLS-2204',
        dateAdded: '2026-03-12',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Proplogix',
        address: '810 South Surf Drive',
        city: 'Hollywood',
        state: 'FL',
        zip: '33019',
        phone: '(954) 555-3008',
        userName: 'proplogix_q',
        email: 'quotes@proplogix.com',
        spoke: 'FCS, Inc.',
        type: 'Survey Management',
        software: 'Resware',
        marketer: 'MF',
        referredBy: 'Guarte',
        parentClientName: '',
        clientRef: 'PLOG-041',
        dateAdded: '2026-03-10',
        status: 'Active',
    },
    {
        id: 4,
        name: 'Frontier Title Group, LLC',
        address: '100 Main Street',
        city: 'Bushnell',
        state: 'FL',
        zip: '33513',
        phone: '(352) 555-7752',
        userName: 'frontier_ftg',
        email: 'intake@frontiertitlegroup.com',
        spoke: 'FCS, Inc.',
        type: 'Title',
        software: 'Qualia',
        marketer: 'HT',
        referredBy: 'Slaydon',
        parentClientName: 'Frontier Network',
        clientRef: 'FTG-883',
        dateAdded: '2026-02-25',
        status: 'Disabled',
    },
    {
        id: 5,
        name: 'Harbor Vista LLC',
        address: '42 Lakeshore Blvd',
        city: 'Orlando',
        state: 'FL',
        zip: '32801',
        phone: '(407) 555-0198',
        userName: 'hv_admin',
        email: 'admin@harborvista.com',
        spoke: 'No Spoke',
        type: 'Owner',
        software: 'Other',
        marketer: 'MF',
        referredBy: 'Internal',
        parentClientName: '',
        clientRef: 'HV-11',
        dateAdded: '2026-03-01',
        status: 'Active',
    },
    {
        id: 6,
        name: 'Maple Ridge Properties',
        address: '74 Palmetto Way',
        city: 'St. Petersburg',
        state: 'FL',
        zip: '33702',
        phone: '(727) 555-0063',
        userName: 'maple_ridge',
        email: 'support@mapleridgeprop.com',
        spoke: 'FCS, Inc.',
        type: 'Owner',
        software: 'Other',
        marketer: 'MF',
        referredBy: 'Wood',
        parentClientName: '',
        clientRef: 'MRP-72',
        dateAdded: '2026-01-18',
        status: 'Deleted',
    },
    {
        id: 7,
        name: 'National Title of Florida, Inc.',
        address: '3843 Briley Loop',
        city: 'Land O\' Lakes',
        state: 'FL',
        zip: '34638',
        phone: '(813) 555-2006',
        userName: 'ntf_orders',
        email: 'orders@nationaltitlefl.com',
        spoke: 'FCS, Inc.',
        type: 'Title',
        software: 'SoftPro',
        marketer: 'MF',
        referredBy: 'Internal',
        parentClientName: '',
        clientRef: 'NTF-302',
        dateAdded: '2026-03-12',
        status: 'Active',
    },
    {
        id: 8,
        name: 'Infinity Title Insurance Agency, LLC',
        address: '13329 Northeast 38TH Avenue',
        city: 'Anthony',
        state: 'FL',
        zip: '32617',
        phone: '(352) 555-8810',
        userName: 'infinity_ops',
        email: 'ops@infinitytitle.com',
        spoke: 'FCS, Inc.',
        type: 'Title',
        software: 'Qualia',
        marketer: 'HT',
        referredBy: 'Guarte',
        parentClientName: '',
        clientRef: 'ITA-04',
        dateAdded: '2026-03-12',
        status: 'Active',
    },
];

export default function ClientsIndex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [spokeFilter, setSpokeFilter] = useState('all');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(
        defaultAdvancedFilters,
    );

    const uniqueSpokes = useMemo(
        () => ['all', ...new Set(clientData.map((client) => client.spoke))],
        [],
    );
    const uniqueTypes = useMemo(
        () => ['all', ...new Set(clientData.map((client) => client.type))],
        [],
    );
    const uniqueSoftware = useMemo(
        () => ['all', ...new Set(clientData.map((client) => client.software))],
        [],
    );
    const uniqueMarketers = useMemo(
        () => ['all', ...new Set(clientData.map((client) => client.marketer))],
        [],
    );

    const visibleClients = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return clientData.filter((client) => {
            if (!advancedFilters.showDeleted && client.status === 'Deleted') {
                return false;
            }
            if (!advancedFilters.showDisabled && client.status === 'Disabled') {
                return false;
            }

            const matchesBasicSearch =
                normalizedSearch.length === 0 ||
                [
                    client.name,
                    client.address,
                    client.city,
                    client.phone,
                    client.email,
                    client.clientRef,
                ]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesSpoke =
                spokeFilter === 'all' || client.spoke === spokeFilter;

            const matchesAdvanced =
                (advancedFilters.clientName.length === 0 ||
                    client.name
                        .toLowerCase()
                        .includes(advancedFilters.clientName.toLowerCase())) &&
                (advancedFilters.address.length === 0 ||
                    client.address
                        .toLowerCase()
                        .includes(advancedFilters.address.toLowerCase())) &&
                (advancedFilters.city.length === 0 ||
                    client.city
                        .toLowerCase()
                        .includes(advancedFilters.city.toLowerCase())) &&
                (advancedFilters.state.length === 0 ||
                    client.state
                        .toLowerCase()
                        .includes(advancedFilters.state.toLowerCase())) &&
                (advancedFilters.zip.length === 0 ||
                    client.zip
                        .toLowerCase()
                        .includes(advancedFilters.zip.toLowerCase())) &&
                (advancedFilters.phone.length === 0 ||
                    client.phone
                        .toLowerCase()
                        .includes(advancedFilters.phone.toLowerCase())) &&
                (advancedFilters.userName.length === 0 ||
                    client.userName
                        .toLowerCase()
                        .includes(advancedFilters.userName.toLowerCase())) &&
                (advancedFilters.email.length === 0 ||
                    client.email
                        .toLowerCase()
                        .includes(advancedFilters.email.toLowerCase())) &&
                (advancedFilters.type === 'all' ||
                    client.type === advancedFilters.type) &&
                (advancedFilters.software === 'all' ||
                    client.software === advancedFilters.software) &&
                (advancedFilters.marketer === 'all' ||
                    client.marketer === advancedFilters.marketer) &&
                (advancedFilters.clientRef.length === 0 ||
                    client.clientRef
                        .toLowerCase()
                        .includes(advancedFilters.clientRef.toLowerCase())) &&
                (advancedFilters.referredBy.length === 0 ||
                    client.referredBy
                        .toLowerCase()
                        .includes(advancedFilters.referredBy.toLowerCase())) &&
                (advancedFilters.parentClientName.length === 0 ||
                    client.parentClientName
                        .toLowerCase()
                        .includes(
                            advancedFilters.parentClientName.toLowerCase(),
                        )) &&
                (advancedFilters.dateAdded.length === 0 ||
                    client.dateAdded === advancedFilters.dateAdded);

            return matchesBasicSearch && matchesSpoke && matchesAdvanced;
        });
    }, [advancedFilters, searchTerm, spokeFilter]);

    const statusBadgeClass: Record<ClientStatus, string> = {
        Active: 'bg-[#e8f4ea] text-[#186627]',
        Disabled: 'bg-[#fff5e8] text-[#8d5a19]',
        Deleted: 'bg-[#fdeeee] text-[#a4372a]',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                    Client Management
                                </p>
                                <h1 className="text-xl font-semibold text-[#1f2e22]">
                                    Clients
                                </h1>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                            <label className="relative block min-w-[220px] sm:min-w-[300px]">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5f7768]" />
                                <Input
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search by client, email, phone, address"
                                    className="h-10 w-full rounded-md border border-[#cad7ce] bg-white pl-9 pr-3 text-sm text-[#1f2e22] placeholder:text-[#708477] focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                />
                            </label>

                            <select
                                value={spokeFilter}
                                onChange={(event) =>
                                    setSpokeFilter(event.target.value)
                                }
                                className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                            >
                                {uniqueSpokes.map((spoke) => (
                                    <option key={spoke} value={spoke}>
                                        {spoke === 'all' ? 'All Spokes' : spoke}
                                    </option>
                                ))}
                            </select>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setShowAdvancedFilters((value) => !value)
                                }
                                className="h-10 border-[#cad7ce] text-[#2c4638] hover:border-[#186627]/40 hover:bg-[#f6fbf7]"
                            >
                                <Filter className="size-4" />
                                Advanced Filters
                                <ChevronDown
                                    className={cn(
                                        'size-4 transition-transform',
                                        showAdvancedFilters && 'rotate-180',
                                    )}
                                />
                            </Button>
                        </div>

                        {showAdvancedFilters && (
                            <div className="mt-4 rounded-xl border border-[#dce8df] bg-[#f7fbf8] p-4">
                                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                                    <Input
                                        value={advancedFilters.clientName}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                clientName:
                                                    event.target.value,
                                            }))
                                        }
                                        placeholder="Client name"
                                    />
                                    <Input
                                        value={advancedFilters.address}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                address: event.target.value,
                                            }))
                                        }
                                        placeholder="Address"
                                    />
                                    <Input
                                        value={advancedFilters.city}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                city: event.target.value,
                                            }))
                                        }
                                        placeholder="City"
                                    />
                                    <Input
                                        value={advancedFilters.state}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                state: event.target.value,
                                            }))
                                        }
                                        placeholder="State"
                                    />
                                    <Input
                                        value={advancedFilters.zip}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                zip: event.target.value,
                                            }))
                                        }
                                        placeholder="Zip"
                                    />
                                    <Input
                                        value={advancedFilters.phone}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                phone: event.target.value,
                                            }))
                                        }
                                        placeholder="Phone"
                                    />
                                    <Input
                                        value={advancedFilters.userName}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                userName: event.target.value,
                                            }))
                                        }
                                        placeholder="User name"
                                    />
                                    <Input
                                        value={advancedFilters.email}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                email: event.target.value,
                                            }))
                                        }
                                        placeholder="Email"
                                    />
                                    <select
                                        value={advancedFilters.type}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                type: event.target.value,
                                            }))
                                        }
                                        className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                    >
                                        {uniqueTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type === 'all'
                                                    ? 'All types'
                                                    : type}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={advancedFilters.software}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                software: event.target.value,
                                            }))
                                        }
                                        className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                    >
                                        {uniqueSoftware.map((software) => (
                                            <option
                                                key={software}
                                                value={software}
                                            >
                                                {software === 'all'
                                                    ? 'All software'
                                                    : software}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={advancedFilters.marketer}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                marketer: event.target.value,
                                            }))
                                        }
                                        className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                    >
                                        {uniqueMarketers.map((marketer) => (
                                            <option
                                                key={marketer}
                                                value={marketer}
                                            >
                                                {marketer === 'all'
                                                    ? 'All marketers'
                                                    : marketer}
                                            </option>
                                        ))}
                                    </select>
                                    <Input
                                        value={advancedFilters.clientRef}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                clientRef:
                                                    event.target.value,
                                            }))
                                        }
                                        placeholder="Client Ref #"
                                    />
                                    <Input
                                        value={advancedFilters.referredBy}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                referredBy:
                                                    event.target.value,
                                            }))
                                        }
                                        placeholder="Referred by"
                                    />
                                    <Input
                                        value={advancedFilters.parentClientName}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                parentClientName:
                                                    event.target.value,
                                            }))
                                        }
                                        placeholder="Parent client name"
                                    />
                                    <Input
                                        type="date"
                                        value={advancedFilters.dateAdded}
                                        onChange={(event) =>
                                            setAdvancedFilters((previous) => ({
                                                ...previous,
                                                dateAdded:
                                                    event.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-4">
                                    <label className="inline-flex items-center gap-2 text-sm text-[#355744]">
                                        <input
                                            type="checkbox"
                                            checked={advancedFilters.showDeleted}
                                            onChange={(event) =>
                                                setAdvancedFilters(
                                                    (previous) => ({
                                                        ...previous,
                                                        showDeleted:
                                                            event.target.checked,
                                                    }),
                                                )
                                            }
                                            className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                        />
                                        Show Deleted
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-[#355744]">
                                        <input
                                            type="checkbox"
                                            checked={advancedFilters.showDisabled}
                                            onChange={(event) =>
                                                setAdvancedFilters(
                                                    (previous) => ({
                                                        ...previous,
                                                        showDisabled:
                                                            event.target.checked,
                                                    }),
                                                )
                                            }
                                            className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                        />
                                        Show Disabled
                                    </label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="ml-auto border-[#cad7ce]"
                                        onClick={() =>
                                            setAdvancedFilters(
                                                defaultAdvancedFilters,
                                            )
                                        }
                                    >
                                        Clear advanced filters
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <div className="overflow-hidden rounded-xl border border-[#dce8df]">
                            <div className="border-b border-[#e2ebe4] bg-[#f7fbf8] px-4 py-2 text-sm font-semibold text-[#2b4b3a]">
                                Client Results ({visibleClients.length})
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-[1200px] text-sm">
                                    <thead className="bg-[#edf3ef] text-left text-xs font-semibold tracking-wide text-[#2f4c3d] uppercase">
                                        <tr>
                                            <th className="px-3 py-2">#</th>
                                            <th className="px-3 py-2">Client</th>
                                            <th className="px-3 py-2">Address</th>
                                            <th className="px-3 py-2">Phone</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">Spoke</th>
                                            <th className="px-3 py-2">Type</th>
                                            <th className="px-3 py-2">Software</th>
                                            <th className="px-3 py-2">Marketer</th>
                                            <th className="px-3 py-2">Date Added</th>
                                            <th className="px-3 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#25382d]">
                                        {visibleClients.map((client, index) => (
                                            <tr
                                                key={client.id}
                                                className={cn(
                                                    'border-t border-[#e2ebe4]',
                                                    index % 2 === 0
                                                        ? 'bg-[#f8fbf9]'
                                                        : 'bg-white',
                                                )}
                                            >
                                                <td className="px-3 py-2 font-semibold">
                                                    {index + 1}
                                                </td>
                                                <td className="px-3 py-2 font-semibold text-[#1f2e22]">
                                                    {client.name}
                                                    <p className="text-xs font-medium text-[#5f7768]">
                                                        {client.clientRef}
                                                    </p>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.address}, {client.city},{' '}
                                                    {client.state} {client.zip}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.phone}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.email}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.spoke}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.type}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.software}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.marketer}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {client.dateAdded}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={cn(
                                                            'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
                                                            statusBadgeClass[
                                                                client.status
                                                            ],
                                                        )}
                                                    >
                                                        {client.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {visibleClients.length === 0 && (
                                    <div className="px-4 py-10 text-center text-sm text-[#56705e]">
                                        No clients found for this filter set.
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
