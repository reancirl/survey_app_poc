import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type QuoteFilterKey =
    | 'new'
    | 'open'
    | 'won'
    | 'lost'
    | 'my_quotes'
    | 'no_spoke'
    | 'hold_estimate'
    | 'stale_quote'
    | 'closed_log';

type QuoteStatus = 'New' | 'Open' | 'Won' | 'Lost' | 'Hold - Estimate';

type QuoteItem = {
    id: number;
    quoteNo: string;
    type: string;
    orderedBy: string;
    receivedDate: string;
    clientDueDate: string;
    client: string;
    address: string;
    status: QuoteStatus;
    marketer: string;
    csr: string;
    researcher: string;
    followUpDate: string;
    quoteAmount: number;
    converted: '' | 'Yes';
    spoke: string;
    notes: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotes',
        href: '/quotes',
    },
];

const quoteFilters: { key: QuoteFilterKey; label: string }[] = [
    { key: 'new', label: 'New' },
    { key: 'open', label: 'Open' },
    { key: 'won', label: 'Won' },
    { key: 'lost', label: 'Lost' },
    { key: 'my_quotes', label: 'My Quotes' },
    { key: 'no_spoke', label: 'No Spoke' },
    { key: 'hold_estimate', label: 'Hold - Estimate' },
    { key: 'stale_quote', label: 'Stale Quote' },
    { key: 'closed_log', label: 'Closed Log' },
];

