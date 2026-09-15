import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionVariants } from "../motion";
import type {
  GitHubContributionCalendar,
  GitHubContributionDay,
  GitHubContributionLevel,
} from "../types/github";
import {
  CONTRIBUTION_LEVEL_COLORS,
  formatContributionTooltip,
  formatContributionTotal,
  getMonthLabels,
} from "../utils/contributionCalendar";

const GAP = 3;
const LABEL_WIDTH = 30;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

const LEGEND_LEVELS: GitHubContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
];

interface ContributionCellProps {
  day: GitHubContributionDay;
  size: number;
}

function ContributionCell({ day, size }: ContributionCellProps) {
  const tooltip = formatContributionTooltip(day.contributionCount, day.date);
  const isActive = day.contributionLevel !== "NONE";

  return (
    <div
      className="relative group shrink-0"
      role="gridcell"
      aria-label={tooltip}
      style={{ width: size, height: size }}
    >
      <div
        tabIndex={0}
        className={`
          contribution-day-cell rounded-[3px] outline-none transition-transform duration-200
          border border-white/[0.06]
          group-hover:scale-[1.15] group-hover:z-10
          group-focus-visible:scale-[1.15] group-focus-visible:z-10
          group-focus-visible:ring-2 group-focus-visible:ring-accent/70
          ${isActive ? "group-hover:shadow-[0_0_10px_rgba(199,112,199,0.45)]" : "group-hover:ring-1 group-hover:ring-white/20"}
        `}
        style={{
          width: size,
          height: size,
          backgroundColor: CONTRIBUTION_LEVEL_COLORS[day.contributionLevel],
        }}
      />
      <div
        role="tooltip"
        className="
          pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-30
          w-max max-w-[240px] -translate-x-1/2 rounded-lg
          border border-white/15 bg-[#1a0f24]/95 backdrop-blur-sm
          px-3 py-2 text-[11px] leading-snug text-white/90
          opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.5)]
          transition-opacity duration-200
          group-hover:opacity-100 group-focus-within:opacity-100
        "
      >
        {tooltip}
      </div>
    </div>
  );
}

interface GitHubContributionHeatmapProps {
  calendar: GitHubContributionCalendar;
}

function computeCellSize(containerWidth: number, weekCount: number): number {
  const available = containerWidth - LABEL_WIDTH;
  const totalGap = (weekCount - 1) * GAP;
  const raw = (available - totalGap) / weekCount;
  return Math.max(4, Math.floor(raw));
}

export default function GitHubContributionHeatmap({
  calendar,
}: GitHubContributionHeatmapProps) {
  const { fadeIn } = useMotionVariants();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(10);

  const monthLabels = useMemo(
    () => getMonthLabels(calendar.weeks),
    [calendar.weeks]
  );

  const weekCount = calendar.weeks.length;
  const columnStep = cellSize + GAP;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateCellSize() {
      if (!container) return;
      setCellSize(computeCellSize(container.clientWidth, weekCount));
    }

    updateCellSize();

    const observer = new ResizeObserver(updateCellSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [weekCount]);

  return (
    <div ref={containerRef} className="contribution-heatmap w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.08] px-3.5 py-1.5">
          <i className="bx bx-pulse text-accent text-base" aria-hidden="true" />
          <p className="text-sm font-medium text-white/85">
            {formatContributionTotal(calendar.totalContributions)}
          </p>
        </div>

        <div
          className="flex items-center justify-start sm:justify-end gap-2 text-[11px] text-white/50"
          aria-hidden="true"
        >
          <span>Less</span>
          <div className="flex gap-[3px]">
            {LEGEND_LEVELS.map((level) => (
              <span
                key={level}
                className="rounded-[3px] border border-white/[0.06]"
                style={{
                  width: Math.max(cellSize, 8),
                  height: Math.max(cellSize, 8),
                  backgroundColor: CONTRIBUTION_LEVEL_COLORS[level],
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="w-full min-w-0 overflow-hidden">
        <div
          className="relative mb-2.5 h-4 text-[11px] font-medium text-white/50"
          style={{ marginLeft: LABEL_WIDTH }}
          aria-hidden="true"
        >
          {monthLabels.map(({ label, weekIndex }) => (
            <span
              key={`${label}-${weekIndex}`}
              className="absolute top-0 leading-none"
              style={{ left: weekIndex * columnStep }}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex w-full min-w-0" style={{ gap: GAP }}>
          <div
            className="flex shrink-0 flex-col"
            style={{ width: LABEL_WIDTH, gap: GAP }}
            aria-hidden="true"
          >
            {DAY_LABELS.map((label, index) => (
              <span
                key={index}
                className="flex items-center justify-end pr-1.5 text-[11px] font-medium leading-none text-white/45"
                style={{ height: cellSize }}
              >
                {label}
              </span>
            ))}
          </div>

          <motion.div
            role="grid"
            aria-label="GitHub contribution activity for the last year"
            className="contribution-grid flex min-w-0 flex-1"
            style={{ gap: GAP }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn()}
          >
            {calendar.weeks.map((week, weekIndex) => (
              <div
                key={`week-${weekIndex}`}
                role="row"
                className="flex flex-col shrink-0"
                style={{ gap: GAP }}
              >
                {week.contributionDays.map((day) => (
                  <ContributionCell key={day.date} day={day} size={cellSize} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function GitHubContributionHeatmapSkeleton() {
  return (
    <div className="contribution-heatmap w-full animate-pulse" aria-hidden="true">
      <div className="mb-5 h-9 w-64 rounded-full bg-white/10" />
      <div className="flex w-full gap-[3px] pl-8 overflow-hidden">
        {Array.from({ length: 53 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px] flex-1 min-w-0">
            {Array.from({ length: 7 }).map((__, dayIndex) => (
              <div
                key={dayIndex}
                className="aspect-square w-full rounded-[3px] bg-white/10"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
