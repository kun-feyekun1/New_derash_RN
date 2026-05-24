import { MapPinned } from 'lucide-react-native';

import { AppHeader, EmptyState, ScreenWrapper } from '@/components';
import { useAppSelector } from '@/store/hooks';

export default function SavedScreen() {
  const saved = useAppSelector((state) => state.route.savedLocations);

  return (
    <ScreenWrapper>
      <AppHeader title="Saved places" subtitle="Home, work, campus, terminals, and frequent destinations." showActions={false} />
      {saved.length === 0 ? (
        <EmptyState title="No saved places yet" message="Save destinations from search results for faster route planning." icon={MapPinned} />
      ) : null}
    </ScreenWrapper>
  );
}
