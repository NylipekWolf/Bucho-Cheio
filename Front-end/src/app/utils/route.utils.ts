import { UrlSegment } from '@angular/router';

export function getFullPathFromSegments(segments: UrlSegment[]): string {
  if (segments) {
    let fullPath = '';
    segments.forEach((s) => {
      fullPath += `/${s.path}`;
    });
    return fullPath;
  }
  return '';
}
