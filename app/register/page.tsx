'use client';

export default function Page() {
    return (
        <div className="mx-auto max-w-md py-16 px-4">
            <h1 className="text-2xl font-bold mb-4">Admin Register Disabled</h1>
            <p className="text-gray-700">
                Admin users must be created using the seed endpoint only.
            </p>
            <p className="text-sm text-gray-500 mt-3">
                Use <code>/api/auth/seed-admin</code> with header <code>x-seed-key</code>.
            </p>
        </div>
    );
}
