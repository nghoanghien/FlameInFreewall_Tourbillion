import type { Investigation } from '@/types';
import type {
  FuelFilterValue,
  FacilityFilterValue,
  GravityFilterValue,
  ExplorerSortOption,
} from '@/components/explorer/ExplorerFiltersBar';

export interface FilterInvestigationsParams {
  investigations: Investigation[];
  searchQuery: string;
  fuelFilter: FuelFilterValue;
  facilityFilter: FacilityFilterValue;
  gravityFilter: GravityFilterValue;
  sortBy: ExplorerSortOption;
  runsByInvestigationId: Record<string, number>;
}

export function filterAndSortInvestigations({
  investigations,
  searchQuery,
  fuelFilter,
  facilityFilter,
  gravityFilter,
  sortBy,
  runsByInvestigationId,
}: FilterInvestigationsParams): Investigation[] {
  const q = searchQuery.toLowerCase().trim();

  return investigations
    .filter((inv) => {
      // 1. Keyword search
      if (q) {
        const matchesCode = inv.code.toLowerCase().includes(q);
        const matchesTitle = inv.title.toLowerCase().includes(q);
        const matchesSubtitle = inv.subtitle.toLowerCase().includes(q);
        const matchesPI = inv.primaryInvestigator.toLowerCase().includes(q);
        const matchesInstitution = inv.institution?.toLowerCase().includes(q) ?? false;
        const matchesMaterials = inv.fuelDetails.materials.some((m) =>
          m.toLowerCase().includes(q)
        );
        const matchesTags = inv.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchesCode &&
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesPI &&
          !matchesInstitution &&
          !matchesMaterials &&
          !matchesTags
        ) {
          return false;
        }
      }

      // 2. Fuel filter
      if (fuelFilter !== 'all') {
        if (fuelFilter === 'solid' && inv.fuelType !== 'solid' && inv.fuelType !== 'fabric') {
          return false;
        }
        if (fuelFilter === 'droplet' && inv.fuelType !== 'droplet' && inv.fuelType !== 'liquid') {
          return false;
        }
        if (fuelFilter === 'gas' && inv.fuelType !== 'gas') {
          return false;
        }
      }

      // 3. Facility filter
      if (facilityFilter !== 'all') {
        if (facilityFilter === 'CIR' && !inv.hardware.includes('CIR')) {
          return false;
        }
        if (facilityFilter === 'MSG' && !inv.hardware.includes('MSG')) {
          return false;
        }
        if (
          facilityFilter === 'Cygnus' &&
          !inv.hardware.toLowerCase().includes('cygnus') &&
          !inv.platform.toLowerCase().includes('cygnus') &&
          !inv.code.toLowerCase().includes('saffire')
        ) {
          return false;
        }
      }

      // 4. Gravity filter
      if (gravityFilter !== 'all') {
        if (gravityFilter === '0g' && inv.gravityLevelG !== 0) {
          return false;
        }
        if (gravityFilter === '1g' && inv.gravityLevelG !== 1) {
          return false;
        }
        if (gravityFilter === 'partial' && (inv.gravityLevelG <= 0 || inv.gravityLevelG >= 1)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'code-asc') {
        return a.code.localeCompare(b.code);
      }
      if (sortBy === 'runs-desc') {
        const countA = runsByInvestigationId[a.id] ?? a.dataAvailability.runCount ?? 0;
        const countB = runsByInvestigationId[b.id] ?? b.dataAvailability.runCount ?? 0;
        return countB - countA;
      }
      if (sortBy === 'confidence') {
        if (a.confidence !== b.confidence) {
          return a.confidence === 'A' ? -1 : 1;
        }
        return a.code.localeCompare(b.code);
      }
      // 'newest' sort
      const extractYear = (yr: string) => {
        const matches = yr.match(/\d{4}/g);
        return matches ? Math.max(...matches.map(Number)) : 0;
      };
      return extractYear(b.yearRange) - extractYear(a.yearRange);
    });
}
