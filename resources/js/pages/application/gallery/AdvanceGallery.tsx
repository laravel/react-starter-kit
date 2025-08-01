import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ApolloAdvance from '@/sections/application/gallery/advance/ApolloAdvance';
import GoliathAdvance from '@/sections/application/gallery/advance/GoliathAdvance';
import HeraAdvance from '@/sections/application/gallery/advance/HeraAdvance';
import JazzAdvance from '@/sections/application/gallery/advance/JazzAdvance';
import JuliaAdvance from '@/sections/application/gallery/advance/JuliaAdvance';
import DukeAdvance from '@/sections/application/gallery/advance/DukeAdvance';
import KiraAdvance from '@/sections/application/gallery/advance/KiraAdvance';
import LexiAdvance from '@/sections/application/gallery/advance/LexiAdvance';
import MingAdvance from '@/sections/application/gallery/advance/MingAdvance';
import MosesAdvance from '@/sections/application/gallery/advance/MosesAdvance';
import PhoebeAdvance from '@/sections/application/gallery/advance/PhoebeAdvance';
import SelenaAdvance from '@/sections/application/gallery/advance/SelenaAdvance';
import SteveAdvance from '@/sections/application/gallery/advance/SteveAdvance';
import TerryAdvance from '@/sections/application/gallery/advance/TerryAdvance';
import WinstonAdvance from '@/sections/application/gallery/advance/WinstonAdvance';

// ==============================|| GALLERY - ADVANCE  ||============================== //

export default function AdvanceGalleryPage() {
  return (
    <AppLayout>
            <Head title="Advance gallery" />
    <Row>
      <Col sm={12}>
        <JuliaAdvance />
        <GoliathAdvance />
        <HeraAdvance />
        <WinstonAdvance />
        <SelenaAdvance />
        <TerryAdvance />
        <PhoebeAdvance />
        <ApolloAdvance />
        <KiraAdvance />
        <SteveAdvance />
        <MosesAdvance />
        <JazzAdvance />
        <MingAdvance />
        <LexiAdvance />
        <DukeAdvance />
      </Col>
    </Row>
    </AppLayout>
  );
}
