import AppLayout from '@/components/AppLayout';
import Stats from '@/components/Stats';
import PerformanceChart from '@/components/PerformanceChart';
import RecentSequences from '@/components/RecentSequences';

export default function HomePage() {
  return (
    <AppLayout>
      <Stats />
      <div className="grid md:grid-cols-2 gap-6">
        <PerformanceChart />
        <RecentSequences />
      </div>
    </AppLayout>
  );
} 