const quoteData: QuoteItem[] = [
    {
        id: 1,
        quoteNo: '81767 - Gulf Coast Consulting, Inc.',
        type: 'Boundary Survey',
        orderedBy: 'EM',
        receivedDate: '2026-03-05',
        clientDueDate: '2026-03-12',
        client: '0000',
        address: '6501 Pasadena Avenue North, St. Petersburg, Florida',
        status: 'New',
        marketer: 'MF',
        csr: 'Quote',
        researcher: 'Wood',
        followUpDate: '2026-03-12',
        quoteAmount: 0,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'DUE 59277-01 / SEE NOTES',
    },
    {
        id: 2,
        quoteNo: '82019 - ABE - Agent',
        type: 'Boundary Survey',
        orderedBy: 'PQ',
        receivedDate: '2026-03-11',
        clientDueDate: '2026-03-12',
        client: '0000',
        address: '1400 Myrtle Street, Sarasota, Florida',
        status: 'Open',
        marketer: 'MF',
        csr: 'Quote',
        researcher: 'Guarte',
        followUpDate: '2026-03-12',
        quoteAmount: 425,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'SEE NOTES 3/12',
    },
    {
        id: 3,
        quoteNo: '82059',
        type: 'Boundary Survey',
        orderedBy: 'CC',
        receivedDate: '2026-03-12',
        clientDueDate: '2026-03-12',
        client: 'Reliable Lien Search',
        address: '18185 Northwest 252nd Street, Okeechobee, Florida',
        status: 'New',
        marketer: 'HT',
        csr: 'Quote',
        researcher: 'Slaydon',
        followUpDate: '2026-03-12',
        quoteAmount: 0,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'CS GTG',
    },
    {
        id: 4,
        quoteNo: '82064 - Carly Williams',
        type: 'Boundary Survey W/ Spot Elevations',
        orderedBy: 'PQ',
        receivedDate: '2026-03-12',
        clientDueDate: '2026-03-12',
        client: '0000',
        address: '1287 Bob White Trail, Chuluota, Florida',
        status: 'Open',
        marketer: 'MF',
        csr: 'Quote',
        researcher: 'Wood',
        followUpDate: '2026-03-12',
        quoteAmount: 0,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'SEE NOTES',
    },
    {
        id: 5,
        quoteNo: '82080',
        type: 'Boundary Survey',
        orderedBy: 'CC',
        receivedDate: '2026-03-12',
        clientDueDate: '2026-03-13',
        client: 'Proplogix',
        address: '810 South Surf Drive, Hollywood, Florida',
        status: 'Hold - Estimate',
        marketer: 'MF',
        csr: 'Quote',
        researcher: '',
        followUpDate: '2026-03-13',
        quoteAmount: 0,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'by 3/13/2026 1:00 PM',
    },
    {
        id: 6,
        quoteNo: '82081',
        type: 'Boundary Survey',
        orderedBy: 'CC',
        receivedDate: '2026-03-12',
        clientDueDate: '2026-03-15',
        client: 'Proplogix',
        address: '334 Oregon Street Unit 1-5, Hollywood, Florida',
        status: 'Open',
        marketer: 'MF',
        csr: 'Quote',
        researcher: '',
        followUpDate: '2026-03-15',
        quoteAmount: 0,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'Priority follow-up',
    },
    {
        id: 7,
        quoteNo: '82085',
        type: 'Boundary Survey',
        orderedBy: 'CC',
        receivedDate: '2026-03-12',
        clientDueDate: '2026-03-17',
        client: 'Frontier Title Group, LLC - Central FL',
        address: 'Florida 48, Bushnell, Florida',
        status: 'Won',
        marketer: 'HT',
        csr: 'Quote',
        researcher: '',
        followUpDate: '2026-03-17',
        quoteAmount: 650,
        converted: 'Yes',
        spoke: 'FCS, Inc.',
        notes: 'Converted to order',
    },
    {
        id: 8,
        quoteNo: '82095 - Marie Brooks',
        type: 'Boundary Survey',
        orderedBy: 'PQ',
        receivedDate: '2026-03-12',
        clientDueDate: '2026-03-18',
        client: '0000',
        address: 'South East 170th Street Road, Summerfield, Florida',
        status: 'Open',
        marketer: 'MF',
        csr: 'Quote',
        researcher: '',
        followUpDate: '2026-03-18',
        quoteAmount: 0,
        converted: '',
        spoke: 'No Spoke',
        notes: 'Waiting for spoke assignment',
    },
    {
        id: 9,
        quoteNo: '82102 - GCT Holdings',
        type: 'Boundary Survey',
        orderedBy: 'PQ',
        receivedDate: '2026-03-01',
        clientDueDate: '2026-03-05',
        client: 'GCT Holdings',
        address: '100 Riverfront Way, Tampa, Florida',
        status: 'Lost',
        marketer: 'MF',
        csr: 'Quote',
        researcher: 'Guarte',
        followUpDate: '2026-03-06',
        quoteAmount: 315,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'Lost to competitor',
    },
    {
        id: 10,
        quoteNo: '82111 - Harbor Vista',
        type: 'Boundary Survey',
        orderedBy: 'EM',
        receivedDate: '2026-02-26',
        clientDueDate: '2026-03-03',
        client: 'Harbor Vista LLC',
        address: '42 Lakeshore Blvd, Orlando, Florida',
        status: 'Open',
        marketer: 'MF',
        csr: 'Quote',
        researcher: 'Wood',
        followUpDate: '2026-03-03',
        quoteAmount: 0,
        converted: '',
        spoke: 'FCS, Inc.',
        notes: 'Needs updated call',
    },
];

function daysBetween(from: Date, to: Date) {
    const fromMidnight = new Date(
        from.getFullYear(),
        from.getMonth(),
        from.getDate(),
    );
    const toMidnight = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    return Math.floor(
        (toMidnight.getTime() - fromMidnight.getTime()) / 86400000,
    );
}

function matchesFilter(quote: QuoteItem, filter: QuoteFilterKey) {
    const receivedAt = new Date(quote.receivedDate);
    const staleThreshold = 14;

    switch (filter) {
        case 'new':
            return quote.status === 'New';
        case 'open':
            return quote.status === 'Open' || quote.status === 'Hold - Estimate';
        case 'won':
            return quote.status === 'Won';
        case 'lost':
            return quote.status === 'Lost';
        case 'my_quotes':
            return quote.marketer === 'MF';
        case 'no_spoke':
            return quote.spoke === 'No Spoke';
        case 'hold_estimate':
            return quote.status === 'Hold - Estimate';
        case 'stale_quote':
            return (
                (quote.status === 'Open' ||
                    quote.status === 'New' ||
                    quote.status === 'Hold - Estimate') &&
                daysBetween(receivedAt, new Date()) >= staleThreshold
            );
        case 'closed_log':
            return quote.status === 'Won' || quote.status === 'Lost';
        default:
            return true;
    }
}

