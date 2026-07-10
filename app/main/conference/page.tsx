import type { Metadata } from 'next';
import ConferencePage from '@/components/main/conference/ConferencePage';

export const metadata: Metadata = {
    title: 'GITBPDE 2027 – International Conference | Al-Buraimi University College',
    description:
        '10th International Conference on Global Innovations in Technology, Business Practices and Digital Education — April 7–8, 2027, Al-Buraimi University College, Oman.',
};

export default function Page() {
    return <ConferencePage />;
}
