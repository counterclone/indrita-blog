// Internal Navigation Tracking
// Better alternative to UTM tags for tracking user journeys

export const trackInternalNavigation = (
  action: string,
  source: string,
  destination: string,
  additionalData?: Record<string, any>
) => {
  // Google Analytics 4 Event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'Internal Navigation',
      event_label: `${source} → ${destination}`,
      source_section: source,
      destination_page: destination,
      ...additionalData
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Internal Navigation:', {
      action,
      source,
      destination,
      ...additionalData
    });
  }
};

// Specific tracking functions
export const trackHeroAboutClick = () => {
  trackInternalNavigation(
    'about_click',
    'hero_section',
    'about_page',
    { element_type: 'profile_card' }
  );
};

export const trackFeaturedArticleClick = (articleId: string, articleTitle: string) => {
  trackInternalNavigation(
    'article_click',
    'featured_section',
    'article_page',
    { 
      article_id: articleId,
      article_title: articleTitle,
      position: 'featured'
    }
  );
};

export const trackNewsletterSignup = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'Engagement',
      source_section: source
    });
  }
};

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
} 