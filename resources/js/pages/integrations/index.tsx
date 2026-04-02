import { Head } from '@inertiajs/react';
import { BadgeCheck, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type IntegrationItem = {
    id: string;
    name: string;
    description: string;
    category: string;
    logo: string;
    status: 'Connected';
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Integrations',
        href: '/integrations',
    },
];

const integrations: IntegrationItem[] = [
    {
        id: 'quickbooks',
        name: 'QuickBooks',
        description: 'Accounting sync for invoices, payments, and ledger flow.',
        category: 'Accounting',
        logo: '/images/integrations/quickbooks.svg',
        status: 'Connected',
    },
    {
        id: 'twilio',
        name: 'Twilio',
        description: 'SMS and communication workflows for order updates.',
        category: 'Communication',
        logo: '/images/integrations/twilio.svg',
        status: 'Connected',
    },
    {
        id: 'stripe',
        name: 'Stripe',
        description: 'Payment collection and transaction processing.',
        category: 'Payments',
        logo: '/images/integrations/stripe.svg',
        status: 'Connected',
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        description: 'CRM sync for clients, opportunities, and account records.',
        category: 'CRM',
        logo: '/images/integrations/salesforce.svg',
        status: 'Connected',
    },
];

export default function IntegrationsIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Integrations" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="flex flex-wrap items-center gap-3 border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                Integration Hub
                            </p>
                            <h1 className="text-xl font-semibold text-[#1f2e22]">
                                Integrations
                            </h1>
                            <p className="mt-1 text-sm text-[#607669]">
                                Current connected apps and extension points.
                            </p>
                        </div>
                        <Button className="ml-auto h-10 bg-[#186627] px-4 text-white hover:bg-[#145521]">
                            <Plus className="size-4" />
                            Add Integration
                        </Button>
                    </div>

                    <div className="p-4">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {integrations.map((integration) => {
                                return (
                                    <article
                                        key={integration.id}
                                        className="rounded-xl border border-[#dce8df] bg-white p-4 transition hover:border-[#c7d7cd] hover:shadow-[0_18px_30px_-26px_rgba(24,102,39,0.75)]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={integration.logo}
                                                alt={`${integration.name} logo`}
                                                className="h-12 w-12 shrink-0 object-contain"
                                            />
                                            <div className="min-w-0 leading-tight">
                                                <h2 className="text-lg font-semibold text-[#1f2e22]">
                                                    {integration.name}
                                                </h2>
                                                <p className="text-xs font-medium text-[#607669]">
                                                    {integration.category}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mt-3 border-t border-[#edf3ef] pt-3 text-sm text-[#3a5545]">
                                            {integration.description}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f4ea] px-2 py-1 text-xs font-semibold text-[#186627]">
                                                <BadgeCheck className="size-3.5" />
                                                {integration.status}
                                            </span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
