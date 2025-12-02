# Frontend-Dashboard Integration Implementation Plan

## Current Status Summary

### ✅ Working Integrations (30%)
- **News/Actualités**: Fully connected with posts from admin
- **Categories**: Properly fetching from database
- **API Infrastructure**: Hooks and endpoints exist but underutilized

### ❌ Missing Integrations (70%)
- **Homepage**: All content hardcoded (consul message, services, galleries)
- **Media/Gallery**: No public API, static images
- **Services**: Hardcoded list, partial page integration
- **Settings**: Not used despite having infrastructure

## Priority Implementation Tasks

### Phase 1: Critical for Launch (4-6 hours)

#### 1. Create Public Media API (1 hour)
```typescript
// Create /app/api/public/media/route.ts
// Endpoints needed:
// GET /api/public/media?type=IMAGE&limit=10
// GET /api/public/media?type=VIDEO&category=events
```

**Tasks:**
- [ ] Create public media API endpoint
- [ ] Add filtering by type (IMAGE, VIDEO, DOCUMENT)
- [ ] Include pagination support
- [ ] Add category filtering

#### 2. Update Homepage to Use Dynamic Content (2 hours)
```typescript
// Update /app/page.tsx
// Replace static content with API calls
```

**Tasks:**
- [ ] Fetch consul message from settings/pages
- [ ] Connect services grid to database
- [ ] Replace static photo gallery with media API
- [ ] Update video section to use database videos
- [ ] Add error handling and loading states

#### 3. Complete Service Pages Integration (1-2 hours)
```typescript
// Update all /app/services/*/page.tsx files
// Remove hardcoded content
```

**Tasks:**
- [ ] Ensure all service pages use `/api/pages/[...slug]`
- [ ] Remove static fallback content
- [ ] Display fees, processing time, required documents from database
- [ ] Add proper error pages for missing services

#### 4. Implement Settings Integration (1 hour)
```typescript
// Use existing useSettings hook
// Update components to fetch dynamic settings
```

**Tasks:**
- [ ] Create public settings API endpoint
- [ ] Update footer with dynamic contact info
- [ ] Use settings for office hours display
- [ ] Configure external service links (Express54)

### Phase 2: Post-Launch Improvements (4-5 hours)

#### 5. Implement Media Gallery Page (2 hours)
**Tasks:**
- [ ] Replace "Coming Soon" with functional gallery
- [ ] Add filtering by media type
- [ ] Implement lightbox for images
- [ ] Add video player for video content
- [ ] Include download options for documents

#### 6. Enhance Multilingual Support (1-2 hours)
**Tasks:**
- [ ] Ensure all dynamic content respects language selection
- [ ] Add language toggle to all pages
- [ ] Update API endpoints to accept language parameter
- [ ] Implement proper language fallbacks

#### 7. Optimize Data Fetching (1 hour)
**Tasks:**
- [ ] Implement caching strategy
- [ ] Add ISR (Incremental Static Regeneration) for better performance
- [ ] Optimize image loading with Next.js Image component
- [ ] Add proper loading skeletons

## Implementation Code Samples

### 1. Public Media API
```typescript
// /app/api/public/media/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const media = await prisma.media.findMany({
    where: {
      ...(type && { type }),
      ...(category && { category }),
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  
  return NextResponse.json(media);
}
```

### 2. Homepage Integration
```typescript
// Update homepage to fetch dynamic content
const HomePage = async () => {
  // Fetch all data in parallel
  const [settings, services, recentMedia, recentVideos] = await Promise.all([
    fetch('/api/public/settings').then(r => r.json()),
    fetch('/api/public/pages?type=service&limit=6').then(r => r.json()),
    fetch('/api/public/media?type=IMAGE&limit=8').then(r => r.json()),
    fetch('/api/public/media?type=VIDEO&limit=3').then(r => r.json()),
  ]);
  
  // Use fetched data in components
  return (
    <>
      <ConsulMessage message={settings.consulMessage} />
      <Services items={services} />
      <PhotoGallery images={recentMedia} />
      <VideoSection videos={recentVideos} />
    </>
  );
};
```

### 3. Service Page Integration
```typescript
// Service page fetching from database
export default async function ServicePage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');
  const page = await fetch(`/api/pages/${slug}`).then(r => r.json());
  
  if (!page) {
    notFound();
  }
  
  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
      {page.fees && <p>Fees: {page.fees}</p>}
      {page.processingTime && <p>Processing Time: {page.processingTime}</p>}
      {page.requiredDocuments && (
        <ul>
          {page.requiredDocuments.map(doc => <li key={doc}>{doc}</li>)}
        </ul>
      )}
    </div>
  );
}
```

## Testing Checklist

### Before Launch
- [ ] Test all API endpoints with production data
- [ ] Verify fallback behavior when database is unavailable
- [ ] Check loading states and error handling
- [ ] Test on mobile devices
- [ ] Verify multilingual content display

### After Implementation
- [ ] All homepage sections show dynamic content
- [ ] Service pages display database content
- [ ] Media gallery shows uploaded files
- [ ] Settings are reflected throughout the site
- [ ] No hardcoded content remains (except fallbacks)

## Risk Mitigation

1. **Fallback Strategy**: Keep static content as fallback for critical pages
2. **Caching**: Implement proper caching to reduce database load
3. **Error Boundaries**: Add error boundaries to prevent full page crashes
4. **Monitoring**: Track API response times and errors

## Estimated Timeline

- **Phase 1 (Critical)**: 4-6 hours - Must complete before launch
- **Phase 2 (Enhancements)**: 4-5 hours - Can be done post-launch
- **Total**: 8-11 hours for full integration

## Success Metrics

1. All public content manageable from admin dashboard
2. Zero hardcoded content (except intentional fallbacks)
3. Page load times under 3 seconds
4. Proper error handling for all scenarios
5. Consistent user experience across all pages