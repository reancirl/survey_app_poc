import { Head } from '@inertiajs/react';
import { FileSpreadsheet } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    },
];

const reportGroups = [
    [
        'Roster',
        'Route Map',
        'Research Status',
        'Field Status',
        'Drafter Status',
        'Drafter Pipeline',
        'PLSM Status',
        'PLSM Pipeline',
        'Complex Jobs',
        'Crew Scheduling',
        'Jobs Ordered',
        'Jobs by County',
        'Market Tracking by Client',
        'Marketer Report',
        'Current Counts',
        'Ordered By Report',
    ],
    [
        'Recent Discussions',
        'Marketing Information',
        'Due/Overdue Survey Orders',
        'Closing Date Report',
        'Jobs Completed Today',
        'Current Crew Status',
        'On Hold Mgr',
        'Hold - Checker Status',
        'Orders by Type',
        'Due From Field',
    ],
    [
        'VIP jobs',
        'Rush jobs',
        'Completed Jobs Map',
        'Orders Opened',
        'On Time Delivery',
    ],
];

export default function ReportsIndex() {
    const [activeReport, setActiveReport] = useState('Client Retention Export');

    const allReports = useMemo(
        () => [...reportGroups.flat(), 'Client Retention Export'],
        [],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                            Reporting Module
                        </p>
                        <h1 className="text-xl font-semibold text-[#1f2e22]">
                            Reports
                        </h1>
                    </div>

                    <div className="grid gap-8 p-5 xl:grid-cols-[minmax(0,1fr)_260px]">
                        <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                            {reportGroups.map((group, columnIndex) => (
                                <div key={`group-${columnIndex}`} className="space-y-1">
                                    {group.map((reportName) => (
                                        <button
                                            key={reportName}
                                            type="button"
                                            onClick={() => setActiveReport(reportName)}
                                            className={cn(
                                                'block w-full rounded-md px-2 py-1.5 text-left text-sm text-[#2f3f35] transition hover:bg-[#eef5ef] hover:text-[#186627] sm:text-base',
                                                activeReport === reportName &&
                                                    'bg-[#edf5ef] font-medium text-[#186627]',
                                            )}
                                        >
                                            {reportName}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveReport('Client Retention Export')
                                }
                                className={cn(
                                    'w-full rounded-sm border border-[#cfd5d1] bg-[#c3c3c3] px-3 py-2 text-left text-sm font-medium text-[#2f3330] transition hover:border-[#aeb8b1] hover:bg-[#b8b8b8]',
                                    activeReport === 'Client Retention Export' &&
                                        'border-[#bb6420]/45 bg-[#f5e6da] text-[#8d4d1c]',
                                )}
                            >
                                Client Retention Export
                            </button>

                            <div className="mt-4 rounded-xl border border-[#dce8df] bg-[#f8fbf9] p-4">
                                <div className="flex items-center gap-2 text-[#1f2e22]">
                                    <FileSpreadsheet className="size-4 text-[#186627]" />
                                    <p className="text-sm font-semibold">Selected Report</p>
                                </div>
                                <p className="mt-2 text-sm text-[#355744]">{activeReport}</p>
                                <p className="mt-1 text-xs text-[#607669]">
                                    Placeholder preview. Wiring report generation/export will be part of backend integration.
                                </p>
                            </div>

                            <div className="mt-3 text-xs text-[#607669]">
                                {allReports.length} report entries available.
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