export default function QuotesIndex() {
    const [activeFilter, setActiveFilter] = useState<QuoteFilterKey>('open');
    const [searchTerm, setSearchTerm] = useState('');
    const [spokeFilter, setSpokeFilter] = useState('all');
    const [deepSearch, setDeepSearch] = useState(false);

    const dateFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
            }),
        [],
    );

    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }),
        [],
    );

    const spokes = useMemo(
        () => ['all', ...new Set(quoteData.map((quote) => quote.spoke))],
        [],
    );

    const filterCounts = useMemo(
        () =>
            quoteFilters.reduce(
                (accumulator, filter) => {
                    accumulator[filter.key] = quoteData.filter((quote) =>
                        matchesFilter(quote, filter.key),
                    ).length;

                    return accumulator;
                },
                {} as Record<QuoteFilterKey, number>,
            ),
        [],
    );

    const visibleQuotes = useMemo(() => {
        const normalizedQuery = searchTerm.trim().toLowerCase();
        const enforceMinChars = normalizedQuery.length > 0 && normalizedQuery.length < 3;

        return quoteData.filter((quote) => {
            const matchesView = matchesFilter(quote, activeFilter);
            const matchesSpoke =
                spokeFilter === 'all' || quote.spoke === spokeFilter;

            const searchableFields = [
                quote.quoteNo,
                quote.type,
                quote.client,
                quote.address,
                quote.status,
                quote.marketer,
                quote.csr,
                quote.researcher,
                quote.spoke,
            ];

            if (deepSearch) {
                searchableFields.push(quote.notes);
            }

            const matchesQuery =
                normalizedQuery.length === 0 ||
                enforceMinChars ||
                searchableFields
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedQuery);

            return matchesView && matchesSpoke && matchesQuery;
        });
    }, [activeFilter, deepSearch, searchTerm, spokeFilter]);

    const quoteAmountTotal = useMemo(
        () => visibleQuotes.reduce((sum, quote) => sum + quote.quoteAmount, 0),
        [visibleQuotes],
    );

    const today = new Date();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotes" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                    Quotes Management
                                </p>
                                <h1 className="text-xl font-semibold text-[#1f2e22]">
                                    Quotes
                                </h1>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <label className="relative block min-w-[220px] flex-1 sm:min-w-[300px] sm:max-w-[420px]">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5f7768]" />
                                <Input
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search quotes (min 3 characters)"
                                    className="h-10 w-full rounded-md border border-[#cad7ce] bg-white pl-9 pr-3 text-sm text-[#1f2e22] placeholder:text-[#708477] focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                />
                            </label>

                            <select
                                value={spokeFilter}
                                onChange={(event) =>
                                    setSpokeFilter(event.target.value)
                                }
                                className="h-9 rounded-md border border-[#cad7ce] bg-white px-3 text-sm text-[#1f2e22] outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                            >
                                {spokes.map((spoke) => (
                                    <option key={spoke} value={spoke}>
                                        {spoke === 'all' ? 'All Spokes' : spoke}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            {quoteFilters.map((filter) => (
                                <button
                                    key={filter.key}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={cn(
                                        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition',
                                        activeFilter === filter.key
                                            ? 'border-[#186627] bg-[#186627] text-white'
                                            : 'border-[#d3dfd6] bg-white text-[#2c4638] hover:border-[#186627]/40',
                                    )}
                                >
                                    <span>{filter.label}</span>
                                    <span
                                        className={cn(
                                            'rounded-full px-1.5 py-0.5 text-xs font-semibold',
                                            activeFilter === filter.key
                                                ? 'bg-white/20 text-white'
                                                : 'bg-[#edf5ef] text-[#355744]',
                                        )}
                                    >
                                        {filterCounts[filter.key]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#385543]">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={deepSearch}
                                    onChange={(event) =>
                                        setDeepSearch(event.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                />
                                Deeper search
                            </label>
                            <button
                                type="button"
                                className="font-semibold text-[#186627] hover:text-[#145521]"
                            >
                                Export Excel
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="overflow-hidden rounded-xl border border-[#dce8df]">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1500px] text-sm">
                                    <thead className="bg-[#edf3ef] text-left text-xs font-semibold tracking-wide text-[#2f4c3d] uppercase">
                                        <tr>
                                            <th className="px-3 py-2">#</th>
                                            <th className="px-3 py-2">Quote</th>
                                            <th className="px-3 py-2">Type</th>
                                            <th className="px-3 py-2">Ordered By</th>
                                            <th className="px-3 py-2">Received</th>
                                            <th className="px-3 py-2">Client Due</th>
                                            <th className="px-3 py-2">Client</th>
                                            <th className="px-3 py-2">Address</th>
                                            <th className="px-3 py-2">Status</th>
                                            <th className="px-3 py-2">Marketer</th>
                                            <th className="px-3 py-2">CSR</th>
                                            <th className="px-3 py-2">Researcher</th>
                                            <th className="px-3 py-2">Follow Up</th>
                                            <th className="px-3 py-2 text-right">Quote Amt</th>
                                            <th className="px-3 py-2">Converted</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#25382d]">
                                        {visibleQuotes.map((quote, index) => {
                                            const followUpDate = new Date(
                                                quote.followUpDate,
                                            );
                                            const isOverdue = followUpDate <= today;

                                            return (
                                                <tr
                                                    key={quote.id}
                                                    className={cn(
                                                        'align-top border-t border-[#e2ebe4]',
                                                        index % 2 === 0
                                                            ? 'bg-[#f8fbf9]'
                                                            : 'bg-white',
                                                    )}
                                                >
                                                    <td className="px-3 py-2 font-semibold">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-3 py-2 font-semibold text-[#1f2e22]">
                                                        {quote.quoteNo}
                                                        <p className="mt-1 text-xs font-semibold text-[#b64c20]">
                                                            {quote.notes}
                                                        </p>
                                                    </td>
                                                    <td className="px-3 py-2 uppercase">
                                                        {quote.type}
                                                    </td>
                                                    <td className="px-3 py-2 font-semibold">
                                                        {quote.orderedBy}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {dateFormatter.format(
                                                            new Date(
                                                                quote.receivedDate,
                                                            ),
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {dateFormatter.format(
                                                            new Date(
                                                                quote.clientDueDate,
                                                            ),
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.client}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.address}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.status}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.marketer}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.csr}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.researcher || '-'}
                                                    </td>
                                                    <td
                                                        className={cn(
                                                            'px-3 py-2 font-semibold',
                                                            isOverdue
                                                                ? 'text-[#e43d2f]'
                                                                : 'text-[#355744]',
                                                        )}
                                                    >
                                                        {dateFormatter.format(
                                                            followUpDate,
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-right font-semibold">
                                                        {currencyFormatter.format(
                                                            quote.quoteAmount,
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {quote.converted}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot className="border-t border-[#d6e2d9] bg-[#edf5ef] text-sm font-semibold text-[#1f2e22]">
                                        <tr>
                                            <td className="px-3 py-2" colSpan={13}>
                                                {visibleQuotes.length} Found
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                {currencyFormatter.format(
                                                    quoteAmountTotal,
                                                )}
                                            </td>
                                            <td className="px-3 py-2" />
                                        </tr>
                                    </tfoot>
                                </table>

                                {visibleQuotes.length === 0 && (
                                    <div className="px-4 py-10 text-center text-sm text-[#56705e]">
                                        No quotes found for this filter and
                                        search combination.
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
