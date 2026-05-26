import { Metadata } from 'next';
import BlogListing from '@/components/blog/BlogListing';
import { getAllBlogs } from '@/utils/blog';

export const metadata: Metadata = {
  title: 'Insights | VACEI - Accounting, Audit & Compliance',
  description: 'Explore our latest insights on audit requirements, compliance, and business growth. Expert tips and updates from the VACEI team.',
  openGraph: {
    title: 'Insights | VACEI - Accounting, Audit & Compliance',
    description: 'Explore our latest insights on audit requirements, compliance, and business growth.',
    type: 'website',
  },
};

export default function InsightsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen">
      <BlogListing blogs={blogs} />
    </div>
  );
}
