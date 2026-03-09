import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { home } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <div className="min-h-svh bg-white text-[#1f2e22]">
                <div className="grid min-h-svh lg:grid-cols-2">
                    <section className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#ffffff_0%,#fff8f2_48%,#f6fcf8_100%)] p-6 md:p-10">
                        <div className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-[#bb6420]/12 blur-3xl" />
                        <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-[#186627]/12 blur-3xl" />

                        <div className="relative z-10 w-full max-w-[460px]">
                            <Link
                                href={home()}
                                className="mb-8 inline-flex items-center gap-4"
                            >
                                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#186627] text-sm font-bold tracking-widest text-white">
                                    FCS
                                </span>
                                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#186627] uppercase">
                                    First Choice Surveying Inc.
                                </span>
                            </Link>

                            <div className="rounded-3xl border border-[#e7dfd7] bg-white p-7 shadow-[0_26px_64px_-36px_rgba(24,102,39,0.55)] md:p-8">
                                <div className="mb-7">
                                    <h1 className="text-2xl font-semibold text-[#1f2e22]">
                                        Welcome back
                                    </h1>
                                    <p className="mt-2 text-sm text-[#56635b]">
                                        Sign in to access the First Choice
                                        Surveying portal.
                                    </p>
                                </div>

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={['password']}
                                    className="space-y-5"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            {status && (
                                                <div className="rounded-xl border border-[#186627]/25 bg-[#186627]/10 px-4 py-3 text-sm font-medium text-[#145521]">
                                                    {status}
                                                </div>
                                            )}

                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-[#264636]"
                                                >
                                                    Email address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="name@firstchoicesurveying.com"
                                                    className="h-11 rounded-xl border-[#dac9bb] bg-white focus-visible:border-[#186627] focus-visible:ring-[#186627]/20"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <Label
                                                        htmlFor="password"
                                                        className="text-[#264636]"
                                                    >
                                                        Password
                                                    </Label>
                                                    {canResetPassword && (
                                                        <Link
                                                            href={request()}
                                                            className="text-sm font-medium text-[#bb6420] underline underline-offset-4 transition hover:text-[#9d531a]"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                    )}
                                                </div>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Enter your password"
                                                    className="h-11 rounded-xl border-[#dac9bb] bg-white focus-visible:border-[#186627] focus-visible:ring-[#186627]/20"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    tabIndex={3}
                                                    className="border-[#bb6420]/60 data-[state=checked]:border-[#186627] data-[state=checked]:bg-[#186627] data-[state=checked]:text-white"
                                                />
                                                <Label
                                                    htmlFor="remember"
                                                    className="text-sm text-[#264636]"
                                                >
                                                    Remember me
                                                </Label>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="h-11 w-full rounded-xl bg-[#186627] text-base font-semibold text-white shadow-[0_12px_24px_-14px_rgba(24,102,39,0.9)] hover:bg-[#145521]"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing && <Spinner />}
                                                Log in
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            </div>
                        </div>
                    </section>

                    <aside className="relative hidden overflow-hidden border-l border-[#e4ece6] bg-[#f6fbf7] p-12 lg:flex">
                        <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#bb6420]/18 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-0 -left-10 h-80 w-80 rounded-full bg-[#186627]/20 blur-3xl" />

                        <div className="relative z-10 my-auto w-full max-w-xl">
                            <div className="inline-flex rounded-full border border-[#186627]/20 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#186627] uppercase">
                                First Choice Surveying Portal
                            </div>

                            <h2 className="mt-6 text-5xl leading-tight font-semibold text-[#16412c]">
                                Survey smarter.
                                <br />
                                Deliver faster.
                            </h2>

                            <p className="mt-6 max-w-lg text-lg leading-8 text-[#315441]">
                                Manage field requests, monitor progress, and
                                keep every project aligned from kickoff to
                                closeout in one secure workspace.
                            </p>

                            <div className="mt-10 rounded-2xl border border-[#dfe9e2] bg-white/95 p-6 shadow-[0_16px_40px_-24px_rgba(24,102,39,0.75)]">
                                <p className="text-sm font-semibold tracking-[0.12em] text-[#bb6420] uppercase">
                                    Built for operations teams
                                </p>
                                <div className="mt-4 grid gap-3 text-sm text-[#365744]">
                                    <p>Project updates in real time</p>
                                    <p>Centralized survey records and history</p>
                                    <p>Secure access with two-factor support</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
