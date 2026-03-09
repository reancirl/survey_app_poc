export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_12px_24px_-16px_rgba(24,102,39,0.95)]">
                <span className="text-[11px] font-bold tracking-[0.2em]">
                    FCS
                </span>
            </div>
            <div className="ml-1.5 grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold">
                    First Choice Surveying Inc.
                </span>
                <span className="truncate text-[11px] font-medium text-[#bb6420]">
                    Operations Portal
                </span>
            </div>
        </>
    );
}
