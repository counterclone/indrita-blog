# Internal Navigation Tracking Guide


### 1. Google Analytics Events (Implemented)
```typescript
// lib/analytics.ts
export const trackInternalNavigation = (
  action: string,
  source: string, 
  destination: string,
  additionalData?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'Internal Navigation',
      event_label: `${source} → ${destination}`,
      source_section: source,
      destination_page: destination,
      ...additionalData
    });
  }
};
```

### 2. Usage Examples

#### Hero Section About Me Clicks
```typescript
// components/hero-section.tsx
<Link 
  href="/about" 
  onClick={() => trackHeroAboutClick()}
>
  About Me
</Link>
```

#### Featured Article Engagement
```typescript  
// components/featured-article.tsx
<Button onClick={() => trackFeaturedArticleClick(articleId, title)}>
  Read Insight
</Button>
```

### 3. Analytics Dashboard Views

In Google Analytics 4, you'll see:
- **Events > Internal Navigation**
- Custom dimensions for source/destination
- User journey flow visualization
- Conversion funnel analysis

### 4. Additional Tracking Methods

#### A. Custom Data Attributes
```html
<Link 
  href="/about"
  data-track-source="hero"
  data-track-destination="about"
>
```

#### B. Session Storage Journey
```typescript
// Track complete user journeys
const trackUserJourney = (page: string) => {
  const journey = JSON.parse(sessionStorage.getItem('userJourney') || '[]');
  journey.push({ page, timestamp: Date.now() });
  sessionStorage.setItem('userJourney', JSON.stringify(journey));
};
```

#### C. Heat Mapping Integration
```typescript
// For tools like Hotjar, Crazy Egg
const trackHeatmapEvent = (element: string, action: string) => {
  if (window.hj) {
    window.hj('event', `${element}_${action}`);
  }
};
```

### 5. Performance Monitoring
```typescript
// Track page load performance
const trackPagePerformance = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_load_time', {
      event_category: 'Performance',
      value: Math.round(performance.now()),
      page_name: pageName
    });
  }
};
```

### 6. Advanced User Journey Analysis

#### A. Conversion Funnel Tracking
```typescript
const trackFunnelStep = (step: string, stepNumber: number) => {
  window.gtag('event', 'funnel_step', {
    event_category: 'User Journey',
    step_name: step,
    step_number: stepNumber
  });
};

// Usage in components
trackFunnelStep('hero_view', 1);
trackFunnelStep('about_click', 2);
trackFunnelStep('article_read', 3);
trackFunnelStep('newsletter_signup', 4);
```

#### B. Content Engagement Scoring
```typescript
const trackContentEngagement = (
  contentType: string,
  engagementScore: number,
  timeSpent: number
) => {
  window.gtag('event', 'content_engagement', {
    event_category: 'Engagement',
    content_type: contentType,
    engagement_score: engagementScore,
    time_spent_seconds: timeSpent
  });
};
```

## Benefits Over UTM Tags

1. **Clean Attribution**: Preserves original traffic sources
2. **Rich Context**: Multiple data points per interaction  
3. **Real-time**: Immediate feedback in analytics
4. **Flexible**: Custom dimensions and metrics
5. **No URL Pollution**: Clean, shareable URLs
6. **Better UX**: No weird parameters in address bar

## Implementation Checklist

- [x] Analytics utility functions created
- [x] Hero section about me tracking
- [x] Featured article click tracking  
- [x] Newsletter signup tracking
- [ ] Article card click tracking
- [ ] Navigation menu tracking
- [ ] Footer link tracking
- [ ] Search functionality tracking
- [ ] Social share tracking

## Google Analytics 4 Setup

1. Create custom events in GA4
2. Set up conversion goals
3. Configure enhanced ecommerce (if applicable)
4. Set up audience segments based on navigation patterns
5. Create custom reports for user journey analysis

This approach gives you much richer data than UTM tags while maintaining clean analytics attribution. 