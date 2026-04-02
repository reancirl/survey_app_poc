import { Head } from '@inertiajs/react';
import L, {
    type CircleMarker,
    type Map as LeafletMap,
    type TileLayer,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Expand, Layers3, Search } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order List',
        href: '/orders',
    },
    {
        title: 'Place Order',
        href: '/orders/place',
    },
];

export default function PlaceOrder() {
    const defaultLocation = 'Iligan City, Lanao del Norte, Philippines';
    const defaultCenter = { lat: 8.228, lon: 124.2452 };

    const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');
    const [lookupAddress, setLookupAddress] = useState('');
    const [mapQuery, setMapQuery] = useState(defaultLocation);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [isLocating, setIsLocating] = useState(false);
    const [lookupError, setLookupError] = useState('');
    const [address, setAddress] = useState('');

    const mapElementRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const markerRef = useRef<CircleMarker | null>(null);
    const streetLayerRef = useRef<TileLayer | null>(null);
    const satelliteLayerRef = useRef<TileLayer | null>(null);

    const normalizedQuery = mapQuery.trim() || defaultLocation;
    const openMapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(normalizedQuery)}`;

    const handleLookupSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = lookupAddress.trim();

        if (!query) {
            return;
        }

        setIsLocating(true);
        setLookupError('');

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Accept-Language': 'en',
                    },
                },
            );

            if (!response.ok) {
                throw new Error('Geocoding failed');
            }

            const results = (await response.json()) as Array<{
                lat: string;
                lon: string;
                display_name: string;
            }>;

            if (results.length === 0) {
                setLookupError('Address not found. Try a more specific input.');
                return;
            }

            const result = results[0];
            const lat = Number(result.lat);
            const lon = Number(result.lon);

            if (Number.isNaN(lat) || Number.isNaN(lon)) {
                throw new Error('Invalid coordinates');
            }

            setMapCenter({ lat, lon });
            setMapQuery(result.display_name || query);

            if (!address.trim()) {
                setAddress(query);
            }
        } catch {
            setLookupError(
                'Unable to locate the property right now. Please try again.',
            );
        } finally {
            setIsLocating(false);
        }
    };

    useEffect(() => {
        if (!mapElementRef.current || mapRef.current) {
            return;
        }

        const map = L.map(mapElementRef.current, {
            zoomControl: false,
            attributionControl: true,
        }).setView([defaultCenter.lat, defaultCenter.lon], 11);

        L.control
            .zoom({
                position: 'bottomright',
            })
            .addTo(map);

        map.attributionControl.setPrefix(false);

        const streetLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors',
            },
        );

        const satelliteLayer = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                maxZoom: 18,
                attribution: 'Tiles &copy; Esri',
            },
        );

        streetLayer.addTo(map);

        const marker = L.circleMarker([defaultCenter.lat, defaultCenter.lon], {
            radius: 7,
            color: '#bb6420',
            fillColor: '#bb6420',
            fillOpacity: 0.9,
            weight: 2,
        }).addTo(map);

        mapRef.current = map;
        markerRef.current = marker;
        streetLayerRef.current = streetLayer;
        satelliteLayerRef.current = satelliteLayer;

        return () => {
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
            streetLayerRef.current = null;
            satelliteLayerRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        const streetLayer = streetLayerRef.current;
        const satelliteLayer = satelliteLayerRef.current;

        if (!map || !streetLayer || !satelliteLayer) {
            return;
        }

        if (mapMode === 'satellite') {
            if (map.hasLayer(streetLayer)) {
                map.removeLayer(streetLayer);
            }
            if (!map.hasLayer(satelliteLayer)) {
                satelliteLayer.addTo(map);
            }
            return;
        }

        if (map.hasLayer(satelliteLayer)) {
            map.removeLayer(satelliteLayer);
        }
        if (!map.hasLayer(streetLayer)) {
            streetLayer.addTo(map);
        }
    }, [mapMode]);

    useEffect(() => {
        const map = mapRef.current;
        const marker = markerRef.current;

        if (!map || !marker) {
            return;
        }

        marker.setLatLng([mapCenter.lat, mapCenter.lon]);
        map.setView([mapCenter.lat, mapCenter.lon], 14);
    }, [mapCenter.lat, mapCenter.lon]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Place Order" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <section className="rounded-2xl border border-[#dbe7de] bg-white p-4 shadow-[0_16px_28px_-22px_rgba(24,102,39,0.75)] md:p-5">
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                        Order Intake
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-[#1f2e22]">
                        Place Order
                    </h1>
                </section>

                <section className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
                    <article className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_16px_28px_-22px_rgba(24,102,39,0.75)]">
                        <form
                            className="border-b border-[#dce8df] bg-[#fefef8] p-3"
                            onSubmit={handleLookupSubmit}
                        >
                            <div className="flex gap-2">
                                <label className="relative block flex-1">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5f7768]" />
                                    <Input
                                        value={lookupAddress}
                                        onChange={(event) =>
                                            setLookupAddress(event.target.value)
                                        }
                                        placeholder="Lookup property address"
                                        className="h-10 border-[#d7ddd8] bg-[#eff1cc] pl-9 text-[16px]"
                                    />
                                </label>
                                <Button
                                    type="submit"
                                    disabled={isLocating}
                                    className="h-10 bg-[#186627] px-4 text-white hover:bg-[#145521]"
                                >
                                    {isLocating ? 'Searching...' : 'Search'}
                                </Button>
                            </div>
                            {lookupError && (
                                <p className="mt-2 text-xs font-medium text-[#b64c20]">
                                    {lookupError}
                                </p>
                            )}
                        </form>

                        <div className="relative h-[640px] overflow-hidden bg-[#dbe7de]">
                            <div
                                ref={mapElementRef}
                                className="h-full w-full bg-[#dbe7de]"
                            />

                            <div className="absolute top-3 left-3 z-[1000] flex overflow-hidden rounded-md border border-[#d4dce1] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
                                <button
                                    type="button"
                                    onClick={() => setMapMode('map')}
                                    className={`px-7 py-3 text-[17px] font-semibold transition ${
                                        mapMode === 'map'
                                            ? 'bg-white text-[#101820]'
                                            : 'bg-[#f4f6f8] text-[#586573] hover:bg-[#eceff2]'
                                    }`}
                                >
                                    Map
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMapMode('satellite')}
                                    className={`px-7 py-3 text-[17px] font-semibold transition ${
                                        mapMode === 'satellite'
                                            ? 'bg-white text-[#101820]'
                                            : 'bg-[#f4f6f8] text-[#586573] hover:bg-[#eceff2]'
                                    }`}
                                >
                                    Satellite
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => window.open(openMapHref, '_blank')}
                                className="absolute top-3 right-3 z-[1000] rounded-md border border-[#d4dce1] bg-white p-3 text-[#394854] shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                                title="Open map in new tab"
                            >
                                <Expand className="size-5" />
                            </button>

                            <div className="absolute right-3 bottom-3 z-[1000] rounded-md border border-[#dce8df] bg-white/95 px-2 py-1 text-[11px] font-medium text-[#355744] shadow-sm">
                                {normalizedQuery}
                            </div>
                        </div>
                    </article>

                    <article className="rounded-2xl border border-[#dbe7de] bg-white p-4 shadow-[0_16px_28px_-22px_rgba(24,102,39,0.75)] md:p-5">
                        <div className="grid gap-3">
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="client">Client</Label>
                                <Input
                                    id="client"
                                    placeholder="type client name"
                                />
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="spoke">Spoke</Label>
                                <select
                                    id="spoke"
                                    className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                >
                                    <option>First Choice Surveying, Inc.</option>
                                </select>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <span />
                                <label className="inline-flex items-center gap-2 text-sm text-[#355744]">
                                    <Checkbox id="create-ec-only" />
                                    Create EC Only
                                </label>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={address}
                                    onChange={(event) =>
                                        setAddress(event.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" />
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="state">State / Zip</Label>
                                <div className="grid grid-cols-[1fr_120px] gap-2">
                                    <select
                                        id="state"
                                        className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                    >
                                        <option>Florida</option>
                                    </select>
                                    <Input placeholder="Zip" />
                                </div>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="county">County</Label>
                                <select
                                    id="county"
                                    className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                >
                                    <option>Select County...</option>
                                    <option>MANATEE</option>
                                    <option>PASCO</option>
                                    <option>SARASOTA</option>
                                </select>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="date-due">Date Due</Label>
                                <Input id="date-due" placeholder="mm/dd/yy" />
                            </div>
                            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                                <Label htmlFor="product">Product</Label>
                                <select
                                    id="product"
                                    className="h-9 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                >
                                    <option>BOUNDARY SURVEY</option>
                                    <option>ELEVATION CERTIFICATE</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-[#e3ebe5] pt-4">
                            <Button className="h-10 w-full bg-[#58b75d] text-base font-semibold text-white hover:bg-[#4aa04f]">
                                Create Quote
                            </Button>
                        </div>
                    </article>

                    <article className="rounded-2xl border border-[#dbe7de] bg-white shadow-[0_16px_28px_-22px_rgba(24,102,39,0.75)] xl:col-start-2 xl:col-span-1">
                        <header className="border-b border-[#e3ebe5] bg-[#f7fbf8] px-4 py-3 text-center text-sm font-semibold text-[#2b4b3a]">
                            Possible Past Matches
                        </header>
                        <div className="min-h-[300px] p-4">
                            <div className="flex h-[260px] items-center justify-center rounded-xl border border-dashed border-[#d3dfd6] bg-[#fcfffd] text-sm text-[#607669]">
                                No matches yet. Results appear after address and
                                client details are entered.
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </AppLayout>
    );
}
