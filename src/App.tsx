import { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout } from './components/Layout';
import { Slide } from './components/Slide';
import { TrainingSlideVisual } from './components/TrainingSlideVisual';
import { trainingSlides } from './data/training';

type ViewMode = 'presentation' | 'reader';

function resetPageScroll() {
  window.scrollTo({ top: 0, left: 0 });
  document.scrollingElement?.scrollTo({ top: 0, left: 0 });
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>('presentation');
  const [isMobile, setIsMobile] = useState(false);
  const effectiveMode: ViewMode = isMobile ? 'reader' : mode;

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const presenting = effectiveMode === 'presentation';
    document.body.classList.toggle('presentation-mode', presenting);
    document.documentElement.classList.toggle('presentation-mode', presenting);
    if (presenting) {
      resetPageScroll();
      window.requestAnimationFrame(resetPageScroll);
    }
    return () => {
      document.body.classList.remove('presentation-mode');
      document.documentElement.classList.remove('presentation-mode');
    };
  }, [effectiveMode]);

  const navigate = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(trainingSlides.length - 1, index));
      setCurrentIndex(nextIndex);
      if (effectiveMode === 'reader') {
        window.requestAnimationFrame(() => {
          document.getElementById(trainingSlides[nextIndex].id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      } else {
        resetPageScroll();
        window.requestAnimationFrame(resetPageScroll);
      }
    },
    [effectiveMode]
  );

  useEffect(() => {
    if (effectiveMode !== 'presentation') return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, input, textarea, select, [role="tab"]')) return;
      const nextKeys = ['ArrowRight', 'PageDown', ' '];
      const previousKeys = ['ArrowLeft', 'PageUp'];
      if (nextKeys.includes(event.key)) {
        event.preventDefault();
        navigate(currentIndex + 1);
      } else if (previousKeys.includes(event.key)) {
        event.preventDefault();
        navigate(currentIndex - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        navigate(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        navigate(trainingSlides.length - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, effectiveMode, navigate]);

  useEffect(() => {
    if (effectiveMode !== 'reader') return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-slide-number]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const number = Number((visible?.target as HTMLElement | undefined)?.dataset.slideNumber);
        if (Number.isFinite(number)) setCurrentIndex(number - 1);
      },
      { rootMargin: '-18% 0px -56% 0px', threshold: [0.15, 0.35, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [effectiveMode]);

  const visibleSlides = useMemo(
    () => (effectiveMode === 'presentation' ? [trainingSlides[currentIndex]] : trainingSlides),
    [currentIndex, effectiveMode]
  );

  return (
    <Layout
      slides={trainingSlides}
      currentIndex={currentIndex}
      mode={effectiveMode}
      onModeChange={setMode}
      onNavigate={navigate}
    >
      {visibleSlides.map((slide) => (
        <Slide key={slide.id} slide={slide} mode={effectiveMode}>
          <TrainingSlideVisual slide={slide} />
        </Slide>
      ))}
    </Layout>
  );
}

export default App;
