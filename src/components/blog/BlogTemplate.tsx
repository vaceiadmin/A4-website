'use client';

import React from 'react';
import { format } from 'date-fns';
import { User, Share2, ArrowUpRight, Calendar, Clock, RefreshCw, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/common/LocalizedLink';
import { BlogPost } from '@/utils/blog';
import MarkdownRenderer from './MarkdownRenderer';
import { usePerformance } from '@/contexts/ReduceMotionContext';
import { usePagesTranslation } from '@/hooks/usePagesTranslation';
import { cn } from '@/lib/utils';

interface BlogTemplateProps {
  blog: BlogPost;
  relatedBlogs?: BlogPost[];
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({ blog, relatedBlogs = [] }) => {
  const { isIPhone, isLowPerformance } = usePerformance();
  const { t } = usePagesTranslation('insights');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('article.linkCopied'));
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-blue/10 selection:text-primary-blue">
      {/* HERO SECTION */}
      <section className="pt-24 md:pt-32  border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-6">
            <LocalizedLink href="/" className="hover:text-primary-blue transition-colors">A4</LocalizedLink>
            <ChevronRight size={10} className="text-gray-300" />
            <LocalizedLink href="/insights" className="hover:text-primary-blue transition-colors">Insights</LocalizedLink>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-gray-500">{blog.tags?.[0] || 'Article'}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-primary-blue/10 text-primary-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
              {blog.tags?.[0] || 'Insight'}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <span className="text-gray-500 text-[13px]">{format(new Date(blog.date), 'MMMM yyyy')}</span>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <span className="text-gray-500 text-[13px] flex items-center gap-1.5"><Clock size={14} /> {blog.readingTime}</span>
          </div>

          <h1 className="font-lora text-[clamp(32px,5vw,56px)] font-bold text-gray-900 leading-[1.1] tracking-tight mb-8 max-w-4xl">
            {blog.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mb-12">
            {blog.excerpt}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-blue to-zinc-600 flex items-center justify-center font-lora font-bold text-white uppercase">
                {blog.author?.[0] || 'V'}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{blog.author}</div>
                <div className="text-[13px] text-gray-400">{t('article.teamLine')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <RefreshCw size={14} /> Last updated {format(new Date(blog.date), 'MMMM d, yyyy')}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT LAYOUT */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-16 md:gap-24 items-start">

          {/* ARTICLE BODY */}
          <article className="w-full">
            <div className="prose prose-slate max-w-none 
              prose-headings:font-lora prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:text-[17px] prose-p:mb-8
              prose-a:text-primary-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:list-none prose-ul:pl-0
              prose-li:relative prose-li:pl-7 prose-li:text-gray-600 prose-li:mb-3
              prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[13px] prose-li:before:w-2 prose-li:before:h-2 prose-li:before:rounded-full prose-li:before:bg-primary-blue
            ">
              <MarkdownRenderer content={blog.content} />
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="w-full lg:sticky lg:top-24 space-y-8">

            {/* WRITTEN BY CARD */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm shadow-gray-100/50">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">{t('article.writtenBy')}</h5>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center font-lora font-bold text-primary-blue uppercase border border-gray-100">
                  {blog.author?.[0] || 'V'}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{blog.author}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{t('article.teamLine')}</div>
                </div>
              </div>
            </div>

            {/* SHARE CARD */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm shadow-gray-100/50">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">{t('article.shareInsight')}</h5>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:border-primary-blue hover:text-primary-blue transition-all bg-gray-50/50"
              >
                <Share2 size={14} />
                {t('article.copyLink')}
              </button>
            </div>

            {/* CTA CARD */}
            <div className="bg-gray-900 rounded-2xl p-7 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-blue/20 blur-2xl pointer-events-none"></div>
              <h5 className="font-lora text-lg font-bold mb-3 leading-tight relative z-10">{t('article.needAuditTitle')}</h5>
              <p className="text-[12px] text-white/60 mb-6 leading-relaxed relative z-10">{t('article.needAuditBody')}</p>
              <LocalizedLink href="/quote" className="block w-full py-3.5 bg-primary-blue text-white rounded-xl text-sm font-bold hover:bg-zinc-600 transition-all mb-4 relative z-10">
                {t('article.getStarted')} →
              </LocalizedLink>
              <span className="text-[10px] text-white/40 block relative z-10">Team assigned within 72 hours</span>
            </div>

            {/* TAGS CARD */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm shadow-gray-100/50">
                <h5 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">{t('article.tagsHeading')}</h5>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-wider rounded-md text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* RELATED BLOGS SECTION */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-24 border-t border-gray-200">
          <div className="max-w-[1240px] mx-auto px-6 md:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-lora">
                  {t('article.relatedTitle')}
                </h2>
                <p className="text-gray-500 max-w-xl">
                  {t('article.relatedSubtitle')}
                </p>
              </div>
              <LocalizedLink
                href="/insights"
                className="hidden md:inline-flex items-center gap-2 text-primary-blue font-bold hover:gap-3 transition-all"
              >
                {t('article.viewAllInsights')}
                <ArrowUpRight className="w-5 h-5" />
              </LocalizedLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                <article
                  key={relatedBlog.slug}
                  className="group relative flex flex-col h-full bg-white hover:bg-primary-blue rounded-3xl border border-gray-100 hover:border-primary-blue transition-all duration-500 hover:shadow-2xl hover:shadow-primary-blue/20"
                >
                  <LocalizedLink href={`/insights/${relatedBlog.slug}`} className="flex flex-col h-full p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary-blue/5 text-primary-blue group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                        {relatedBlog.tags ? relatedBlog.tags[0] : 'Insight'}
                      </span>
                      <div className="flex items-center text-xs text-gray-400 group-hover:text-white/70 transition-colors duration-300">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {format(new Date(relatedBlog.date), 'MMM dd, yyyy')}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300 line-clamp-2 font-lora">
                      {relatedBlog.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                      {relatedBlog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50 group-hover:border-white/10 transition-colors duration-300">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{relatedBlog.author}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary-blue transition-colors duration-300" />
                      </div>
                    </div>
                  </LocalizedLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogTemplate;
